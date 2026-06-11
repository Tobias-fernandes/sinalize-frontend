"use client"

import { useState } from "react"
import { Check, Copy, Loader2, Play, Users } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { useGameStore } from "@/context/game"

export function HostLobbyScreen() {
    const { phase, roomCode, players, startGame, error } = useGameStore()
    const [copied, setCopied] = useState(false)
    const isCreating = phase === "host_creating"

    function copyCode() {
        if (!roomCode) return
        navigator.clipboard.writeText(roomCode).then(() => {
            setCopied(true)
            setTimeout(() => setCopied(false), 2000)
        })
    }

    return (
        <Card className="relative overflow-hidden border-border/70 shadow-2xl">
            <div className="pointer-events-none absolute -right-20 -top-20 size-56 rounded-full bg-primary/15 blur-3xl" />

            <CardHeader className="relative px-4 pt-4 sm:px-6 sm:pt-6">
                <Badge variant="secondary" className="w-fit rounded-full px-3 py-1 text-xs">
                    Sala do Host
                </Badge>

                <CardTitle className="mt-2 font-heading text-2xl sm:text-3xl">
                    {isCreating ? "Criando sala..." : "Aguardando jogadores"}
                </CardTitle>

                <CardDescription className="text-sm sm:text-base">
                    {isCreating
                        ? "Conectando ao servidor..."
                        : "Compartilhe o código abaixo com os jogadores."}
                </CardDescription>
            </CardHeader>

            <CardContent className="space-y-4 px-4 sm:px-6">
                {isCreating ? (
                    <div className="flex items-center justify-center py-8">
                        <Loader2 className="size-8 animate-spin text-primary" />
                    </div>
                ) : (
                    <>
                        <div className="flex items-center gap-2 rounded-2xl border-2 border-primary/30 bg-primary/5 px-4 py-4">
                            <div className="flex-1 text-center">
                                <p className="text-xs text-muted-foreground">Código da sala</p>
                                <p className="mt-1 font-heading text-4xl font-bold tracking-widest text-primary sm:text-5xl">
                                    {roomCode}
                                </p>
                            </div>
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={copyCode}
                                aria-label="Copiar código"
                                className="shrink-0"
                            >
                                {copied ? (
                                    <Check className="size-4 text-emerald-600" />
                                ) : (
                                    <Copy className="size-4" />
                                )}
                            </Button>
                        </div>

                        <div className="rounded-2xl border border-border/60 bg-muted/30 p-4">
                            <div className="mb-3 flex items-center gap-2">
                                <Users className="size-4 text-muted-foreground" />
                                <p className="text-sm font-medium">
                                    {players.length === 0
                                        ? "Nenhum jogador ainda"
                                        : `${players.length} jogador${players.length > 1 ? "es" : ""}`}
                                </p>
                            </div>

                            {players.length === 0 ? (
                                <p className="text-xs text-muted-foreground">
                                    Os jogadores aparecerão aqui conforme entrarem na sala.
                                </p>
                            ) : (
                                <ul className="space-y-1.5">
                                    {players.map((p) => (
                                        <li
                                            key={p.id}
                                            className="flex items-center gap-2 rounded-lg bg-background/60 px-3 py-2 text-sm"
                                        >
                                            <span className="size-2 rounded-full bg-emerald-500" />
                                            {p.nickname}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    </>
                )}

                {error && (
                    <div className="rounded-xl border border-rose-500/40 bg-rose-500/10 px-4 py-3 text-sm text-rose-700">
                        {error}
                    </div>
                )}
            </CardContent>

            {!isCreating && (
                <CardFooter className="px-4 pb-4 sm:px-6 sm:pb-6">
                    <Button
                        size="lg"
                        className="w-full"
                        disabled={players.length === 0}
                        onClick={startGame}
                    >
                        <Play className="size-4" />
                        Iniciar jogo
                        {players.length > 0 && (
                            <Badge variant="secondary" className="ml-1 rounded-full px-2 py-0 text-xs">
                                {players.length}
                            </Badge>
                        )}
                    </Button>
                </CardFooter>
            )}
        </Card>
    )
}
