export interface Question {
  id: string
  text: string
  options: string[]
  correctIndex: number
  timeLimitSec: number
}

export interface PublicQuestion {
  index: number
  total: number
  text: string
  options: string[]
  timeLimitSec: number
  startedAt: number
}

export interface LeaderboardEntry {
  playerId: string
  nickname: string
  score: number
  lastGain: number
}

export interface QuestionResults {
  correctIndex: number
  distribution: number[]
  leaderboard: LeaderboardEntry[]
}

export type PlayerInfo = {
  id: string
  nickname: string
  score: number
}
