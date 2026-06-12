"use client"

import { ChevronRight, Crown, TrendingUp } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { useGameStore } from "@/context/game"

const OPTION_LABELS = ["A", "B", "C", "D"]

const RANK_STYLES = [
    "bg-amber-100 text-amber-700 ring-1 ring-amber-300/60",
    "bg-slate-100 text-slate-600 ring-1 ring-slate-300/60",
    "bg-orange-100 text-orange-600 ring-1 ring-orange-300/60",
]

export function QuestionResultsScreen() {
    const { role, questionResults, currentQuestion, nextQuestion } = useGameStore()

    if (!questionResults) return null

    const { correctIndex, distribution, leaderboard } = questionResults
    const totalAnswers = distribution.reduce((a, b) => a + b, 0)
    const top5 = leaderboard.slice(0, 5)

    return (
        <Card className="overflow-hidden border-border/60 shadow-xl">
            <CardHeader className="px-6 pt-6 pb-0">
                <div className="flex items-center justify-between gap-2">
                    <Badge variant="success" className="rounded-full px-3 py-1 text-xs font-medium">
                        Resultado da questão
                    </Badge>
                    {currentQuestion && (
                        <Badge variant="secondary" className="rounded-full px-3 py-1 text-xs">
                            {currentQuestion.index + 1} / {currentQuestion.total}
                        </Badge>
                    )}
                </div>

                <div className="mt-3">
                    <p className="text-sm text-muted-foreground">Resposta correta</p>
                    <h2 className="font-heading text-2xl font-bold text-foreground sm:text-3xl">
                        Opção{" "}
                        <span className="text-emerald-600">{OPTION_LABELS[correctIndex]}</span>
                    </h2>
                </div>
            </CardHeader>

            <CardContent className="space-y-4 px-6 py-6">
                {/* Distribution */}
                <div className="overflow-hidden rounded-2xl border border-border/60 bg-muted/20">
                    <div className="flex items-center gap-2 px-4 py-3">
                        <TrendingUp className="size-4 text-muted-foreground" />
                        <p className="text-sm font-medium text-foreground">Distribuição das respostas</p>
                        <span className="ml-auto text-xs text-muted-foreground">{totalAnswers} resp.</span>
                    </div>
                    <div className="space-y-2 border-t border-border/40 px-4 py-3">
                        {distribution.map((count, i) => {
                            const pct = totalAnswers > 0 ? Math.round((count / totalAnswers) * 100) : 0
                            const isCorrect = i === correctIndex
                            return (
                                <div key={i} className="flex items-center gap-3">
                                    <span className="w-5 shrink-0 text-center text-xs font-bold text-muted-foreground">
                                        {OPTION_LABELS[i]}
                                    </span>
                                    <div className="flex-1 overflow-hidden rounded-full bg-border/50 h-6">
                                        <div
                                            className={cn(
                                                "flex h-full items-center justify-end rounded-full pr-2 transition-all duration-700",
                                                isCorrect
                                                    ? "bg-emerald-500 text-white"
                                                    : "bg-muted-foreground/25 text-muted-foreground"
                                            )}
                                            style={{ width: `${Math.max(pct, count > 0 ? 8 : 0)}%` }}
                                        >
                                            {pct >= 12 && (
                                                <span className="text-[10px] font-bold">{pct}%</span>
                                            )}
                                        </div>
                                    </div>
                                    <span className="w-10 shrink-0 text-right text-xs tabular-nums text-muted-foreground">
                                        {count}
                                    </span>
                                </div>
                            )
                        })}
                    </div>
                </div>

                {/* Leaderboard */}
                <div className="overflow-hidden rounded-2xl border border-border/60 bg-muted/20">
                    <div className="flex items-center gap-2 px-4 py-3">
                        <Crown className="size-4 text-amber-500" />
                        <p className="text-sm font-medium text-foreground">Placar parcial</p>
                        <span className="ml-auto text-xs text-muted-foreground">top {top5.length}</span>
                    </div>
                    <ul className="divide-y divide-border/40">
                        {top5.map((entry, i) => (
                            <li
                                key={entry.playerId}
                                className="flex items-center gap-3 px-4 py-3"
                            >
                                <span
                                    className={cn(
                                        "grid size-7 shrink-0 place-items-center rounded-full text-xs font-bold",
                                        RANK_STYLES[i] ?? "bg-muted text-muted-foreground"
                                    )}
                                >
                                    {i + 1}
                                </span>
                                <span className="flex-1 truncate text-sm font-medium text-foreground">
                                    {entry.nickname}
                                </span>
                                <div className="text-right">
                                    <p className="font-heading text-sm font-bold text-foreground tabular-nums">
                                        {entry.score.toLocaleString("pt-BR")}
                                    </p>
                                    {entry.lastGain > 0 && (
                                        <p className="text-xs font-medium text-emerald-600">+{entry.lastGain}</p>
                                    )}
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </CardContent>

            <CardFooter className="px-6 pb-6 pt-0">
                {role === "host" ? (
                    <Button size="lg" className="w-full gap-2" onClick={nextQuestion}>
                        Próxima questão
                        <ChevronRight className="size-4" />
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
