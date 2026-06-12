"use client"

import { useEffect, useState } from "react"
import { Hand, Menu } from "lucide-react"
import { useGameStore } from "@/context/game"
import { loadSession } from "@/lib/session"
import { LoginScreen } from "./login-screen"
import { Sidebar } from "./sidebar"
import { HomeScreen } from "./home-screen"
import { HostLobbyScreen } from "./host-lobby-screen"
import { PlayerJoinScreen } from "./player-join-screen"
import { PlayerLobbyScreen } from "./player-lobby-screen"
import { HostQuestionScreen } from "./host-question-screen"
import { PlayerQuestionScreen } from "./player-question-screen"
import { QuestionResultsScreen } from "./question-results-screen"
import { PodiumScreen } from "./podium-screen"

const PHASE_LABELS: Record<string, string> = {
    home: "Início",
    host_creating: "Criando sala...",
    host_lobby: "Sala do Host",
    player_join: "Entrar na sala",
    player_joining: "Entrando...",
    player_lobby: "Aguardando...",
    question: "Questão",
    question_results: "Resultado",
    game_over: "Fim de jogo",
}

export function QuizGame() {
    const { phase, role, joinRoom, reset } = useGameStore()
    const [userName, setUserName] = useState<string | null>(null)
    const [sidebarOpen, setSidebarOpen] = useState(false)

    useEffect(() => {
        const session = loadSession()
        if (session) {
            joinRoom(session.roomCode, session.nickname)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    // Close sidebar on phase change (user navigated)
    useEffect(() => {
        setSidebarOpen(false)
    }, [phase])

    if (!userName) {
        return <LoginScreen onLogin={setUserName} />
    }

    function handleLogout() {
        reset()
        setUserName(null)
    }

    return (
        <div className="flex min-h-dvh bg-background">
            <Sidebar
                userName={userName}
                onLogout={handleLogout}
                isOpen={sidebarOpen}
                onClose={() => setSidebarOpen(false)}
            />

            {/* Content area — offset by sidebar on desktop */}
            <div className="flex flex-1 flex-col md:ml-64">
                {/* Mobile top bar */}
                <header className="sticky top-0 z-20 flex items-center gap-3 border-b border-border/60 bg-card/95 px-4 py-3 backdrop-blur-md md:hidden">
                    <button
                        onClick={() => setSidebarOpen(true)}
                        className="flex size-9 items-center justify-center rounded-xl text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                        aria-label="Abrir menu"
                    >
                        <Menu className="size-5" />
                    </button>

                    <div className="flex items-center gap-2">
                        <div className="flex size-6 items-center justify-center rounded-lg bg-primary/10">
                            <Hand className="size-3.5 text-primary" />
                        </div>
                        <span className="font-heading text-sm font-semibold text-foreground">Sinalize</span>
                    </div>

                    <span className="ml-auto text-xs text-muted-foreground">
                        {PHASE_LABELS[phase] ?? ""}
                    </span>
                </header>

                {/* Main content */}
                <main className="relative isolate flex flex-1 items-start justify-center overflow-hidden px-4 py-6 sm:px-6 sm:py-8 md:items-center md:py-12">
                    <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(90%_70%_at_15%_10%,color-mix(in_oklab,var(--color-primary)_14%,white)_0%,transparent_60%)]" />
                    <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(70%_55%_at_90%_95%,color-mix(in_oklab,#f59e0b_14%,white)_0%,transparent_60%)]" />

                    <section key={phase} className="relative z-10 w-full max-w-2xl animate-fade-up">
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
            </div>
        </div>
    )
}
