"use client"

import { useState } from "react"
import { ArrowLeft, Loader2, LogIn } from "lucide-react"

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

export function PlayerJoinScreen() {
    const { phase, joinRoom, reset, error } = useGameStore()
    const [code, setCode] = useState("")
    const [nickname, setNickname] = useState("")
    const isJoining = phase === "player_joining"

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        if (code.trim().length === 6 && nickname.trim().length > 0) {
            joinRoom(code.trim(), nickname.trim())
        }
    }

    return (
        <Card className="relative overflow-hidden border-border/70 shadow-2xl">
            <div className="pointer-events-none absolute -bottom-20 -left-20 size-56 rounded-full bg-amber-300/20 blur-3xl" />

            <CardHeader className="relative px-4 pt-4 sm:px-6 sm:pt-6">
                <Badge variant="secondary" className="w-fit rounded-full px-3 py-1 text-xs">
                    Entrar como Jogador
                </Badge>

                <CardTitle className="mt-2 font-heading text-2xl sm:text-3xl">
                    Entrar na sala
                </CardTitle>

                <CardDescription className="text-sm sm:text-base">
                    Informe o código de 6 dígitos e escolha seu apelido.
                </CardDescription>
            </CardHeader>

            <form onSubmit={handleSubmit}>
                <CardContent className="space-y-4 px-4 sm:px-6">
                    <div className="space-y-2">
                        <label
                            htmlFor="room-code"
                            className="text-sm font-medium text-foreground"
                        >
                            Código da sala
                        </label>
                        <input
                            id="room-code"
                            type="text"
                            inputMode="numeric"
                            maxLength={6}
                            placeholder="000000"
                            value={code}
                            onChange={(e) => setCode(e.target.value.replace(/\D/g, ""))}
                            disabled={isJoining}
                            className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-center font-heading text-2xl tracking-widest placeholder:text-muted-foreground/50 focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring/40 disabled:opacity-50"
                        />
                    </div>

                    <div className="space-y-2">
                        <label
                            htmlFor="nickname"
                            className="text-sm font-medium text-foreground"
                        >
                            Apelido
                        </label>
                        <input
                            id="nickname"
                            type="text"
                            maxLength={20}
                            placeholder="Seu nome no jogo"
                            value={nickname}
                            onChange={(e) => setNickname(e.target.value)}
                            disabled={isJoining}
                            className="w-full rounded-xl border border-border bg-background px-4 py-2.5 placeholder:text-muted-foreground/50 focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring/40 disabled:opacity-50"
                        />
                    </div>

                    {error && (
                        <div className="rounded-xl border border-rose-500/40 bg-rose-500/10 px-4 py-3 text-sm text-rose-700">
                            {error}
                        </div>
                    )}
                </CardContent>

                <CardFooter className="flex gap-2 px-4 pb-4 sm:px-6 sm:pb-6">
                    <Button
                        type="button"
                        variant="outline"
                        size="lg"
                        onClick={reset}
                        disabled={isJoining}
                    >
                        <ArrowLeft className="size-4" />
                        Voltar
                    </Button>

                    <Button
                        type="submit"
                        size="lg"
                        className="flex-1"
                        disabled={
                            isJoining ||
                            code.trim().length !== 6 ||
                            nickname.trim().length === 0
                        }
                    >
                        {isJoining ? (
                            <Loader2 className="size-4 animate-spin" />
                        ) : (
                            <LogIn className="size-4" />
                        )}
                        {isJoining ? "Entrando..." : "Entrar"}
                    </Button>
                </CardFooter>
            </form>
        </Card>
    )
}
