"use client"

import { Loader2, Users } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { useGameStore } from "@/context/game"

export function PlayerLobbyScreen() {
    const { roomCode, players, nickname } = useGameStore()

    return (
        <Card className="overflow-hidden border-border/60 shadow-xl">
            <CardHeader className="px-6 pt-6 pb-0">
                <div className="flex flex-wrap items-center gap-2">
                    <Badge variant="secondary" className="rounded-full px-3 py-1 text-xs font-medium">
                        Sala {roomCode}
                    </Badge>
                    <Badge variant="outline" className="rounded-full px-3 py-1 text-xs">
                        {players.length} jogador{players.length !== 1 ? "es" : ""}
                    </Badge>
                </div>

                <div className="mt-3 space-y-1">
                    <h2 className="font-heading text-2xl font-bold text-foreground">
                        Aguardando o host...
                    </h2>
                    <p className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Loader2 className="size-3.5 animate-spin" />
                        O jogo começa quando o host iniciar a partida.
                    </p>
                </div>
            </CardHeader>

            <CardContent className="space-y-4 px-6 py-6">
                {/* Your card */}
                {nickname && (
                    <div className="flex items-center gap-3 rounded-2xl border-2 border-primary/25 bg-primary/6 px-4 py-4">
                        <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/15 ring-2 ring-primary/25">
                            <span className="font-heading text-sm font-bold text-primary">
                                {nickname[0]?.toUpperCase()}
                            </span>
                        </div>
                        <div>
                            <p className="text-xs text-muted-foreground">Você está conectado como</p>
                            <p className="font-heading text-base font-semibold text-foreground">{nickname}</p>
                        </div>
                        <span className="ml-auto flex items-center gap-1.5 text-xs font-medium text-emerald-600">
                            <span className="size-1.5 animate-pulse rounded-full bg-emerald-500" />
                            Na sala
                        </span>
                    </div>
                )}

                {/* Player list */}
                <div className="rounded-2xl border border-border/60 bg-muted/20">
                    <div className="flex items-center justify-between px-4 py-3">
                        <div className="flex items-center gap-2">
                            <Users className="size-4 text-muted-foreground" />
                            <span className="text-sm font-medium text-foreground">Jogadores na sala</span>
                        </div>
                    </div>
                    <div className="border-t border-border/40 px-4 py-3">
                        {players.length === 0 ? (
                            <p className="py-1 text-sm text-muted-foreground">Conectando...</p>
                        ) : (
                            <ul className="space-y-1.5">
                                {players.map((p, i) => (
                                    <li
                                        key={p.id}
                                        className="flex items-center gap-3 rounded-xl bg-background/70 px-3 py-2.5 text-sm animate-slide-in-left"
                                        style={{ animationDelay: `${i * 40}ms` }}
                                    >
                                        <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-muted text-[10px] font-bold text-muted-foreground">
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
            </CardContent>
        </Card>
    )
}
