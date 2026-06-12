import { create } from 'zustand'

import { librasQuestions } from '@/data/libras-questions'
import { shuffleArray } from '@/utils/shuffle-array'
import { connectSocket, disconnectSocket } from '@/lib/socket'
import { saveSession, clearSession } from '@/lib/session'
import type {
  LeaderboardEntry,
  PlayerInfo,
  PublicQuestion,
  Question,
  QuestionResults,
} from '@/types/game'

type Role = 'host' | 'player'

export type GamePhase =
  | 'home'
  | 'host_creating'
  | 'host_lobby'
  | 'player_join'
  | 'player_joining'
  | 'player_lobby'
  | 'question'
  | 'question_results'
  | 'game_over'

interface GameState {
  phase: GamePhase
  role: Role | null
  roomCode: string | null
  playerId: string | null
  nickname: string | null
  players: PlayerInfo[]
  currentQuestion: PublicQuestion | null
  questionResults: QuestionResults | null
  podium: LeaderboardEntry[] | null
  selectedOptionIndex: number | null
  answerSubmitted: boolean
  error: string | null

  chooseHost: () => void
  choosePlayer: () => void
  createRoom: () => void
  joinRoom: (code: string, nickname: string) => void
  startGame: () => void
  submitAnswer: (optionIndex: number) => void
  nextQuestion: () => void
  reset: () => void
}

function buildLibrasQuestions(): Question[] {
  return shuffleArray(librasQuestions).map((q) => ({
    id: String(q.id),
    text: q.description,
    options: q.alternatives.map((a) => a.text),
    correctIndex: q.alternatives.findIndex((a) => a.id === q.correctAlternativeId),
    timeLimitSec: 20,
  }))
}

const initialState = {
  phase: 'home' as GamePhase,
  role: null as Role | null,
  roomCode: null as string | null,
  playerId: null as string | null,
  nickname: null as string | null,
  players: [] as PlayerInfo[],
  currentQuestion: null as PublicQuestion | null,
  questionResults: null as QuestionResults | null,
  podium: null as LeaderboardEntry[] | null,
  selectedOptionIndex: null as number | null,
  answerSubmitted: false,
  error: null as string | null,
}

export const useGameStore = create<GameState>((set, get) => ({
  ...initialState,

  chooseHost: () => set({ role: 'host', error: null }),

  choosePlayer: () => set({ phase: 'player_join', role: 'player', error: null }),

  createRoom: () => {
    set({ phase: 'host_creating', error: null })
    const socket = connectSocket()

    socket.on('room:players', (players: PlayerInfo[]) => {
      set({ players })
    })

    socket.on('game:question', (question: PublicQuestion) => {
      set({
        phase: 'question',
        currentQuestion: question,
        selectedOptionIndex: null,
        answerSubmitted: false,
        questionResults: null,
      })
    })

    socket.on('question:results', (results: QuestionResults) => {
      set({ phase: 'question_results', questionResults: results })
    })

    socket.on('game:over', ({ podium }: { podium: LeaderboardEntry[] }) => {
      set({ phase: 'game_over', podium })
    })

    socket.on('room:closed', () => {
      set({ ...initialState, error: 'O host encerrou a sala.' })
      disconnectSocket()
    })

    const questions = buildLibrasQuestions()

    socket.emit(
      'host:create_room',
      { questions },
      (res: { ok: true; code: string } | { ok: false; error: string }) => {
        if (res.ok) {
          set({ phase: 'host_lobby', roomCode: res.code })
        } else {
          set({ phase: 'home', error: res.error })
          disconnectSocket()
        }
      }
    )
  },

  joinRoom: (code, nickname) => {
    // role must be set here too — joinRoom may be called directly on reload
    set({ phase: 'player_joining', role: 'player', error: null, nickname })
    const socket = connectSocket()

    socket.on('room:players', (players: PlayerInfo[]) => {
      set({ players })
    })

    socket.on('game:question', (question: PublicQuestion) => {
      set({
        phase: 'question',
        currentQuestion: question,
        selectedOptionIndex: null,
        answerSubmitted: false,
        questionResults: null,
      })
    })

    socket.on('question:results', (results: QuestionResults) => {
      set({ phase: 'question_results', questionResults: results })
    })

    socket.on('game:over', ({ podium }: { podium: LeaderboardEntry[] }) => {
      set({ phase: 'game_over', podium })
    })

    socket.on('room:closed', () => {
      set({ ...initialState, error: 'O host encerrou a sala.' })
      disconnectSocket()
    })

    socket.emit(
      'player:join',
      { code, nickname },
      (res: { ok: true; playerId: string } | { ok: false; error: string }) => {
        if (res.ok) {
          set({ phase: 'player_lobby', roomCode: code, playerId: res.playerId })
        } else {
          set({ phase: 'player_join', error: res.error })
          disconnectSocket()
        }
      }
    )
  },

  startGame: () => {
    const { roomCode } = get()
    if (!roomCode) return
    const socket = connectSocket()
    socket.emit(
      'host:start',
      { code: roomCode },
      (res: { ok: true } | { ok: false; error: string }) => {
        if (!res.ok) {
          set({ error: res.error })
        }
      }
    )
  },

  submitAnswer: (optionIndex) => {
    const { roomCode, playerId, answerSubmitted } = get()
    if (!roomCode || !playerId || answerSubmitted) return
    set({ selectedOptionIndex: optionIndex, answerSubmitted: true })
    const socket = connectSocket()
    socket.emit('player:answer', { code: roomCode, playerId, optionIndex })
  },

  nextQuestion: () => {
    const { roomCode } = get()
    if (!roomCode) return
    const socket = connectSocket()
    socket.emit(
      'host:next',
      { code: roomCode },
      (
        res:
          | { ok: true; finished: false }
          | { ok: true; finished: true }
          | { ok: false; error: string }
      ) => {
        if (!res.ok) {
          set({ error: res.error })
        }
      }
    )
  },

  reset: () => {
    disconnectSocket()
    set(initialState)
  },
}))

// Reactive session persistence: save/clear localStorage whenever phase changes.
// This decouples persistence from socket callbacks — more reliable.
if (typeof window !== 'undefined') {
  useGameStore.subscribe((state, prev) => {
    if (state.phase === prev.phase) return

    if (state.phase === 'player_lobby' && state.roomCode && state.nickname) {
      saveSession({ roomCode: state.roomCode, nickname: state.nickname })
    }

    if (state.phase === 'home' || state.phase === 'question' || state.phase === 'game_over') {
      clearSession()
    }
  })
}
