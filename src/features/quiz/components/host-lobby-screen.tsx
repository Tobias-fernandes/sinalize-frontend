"use client"

import { useState } from "react"
import { Check, Copy, Loader2, Play, Users, Wifi } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
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
        <Card className="overflow-hidden border-border/60 shadow-xl">
            <CardHeader className="px-6 pt-6 pb-0">
                <div className="flex items-center justify-between">
                    <Badge variant="secondary" className="rounded-full px-3 py-1 text-xs font-medium">
                        Sala do Host
                    </Badge>
                    {!isCreating && (
                        <div className="flex items-center gap-1.5 text-xs text-emerald-600">
                            <Wifi className="size-3.5" />
                            <span className="font-medium">Ao vivo</span>
                        </div>
                    )}
                </div>

                <div className="mt-3 space-y-1">
                    <h2 className="font-heading text-2xl font-bold text-foreground">
                        {isCreating ? "Criando sala..." : "Aguardando jogadores"}
                    </h2>
                    <p className="text-sm text-muted-foreground">
                        {isCreating
                            ? "Conectando ao servidor, aguarde um momento."
                            : "Compartilhe o código abaixo com os participantes."}
                    </p>
                </div>
            </CardHeader>

            <CardContent className="space-y-4 px-6 py-6">
                {isCreating ? (
                    <div className="flex flex-col items-center justify-center gap-3 py-10">
                        <Loader2 className="size-8 animate-spin text-primary" />
                        <p className="text-sm text-muted-foreground">Conectando ao servidor...</p>
                    </div>
                ) : (
                    <>
                        {/* Room code */}
                        <div className="overflow-hidden rounded-2xl border-2 border-primary/20 bg-primary/5">
                            <div className="px-6 py-5 text-center">
                                <p className="mb-1.5 text-xs font-medium uppercase tracking-widest text-primary/70">
                                    Código da sala
                                </p>
                                <p className="font-heading text-5xl font-bold tracking-[0.2em] text-primary sm:text-6xl">
                                    {roomCode}
                                </p>
                            </div>
                            <div className="border-t border-primary/15 bg-primary/8 px-4 py-2.5">
                                <button
                                    onClick={copyCode}
                                    className="flex w-full items-center justify-center gap-2 text-sm font-medium text-primary/80 transition-colors hover:text-primary"
                                >
                                    {copied ? (
                                        <>
                                            <Check className="size-3.5" />
                                            Copiado!
                                        </>
                                    ) : (
                                        <>
                                            <Copy className="size-3.5" />
                                            Copiar código
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* Player list */}
                        <div className="rounded-2xl border border-border/60 bg-muted/20">
                            <div className="flex items-center justify-between px-4 py-3">
                                <div className="flex items-center gap-2">
                                    <Users className="size-4 text-muted-foreground" />
                                    <span className="text-sm font-medium text-foreground">
                                        Jogadores
                                    </span>
                                </div>
                                <Badge variant="outline" className="rounded-full px-2.5 text-xs">
                                    {players.length}
                                </Badge>
                            </div>

                            <div className="border-t border-border/40 px-4 py-3">
                                {players.length === 0 ? (
                                    <div className="flex items-center gap-2 py-2 text-sm text-muted-foreground">
                                        <span className="size-1.5 animate-pulse rounded-full bg-muted-foreground/50" />
                                        Aguardando conexões...
                                    </div>
                                ) : (
                                    <ul className="space-y-1.5">
                                        {players.map((p, i) => (
                                            <li
                                                key={p.id}
                                                className="flex items-center gap-3 rounded-xl bg-background/70 px-3 py-2.5 text-sm animate-slide-in-left"
                                                style={{ animationDelay: `${i * 50}ms` }}
                                            >
                                                <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-[10px] font-bold text-emerald-700">
                                                    {p.nickname[0]?.toUpperCase()}
                                                </span>
                                                <span className="flex-1 font-medium text-foreground">{p.nickname}</span>
                                                <span className="size-1.5 rounded-full bg-emerald-500" />
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        </div>

                        {error && (
                            <div className="flex items-center gap-2.5 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
                                <span className="size-1.5 shrink-0 rounded-full bg-rose-500" />
                                {error}
                            </div>
                        )}
                    </>
                )}
            </CardContent>

            {!isCreating && (
                <CardFooter className="px-6 pb-6 pt-0">
                    <Button
                        size="lg"
                        className="w-full gap-2"
                        disabled={players.length === 0}
                        onClick={startGame}
                    >
                        <Play className="size-4" />
                        Iniciar jogo
                        {players.length > 0 && (
                            <span className="ml-1 rounded-full bg-primary-foreground/20 px-2 py-0.5 text-xs font-bold">
                                {players.length}
                            </span>
                        )}
                    </Button>
                </CardFooter>
            )}
        </Card>
    )
}
