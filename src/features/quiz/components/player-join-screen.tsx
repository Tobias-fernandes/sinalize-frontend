"use client"

import { useState } from "react"
import { ArrowLeft, Loader2, LogIn } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
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
        <Card className="overflow-hidden border-border/60 shadow-xl">
            <CardHeader className="px-6 pt-6 pb-0">
                <Badge variant="secondary" className="w-fit rounded-full px-3 py-1 text-xs font-medium">
                    Entrar como Jogador
                </Badge>
                <div className="mt-3 space-y-1">
                    <h2 className="font-heading text-2xl font-bold text-foreground">Entrar na sala</h2>
                    <p className="text-sm text-muted-foreground">
                        Informe o código de 6 dígitos e escolha seu apelido.
                    </p>
                </div>
            </CardHeader>

            <form onSubmit={handleSubmit}>
                <CardContent className="space-y-5 px-6 py-6">
                    <div className="space-y-2">
                        <label htmlFor="room-code" className="text-sm font-medium text-foreground">
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
                            className="w-full rounded-xl border border-border bg-card px-4 py-3.5 text-center font-heading text-3xl font-bold tracking-[0.4em] shadow-sm outline-none placeholder:text-muted-foreground/30 focus:border-primary focus:ring-3 focus:ring-primary/20 disabled:opacity-60"
                        />
                        <p className="text-xs text-muted-foreground">
                            Peça o código ao criador da sala.
                        </p>
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="nickname" className="text-sm font-medium text-foreground">
                            Apelido
                        </label>
                        <input
                            id="nickname"
                            type="text"
                            maxLength={20}
                            placeholder="Como quer ser chamado?"
                            value={nickname}
                            onChange={(e) => setNickname(e.target.value)}
                            disabled={isJoining}
                            className="w-full rounded-xl border border-border bg-card px-4 py-3 text-sm shadow-sm outline-none placeholder:text-muted-foreground/50 focus:border-primary focus:ring-3 focus:ring-primary/20 disabled:opacity-60"
                        />
                    </div>

                    {error && (
                        <div className="flex items-center gap-2.5 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
                            <span className="size-1.5 shrink-0 rounded-full bg-rose-500" />
                            {error}
                        </div>
                    )}
                </CardContent>

                <CardFooter className="flex gap-3 px-6 pb-6 pt-0">
                    <Button
                        type="button"
                        variant="outline"
                        size="lg"
                        onClick={reset}
                        disabled={isJoining}
                        className="shrink-0"
                    >
                        <ArrowLeft className="size-4" />
                        Voltar
                    </Button>

                    <Button
                        type="submit"
                        size="lg"
                        className="flex-1"
                        disabled={isJoining || code.trim().length !== 6 || nickname.trim().length === 0}
                    >
                        {isJoining ? (
                            <>
                                <Loader2 className="size-4 animate-spin" />
                                Entrando...
                            </>
                        ) : (
                            <>
                                <LogIn className="size-4" />
                                Entrar na sala
                            </>
                        )}
                    </Button>
                </CardFooter>
            </form>
        </Card>
    )
}
