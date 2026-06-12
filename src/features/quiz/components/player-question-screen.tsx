"use client"

import { CheckCircle2, Clock } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { useGameStore } from "@/context/game"
import { CircularTimer, OPTION_LABELS, OPTION_STYLES, useTimer } from "./question-view"

export function PlayerQuestionScreen() {
    const { currentQuestion, selectedOptionIndex, answerSubmitted, submitAnswer } = useGameStore()

    if (!currentQuestion) return null

    const { seconds, progress } = useTimer(currentQuestion.startedAt, currentQuestion.timeLimitSec)
    const isExpired = seconds === 0

    return (
        <Card
            className={cn(
                "overflow-hidden border-border/60 shadow-xl transition-colors duration-300",
                answerSubmitted && "border-emerald-300"
            )}
        >
            <CardHeader className="px-6 pt-6 pb-0">
                <div className="flex items-center justify-between gap-3">
                    <Badge variant="secondary" className="rounded-full px-3 py-1 text-xs font-medium">
                        Questão {currentQuestion.index + 1} de {currentQuestion.total}
                    </Badge>
                    <CircularTimer seconds={isExpired ? 0 : seconds} progress={progress} />
                </div>

                {/* Progress bar */}
                <div className="mt-4 h-1.5 w-full overflow-hidden rounded-full bg-border/60">
                    <div
                        className={`h-full rounded-full transition-[width] duration-100 ${
                            seconds <= 5 ? "bg-rose-500" : seconds <= 10 ? "bg-amber-500" : "bg-primary"
                        }`}
                        style={{ width: `${progress}%` }}
                    />
                </div>

                <h2 className="mt-4 font-heading text-xl font-bold leading-snug text-foreground sm:text-2xl">
                    {currentQuestion.text}
                </h2>
            </CardHeader>

            <CardContent className="space-y-4 px-6 py-6">
                {/* Status feedback */}
                {answerSubmitted ? (
                    <div className="flex items-center gap-3 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
                        <CheckCircle2 className="size-4 shrink-0 text-emerald-600" />
                        <span>Resposta enviada! Aguardando o resultado...</span>
                    </div>
                ) : isExpired ? (
                    <div className="flex items-center gap-3 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
                        <Clock className="size-4 shrink-0" />
                        <span>Tempo esgotado! Aguardando resultado...</span>
                    </div>
                ) : null}

                {/* Options */}
                <div className="grid gap-2.5 sm:grid-cols-2">
                    {currentQuestion.options.map((option, i) => {
                        const isSelected = selectedOptionIndex === i
                        const style = OPTION_STYLES[i] ?? OPTION_STYLES[0]!
                        const disabled = answerSubmitted || isExpired

                        return (
                            <button
                                key={i}
                                disabled={disabled}
                                onClick={() => submitAnswer(i)}
                                className={cn(
                                    "flex items-center gap-3 rounded-xl border-2 px-4 py-3.5 text-left text-sm font-medium transition-all duration-150",
                                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50",
                                    disabled
                                        ? isSelected
                                            ? cn("ring-2", style.selected)
                                            : "border-border/40 bg-muted/20 text-muted-foreground opacity-70"
                                        : cn("cursor-pointer active:scale-[0.98]", style.base)
                                )}
                            >
                                <span
                                    className={cn(
                                        "grid size-7 shrink-0 place-items-center rounded-lg text-xs font-bold transition-colors",
                                        disabled && isSelected ? "bg-current/15 text-current" : style.label
                                    )}
                                >
                                    {OPTION_LABELS[i]}
                                </span>
                                <span className="leading-snug">{option}</span>
                            </button>
                        )
                    })}
                </div>

                {!answerSubmitted && !isExpired && (
                    <p className="text-center text-xs text-muted-foreground">
                        Toque em uma alternativa para responder.
                    </p>
                )}
            </CardContent>
        </Card>
    )
}
