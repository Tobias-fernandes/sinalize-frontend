"use client"

import { Hand, Monitor, Users } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { useGameStore } from "@/context/game"

export function HomeScreen() {
    const { chooseHost, choosePlayer, createRoom, error } = useGameStore()

    function handleHostClick() {
        chooseHost()
        createRoom()
    }

    return (
        <Card className="relative overflow-hidden border-border/70 shadow-2xl">
            <div className="pointer-events-none absolute -right-20 -top-20 size-56 rounded-full bg-primary/15 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-20 -left-20 size-56 rounded-full bg-amber-300/20 blur-3xl" />

            <CardHeader className="relative px-4 pt-4 text-center sm:px-6 sm:pt-6">
                <div className="mx-auto mb-3 flex size-14 items-center justify-center rounded-2xl bg-primary/10">
                    <Hand className="size-7 text-primary" />
                </div>

                <Badge variant="secondary" className="mx-auto mb-2 w-fit rounded-full px-3 py-1 text-xs">
                    Libras Quiz Multiplayer
                </Badge>

                <CardTitle className="text-2xl font-heading sm:text-4xl">
                    Sinalize
                </CardTitle>

                <CardDescription className="mx-auto max-w-sm text-sm leading-relaxed sm:text-base">
                    Quiz de Libras em tempo real. Crie uma sala ou entre em uma existente para jogar com amigos.
                </CardDescription>
            </CardHeader>

            <CardContent className="relative space-y-3 px-4 pb-6 sm:px-6">
                {error && (
                    <div className="rounded-xl border border-rose-500/40 bg-rose-500/10 px-4 py-3 text-center text-sm text-rose-700">
                        {error}
                    </div>
                )}

                <div className="grid gap-3 sm:grid-cols-2">
                    <button
                        onClick={handleHostClick}
                        className="group flex flex-col items-center gap-3 rounded-2xl border-2 border-primary/30 bg-primary/5 p-5 text-left transition-all hover:border-primary/60 hover:bg-primary/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60"
                    >
                        <div className="flex size-10 items-center justify-center rounded-xl bg-primary/15">
                            <Monitor className="size-5 text-primary" />
                        </div>
                        <div>
                            <p className="font-heading text-base font-semibold">Criar sala</p>
                            <p className="mt-0.5 text-xs text-muted-foreground">
                                Seja o host e controle o jogo
                            </p>
                        </div>
                    </button>

                    <button
                        onClick={choosePlayer}
                        className="group flex flex-col items-center gap-3 rounded-2xl border-2 border-amber-400/40 bg-amber-400/5 p-5 text-left transition-all hover:border-amber-400/70 hover:bg-amber-400/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60"
                    >
                        <div className="flex size-10 items-center justify-center rounded-xl bg-amber-400/20">
                            <Users className="size-5 text-amber-600" />
                        </div>
                        <div>
                            <p className="font-heading text-base font-semibold">Entrar em sala</p>
                            <p className="mt-0.5 text-xs text-muted-foreground">
                                Entre com um código de 6 dígitos
                            </p>
                        </div>
                    </button>
                </div>

                <p className="text-center text-xs text-muted-foreground">
                    15 perguntas · 20 segundos cada · até 1000 pontos por acerto
                </p>
            </CardContent>
        </Card>
    )
}
