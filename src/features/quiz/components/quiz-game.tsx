"use client"

import { useGameStore } from "@/context/game"
import { HomeScreen } from "./home-screen"
import { HostLobbyScreen } from "./host-lobby-screen"
import { PlayerJoinScreen } from "./player-join-screen"
import { PlayerLobbyScreen } from "./player-lobby-screen"
import { HostQuestionScreen } from "./host-question-screen"
import { PlayerQuestionScreen } from "./player-question-screen"
import { QuestionResultsScreen } from "./question-results-screen"
import { PodiumScreen } from "./podium-screen"

export function QuizGame() {
    const { phase, role } = useGameStore()

    return (
        <main className="relative isolate flex min-h-dvh w-full items-start justify-center overflow-hidden px-3 py-4 sm:items-center sm:px-6 sm:py-8">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(90%_70%_at_15%_10%,color-mix(in_oklab,var(--color-primary)_18%,white)_0%,transparent_60%)]" />
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(80%_60%_at_90%_90%,color-mix(in_oklab,#f59e0b_18%,white)_0%,transparent_60%)]" />
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,transparent_0%,rgba(0,0,0,0.04)_100%)]" />

            <section className="relative z-10 w-full max-w-3xl">
                {phase === "home" && <HomeScreen />}

                {(phase === "host_creating" || phase === "host_lobby") && <HostLobbyScreen />}

                {(phase === "player_join" || phase === "player_joining") && <PlayerJoinScreen />}

                {phase === "player_lobby" && <PlayerLobbyScreen />}

                {phase === "question" && role === "host" && <HostQuestionScreen />}

                {phase === "question" && role === "player" && <PlayerQuestionScreen />}

                {phase === "question_results" && <QuestionResultsScreen />}

                {phase === "game_over" && <PodiumScreen />}
            </section>
        </main>
    )
}
