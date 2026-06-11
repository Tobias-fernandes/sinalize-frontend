"use client"

import { useEffect, useState } from "react"
import { CheckCircle2 } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"
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

export function PlayerQuestionScreen() {
    const { currentQuestion, selectedOptionIndex, answerSubmitted, submitAnswer } = useGameStore()

    if (!currentQuestion) return null

    const { seconds, progress } = useTimer(currentQuestion.startedAt, currentQuestion.timeLimitSec)
    const isExpired = seconds === 0

    return (
        <Card
            className={cn(
                "overflow-hidden border-2 border-border/60 shadow-xl transition-colors",
                answerSubmitted && "border-emerald-500/40"
            )}
        >
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
                        {isExpired ? "—" : seconds}
                    </div>
                </div>

                <Progress value={progress} className="h-2" />

                <CardTitle className="text-xl font-heading leading-snug sm:text-2xl">
                    {currentQuestion.text}
                </CardTitle>
            </CardHeader>

            <CardContent className="space-y-3 px-4 pb-6 sm:px-6">
                {answerSubmitted ? (
                    <div className="flex items-center gap-2 rounded-xl border border-emerald-500/40 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-800">
                        <CheckCircle2 className="size-4 shrink-0" />
                        Resposta enviada! Aguardando o resultado...
                    </div>
                ) : isExpired ? (
                    <div className="rounded-xl border border-rose-500/40 bg-rose-500/10 px-4 py-3 text-center text-sm text-rose-700">
                        Tempo esgotado! Aguardando resultado...
                    </div>
                ) : null}

                <div className="grid gap-2 sm:grid-cols-2">
                    {currentQuestion.options.map((option, i) => {
                        const isSelected = selectedOptionIndex === i

                        return (
                            <Button
                                key={i}
                                variant="outline"
                                size="lg"
                                className={cn(
                                    "h-auto justify-start gap-3 rounded-xl px-4 py-3 text-left text-sm",
                                    !answerSubmitted && !isExpired
                                        ? "cursor-pointer border-border/70 bg-background hover:bg-muted/60"
                                        : isSelected
                                          ? "border-emerald-500/50 bg-emerald-500/10 text-emerald-800"
                                          : "border-border/40 bg-muted/20 text-muted-foreground",
                                    isSelected && "ring-2 ring-emerald-500/30"
                                )}
                                disabled={answerSubmitted || isExpired}
                                onClick={() => submitAnswer(i)}
                            >
                                <span
                                    className={cn(
                                        "grid size-6 shrink-0 place-items-center rounded-full border text-[0.65rem] font-bold",
                                        isSelected
                                            ? "border-current bg-background/60"
                                            : "border-border/60 bg-background"
                                    )}
                                >
                                    {OPTION_LABELS[i]}
                                </span>
                                <span>{option}</span>
                            </Button>
                        )
                    })}
                </div>

                {!answerSubmitted && !isExpired && (
                    <p className="text-center text-xs text-muted-foreground">
                        Escolha uma alternativa para responder.
                    </p>
                )}
            </CardContent>
        </Card>
    )
}
