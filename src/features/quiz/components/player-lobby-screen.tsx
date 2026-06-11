"use client"

import { Loader2, Users } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { useGameStore } from "@/context/game"

export function PlayerLobbyScreen() {
    const { roomCode, players } = useGameStore()

    return (
        <Card className="relative overflow-hidden border-border/70 shadow-2xl">
            <div className="pointer-events-none absolute -right-20 -top-20 size-56 rounded-full bg-primary/15 blur-3xl" />

            <CardHeader className="relative px-4 pt-4 sm:px-6 sm:pt-6">
                <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="rounded-full px-3 py-1 text-xs">
                        Sala {roomCode}
                    </Badge>
                    <Badge variant="outline" className="rounded-full px-3 py-1 text-xs">
                        {players.length} jogador{players.length !== 1 ? "es" : ""}
                    </Badge>
                </div>

                <CardTitle className="mt-2 font-heading text-2xl sm:text-3xl">
                    Aguardando o host...
                </CardTitle>

                <CardDescription className="flex items-center gap-2 text-sm sm:text-base">
                    <Loader2 className="size-4 animate-spin" />
                    O jogo começa quando o host iniciar a partida.
                </CardDescription>
            </CardHeader>

            <CardContent className="px-4 pb-6 sm:px-6">
                <div className="rounded-2xl border border-border/60 bg-muted/30 p-4">
                    <div className="mb-3 flex items-center gap-2">
                        <Users className="size-4 text-muted-foreground" />
                        <p className="text-sm font-medium">Jogadores na sala</p>
                    </div>

                    {players.length === 0 ? (
                        <p className="text-xs text-muted-foreground">Conectando...</p>
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
            </CardContent>
        </Card>
    )
}
