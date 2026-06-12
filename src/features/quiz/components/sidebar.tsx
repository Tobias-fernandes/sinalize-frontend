"use client"

import { Hand, LogOut, Monitor, User, Users, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { useGameStore } from "@/context/game"

interface SidebarProps {
    userName: string
    onLogout: () => void
    isOpen: boolean
    onClose: () => void
}

function getInitials(name: string) {
    return name
        .split(/[\s._-]+/)
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
}

export function Sidebar({ userName, onLogout, isOpen, onClose }: SidebarProps) {
    const { phase, role, chooseHost, createRoom, choosePlayer } = useGameStore()

    const isHostActive =
        (phase === "host_creating" ||
            phase === "host_lobby" ||
            (phase === "question" && role === "host") ||
            phase === "question_results") &&
        role === "host"

    const isPlayerActive =
        (phase === "player_join" ||
            phase === "player_joining" ||
            phase === "player_lobby" ||
            (phase === "question" && role === "player") ||
            phase === "question_results") &&
        role === "player"

    function handleCriarSala() {
        chooseHost()
        createRoom()
        onClose()
    }

    function handleEntrarSala() {
        choosePlayer()
        onClose()
    }

    return (
        <>
            {/* Mobile overlay */}
            <div
                className={cn(
                    "fixed inset-0 z-30 bg-black/40 backdrop-blur-sm transition-opacity duration-300 md:hidden",
                    isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
                )}
                onClick={onClose}
            />

            {/* Sidebar panel */}
            <aside
                className={cn(
                    "fixed left-0 top-0 z-40 flex h-full w-64 flex-col border-r border-border/60 bg-card/98 backdrop-blur-md transition-transform duration-300 ease-in-out",
                    // Mobile: slide in/out; Desktop: always visible
                    "md:translate-x-0",
                    isOpen ? "translate-x-0" : "-translate-x-full"
                )}
            >
                {/* Brand */}
                <div className="flex items-center justify-between px-5 py-5">
                    <div className="flex items-center gap-2.5">
                        <div className="flex size-8 shrink-0 items-center justify-center rounded-xl bg-primary/12 ring-1 ring-primary/20">
                            <Hand className="size-4 text-primary" />
                        </div>
                        <span className="font-heading text-base font-semibold tracking-tight text-foreground">
                            Sinalize
                        </span>
                    </div>
                    {/* Close button — mobile only */}
                    <button
                        onClick={onClose}
                        className="flex size-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground md:hidden"
                        aria-label="Fechar menu"
                    >
                        <X className="size-4" />
                    </button>
                </div>

                <div className="mx-3 h-px bg-border/60" />

                {/* Navigation */}
                <nav className="flex-1 space-y-0.5 px-3 py-4">
                    <p className="mb-2 px-2 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/50">
                        Salas
                    </p>

                    <SidebarButton
                        icon={<Monitor className="size-4" />}
                        label="Criar sala"
                        active={isHostActive}
                        activeColor="text-primary bg-primary/10 hover:bg-primary/14"
                        onClick={handleCriarSala}
                    />

                    <SidebarButton
                        icon={<Users className="size-4" />}
                        label="Entrar na sala"
                        active={isPlayerActive}
                        activeColor="text-amber-700 bg-amber-500/10 hover:bg-amber-500/14"
                        onClick={handleEntrarSala}
                    />
                </nav>

                <div className="mx-3 h-px bg-border/60" />

                {/* Footer */}
                <div className="space-y-0.5 px-3 py-4">
                    <SidebarButton
                        icon={<User className="size-4" />}
                        label="Minha conta"
                        onClick={onClose}
                    />

                    <SidebarButton
                        icon={<LogOut className="size-4" />}
                        label="Sair"
                        danger
                        onClick={() => {
                            onClose()
                            onLogout()
                        }}
                    />

                    {/* User info */}
                    <div className="mt-3 flex items-center gap-3 rounded-xl px-2 py-2">
                        <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary/15 ring-1 ring-primary/25">
                            <span className="font-heading text-xs font-bold text-primary">
                                {getInitials(userName)}
                            </span>
                        </div>
                        <div className="min-w-0">
                            <p className="truncate text-sm font-medium capitalize text-foreground">
                                {userName}
                            </p>
                            <p className="text-xs text-muted-foreground">Conta demo</p>
                        </div>
                    </div>
                </div>
            </aside>
        </>
    )
}

function SidebarButton({
    icon,
    label,
    active = false,
    activeColor = "text-primary bg-primary/10 hover:bg-primary/14",
    danger = false,
    onClick,
}: {
    icon: React.ReactNode
    label: string
    active?: boolean
    activeColor?: string
    danger?: boolean
    onClick: () => void
}) {
    return (
        <button
            onClick={onClick}
            className={cn(
                "flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-150",
                active
                    ? activeColor
                    : danger
                      ? "text-muted-foreground hover:bg-rose-50 hover:text-rose-600"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
            )}
        >
            <span className={cn(active ? "opacity-100" : "opacity-70")}>{icon}</span>
            {label}
            {active && <span className="ml-auto size-1.5 rounded-full bg-current opacity-70" />}
        </button>
    )
}
