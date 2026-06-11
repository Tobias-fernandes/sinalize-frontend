"use client"

import { useEffect, useState } from "react"

import { Badge } from "@/components/ui/badge"
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { useGameStore } from "@/context/game"

function useTimer(startedAt: number, timeLimitSec: number) {
    const [remainingMs, setRemainingMs] = useState(() =>
        Math.max(0, timeLimitSec * 1000 - (Date.now() - startedAt))
    )

    useEffect(() => {
        const id = setInterval(() => {
            setRemainingMs(Math.max(0, timeLimitSec * 1000 - (Date.now() - startedAt)))
        }, 100)
        return () => clearInterval(id)
    }, [startedAt, timeLimitSec])

    return {
        seconds: Math.ceil(remainingMs / 1000),
        progress: (remainingMs / (timeLimitSec * 1000)) * 100,
    }
}

const OPTION_LABELS = ["A", "B", "C", "D"]
const OPTION_COLORS = [
    "border-sky-500/40 bg-sky-500/10 text-sky-800",
    "border-amber-500/40 bg-amber-500/10 text-amber-800",
    "border-rose-500/40 bg-rose-500/10 text-rose-800",
    "border-emerald-500/40 bg-emerald-500/10 text-emerald-800",
]

export function HostQuestionScreen() {
    const { currentQuestion } = useGameStore()

    if (!currentQuestion) return null

    const { seconds, progress } = useTimer(currentQuestion.startedAt, currentQuestion.timeLimitSec)

    return (
        <Card className="overflow-hidden border-2 border-border/60 shadow-xl">
            <CardHeader className="space-y-3 px-4 pt-4 sm:space-y-4 sm:px-6 sm:pt-6">
                <div className="flex items-center justify-between gap-2">
                    <Badge variant="secondary" className="rounded-full px-3 py-1 text-xs">
                        Questão {currentQuestion.index + 1} de {currentQuestion.total}
                    </Badge>

                    <div
                        className={`flex size-10 items-center justify-center rounded-full font-heading text-lg font-bold transition-colors ${
                            seconds <= 5
                                ? "bg-rose-500/15 text-rose-600"
                                : seconds <= 10
                                  ? "bg-amber-500/15 text-amber-600"
                                  : "bg-primary/10 text-primary"
                        }`}
                    >
                        {seconds}
                    </div>
                </div>

                <Progress value={progress} className="h-2" />

                <CardTitle className="text-xl font-heading leading-snug sm:text-2xl">
                    {currentQuestion.text}
                </CardTitle>
            </CardHeader>

            <CardContent className="space-y-3 px-4 pb-6 sm:space-y-3 sm:px-6">
                <p className="text-xs text-muted-foreground">Aguardando respostas dos jogadores...</p>

                <div className="grid gap-2 sm:grid-cols-2">
                    {currentQuestion.options.map((option, i) => (
                        <div
                            key={i}
                            className={`flex items-center gap-3 rounded-xl border px-4 py-3 text-sm ${OPTION_COLORS[i] ?? "border-border/50 bg-muted/30"}`}
                        >
                            <span className="grid size-6 shrink-0 place-items-center rounded-full border border-current/30 text-[0.65rem] font-bold">
                                {OPTION_LABELS[i]}
                            </span>
                            <span>{option}</span>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    )
}
