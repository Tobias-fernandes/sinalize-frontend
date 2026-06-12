"use client"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { useGameStore } from "@/context/game"
import { CircularTimer, OPTION_LABELS, OPTION_STYLES, useTimer } from "./question-view"

export function HostQuestionScreen() {
    const { currentQuestion } = useGameStore()

    if (!currentQuestion) return null

    const { seconds, progress } = useTimer(currentQuestion.startedAt, currentQuestion.timeLimitSec)

    return (
        <Card className="overflow-hidden border-border/60 shadow-xl">
            <CardHeader className="px-6 pt-6 pb-0">
                <div className="flex items-center justify-between gap-3">
                    <Badge variant="secondary" className="rounded-full px-3 py-1 text-xs font-medium">
                        Questão {currentQuestion.index + 1} de {currentQuestion.total}
                    </Badge>
                    <CircularTimer seconds={seconds} progress={progress} />
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

            <CardContent className="px-6 py-6">
                <div className="mb-4 flex items-center gap-2 text-xs text-muted-foreground">
                    <span className="size-1.5 animate-pulse rounded-full bg-primary/60" />
                    Aguardando respostas dos jogadores...
                </div>

                <div className="grid gap-2.5 sm:grid-cols-2">
                    {currentQuestion.options.map((option, i) => {
                        const style = OPTION_STYLES[i] ?? OPTION_STYLES[0]!
                        return (
                            <div
                                key={i}
                                className={`flex items-center gap-3 rounded-xl border px-4 py-3.5 text-sm ${style.host}`}
                            >
                                <span className={`grid size-7 shrink-0 place-items-center rounded-lg text-xs font-bold ${style.label}`}>
                                    {OPTION_LABELS[i]}
                                </span>
                                <span className="font-medium">{option}</span>
                            </div>
                        )
                    })}
                </div>
            </CardContent>
        </Card>
    )
}
