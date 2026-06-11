"use client"

import { ChevronRight, Crown } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { useGameStore } from "@/context/game"

const OPTION_LABELS = ["A", "B", "C", "D"]

export function QuestionResultsScreen() {
    const { role, questionResults, currentQuestion, nextQuestion } = useGameStore()

    if (!questionResults) return null

    const { correctIndex, distribution, leaderboard } = questionResults
    const totalAnswers = distribution.reduce((a, b) => a + b, 0)
    const top5 = leaderboard.slice(0, 5)

    return (
        <Card className="overflow-hidden border-border/70 shadow-2xl">
            <CardHeader className="px-4 pt-4 sm:px-6 sm:pt-6">
                <div className="flex items-center justify-between gap-2">
                    <Badge variant="success" className="rounded-full px-3 py-1 text-xs">
                        Resultado da questão
                    </Badge>
                    {currentQuestion && (
                        <Badge variant="secondary" className="rounded-full px-3 py-1 text-xs">
                            {currentQuestion.index + 1} / {currentQuestion.total}
                        </Badge>
                    )}
                </div>

                <CardTitle className="mt-2 font-heading text-xl sm:text-2xl">
                    Resposta correta:{" "}
                    <span className="text-emerald-600">
                        {OPTION_LABELS[correctIndex]}
                    </span>
                </CardTitle>
            </CardHeader>

            <CardContent className="space-y-4 px-4 sm:px-6">
                {/* Distribution chart */}
                <div className="space-y-2 rounded-2xl border border-border/60 bg-muted/30 p-4">
                    <p className="text-xs font-medium text-muted-foreground">Distribuição das respostas</p>
                    {distribution.map((count, i) => {
                        const pct = totalAnswers > 0 ? Math.round((count / totalAnswers) * 100) : 0
                        const isCorrect = i === correctIndex

                        return (
                            <div key={i} className="flex items-center gap-2">
                                <span className="w-5 shrink-0 text-center text-xs font-bold text-muted-foreground">
                                    {OPTION_LABELS[i]}
                                </span>
                                <div className="flex-1 overflow-hidden rounded-full bg-border/40">
                                    <div
                                        className={cn(
                                            "h-5 rounded-full transition-all duration-500",
                                            isCorrect ? "bg-emerald-500" : "bg-muted-foreground/40"
                                        )}
                                        style={{ width: `${pct}%`, minWidth: count > 0 ? "1.5rem" : "0" }}
                                    />
                                </div>
                                <span className="w-12 shrink-0 text-right text-xs text-muted-foreground">
                                    {count} ({pct}%)
                                </span>
                            </div>
                        )
                    })}
                </div>

                {/* Leaderboard */}
                <div className="space-y-2 rounded-2xl border border-border/60 bg-muted/30 p-4">
                    <div className="mb-2 flex items-center gap-2">
                        <Crown className="size-4 text-amber-500" />
                        <p className="text-xs font-medium text-muted-foreground">
                            Placar (top {top5.length})
                        </p>
                    </div>
                    <ul className="space-y-1.5">
                        {top5.map((entry, i) => (
                            <li
                                key={entry.playerId}
                                className="flex items-center gap-3 rounded-lg bg-background/60 px-3 py-2"
                            >
                                <span
                                    className={cn(
                                        "grid size-6 shrink-0 place-items-center rounded-full text-xs font-bold",
                                        i === 0
                                            ? "bg-amber-400/20 text-amber-600"
                                            : i === 1
                                              ? "bg-slate-400/20 text-slate-600"
                                              : i === 2
                                                ? "bg-orange-400/20 text-orange-600"
                                                : "bg-muted text-muted-foreground"
                                    )}
                                >
                                    {i + 1}
                                </span>
                                <span className="flex-1 truncate text-sm font-medium">
                                    {entry.nickname}
                                </span>
                                <div className="text-right">
                                    <p className="text-sm font-bold">{entry.score}</p>
                                    {entry.lastGain > 0 && (
                                        <p className="text-xs text-emerald-600">+{entry.lastGain}</p>
                                    )}
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </CardContent>

            <CardFooter className="px-4 pb-4 sm:px-6 sm:pb-6">
                {role === "host" ? (
                    <Button size="lg" className="w-full" onClick={nextQuestion}>
                        <ChevronRight className="size-4" />
                        Próxima questão
                    </Button>
                ) : (
                    <p className="w-full text-center text-sm text-muted-foreground">
                        Aguardando o host avançar...
                    </p>
                )}
            </CardFooter>
        </Card>
    )
}
