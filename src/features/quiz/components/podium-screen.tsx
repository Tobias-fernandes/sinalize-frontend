"use client"

import { Home, Medal, Trophy } from "lucide-react"

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

const MEDAL_STYLES = [
    { bg: "bg-amber-400/20", text: "text-amber-600", border: "border-amber-400/40", label: "1º" },
    { bg: "bg-slate-400/15", text: "text-slate-600", border: "border-slate-400/30", label: "2º" },
    { bg: "bg-orange-400/15", text: "text-orange-600", border: "border-orange-400/30", label: "3º" },
]

export function PodiumScreen() {
    const { podium, reset } = useGameStore()

    if (!podium) return null

    const top3 = podium.slice(0, 3)
    const rest = podium.slice(3)

    return (
        <Card className="overflow-hidden border-border/70 shadow-2xl">
            <CardHeader className="px-4 pt-4 text-center sm:px-6 sm:pt-6">
                <div className="mx-auto mb-2 flex size-14 items-center justify-center rounded-2xl bg-amber-400/15">
                    <Trophy className="size-7 text-amber-500" />
                </div>

                <Badge variant="secondary" className="mx-auto mb-2 w-fit rounded-full px-3 py-1 text-xs">
                    Fim de jogo
                </Badge>

                <CardTitle className="font-heading text-2xl sm:text-3xl">Pódio final</CardTitle>
            </CardHeader>

            <CardContent className="space-y-4 px-4 sm:px-6">
                {/* Top 3 podium */}
                {top3.length > 0 && (
                    <div className="flex items-end justify-center gap-3">
                        {/* 2nd place — left */}
                        {top3[1] ? (
                            <PodiumBlock entry={top3[1]} position={1} height="h-24" />
                        ) : (
                            <div className="w-24" />
                        )}

                        {/* 1st place — center (tallest) */}
                        {top3[0] && (
                            <PodiumBlock entry={top3[0]} position={0} height="h-32" />
                        )}

                        {/* 3rd place — right */}
                        {top3[2] ? (
                            <PodiumBlock entry={top3[2]} position={2} height="h-20" />
                        ) : (
                            <div className="w-24" />
                        )}
                    </div>
                )}

                {/* Full ranking */}
                <div className="rounded-2xl border border-border/60 bg-muted/30 p-4">
                    <p className="mb-3 text-xs font-medium text-muted-foreground">Classificação completa</p>
                    <ul className="space-y-1.5">
                        {podium.map((entry, i) => (
                            <li
                                key={entry.playerId}
                                className="flex items-center gap-3 rounded-lg bg-background/60 px-3 py-2"
                            >
                                <span
                                    className={cn(
                                        "grid size-6 shrink-0 place-items-center rounded-full text-xs font-bold",
                                        i < 3
                                            ? `${MEDAL_STYLES[i].bg} ${MEDAL_STYLES[i].text}`
                                            : "bg-muted text-muted-foreground"
                                    )}
                                >
                                    {i + 1}
                                </span>
                                <span className="flex-1 truncate text-sm font-medium">
                                    {entry.nickname}
                                </span>
                                <span className="shrink-0 font-heading text-sm font-bold">
                                    {entry.score} pts
                                </span>
                            </li>
                        ))}
                    </ul>
                </div>
            </CardContent>

            <CardFooter className="px-4 pb-4 sm:px-6 sm:pb-6">
                <Button variant="outline" size="lg" className="w-full" onClick={reset}>
                    <Home className="size-4" />
                    Voltar ao início
                </Button>
            </CardFooter>
        </Card>
    )
}

function PodiumBlock({
    entry,
    position,
    height,
}: {
    entry: { nickname: string; score: number }
    position: number
    height: string
}) {
    const style = MEDAL_STYLES[position]!

    return (
        <div className="flex w-24 flex-col items-center gap-1.5">
            <p className="w-full truncate text-center text-xs font-medium">{entry.nickname}</p>
            <p className="text-xs font-bold">{entry.score} pts</p>
            <div
                className={cn(
                    "flex w-full flex-col items-center justify-start rounded-t-xl border pt-2",
                    height,
                    style.bg,
                    style.border
                )}
            >
                <Medal className={cn("size-5", style.text)} />
                <span className={cn("mt-1 font-heading text-sm font-bold", style.text)}>
                    {style.label}
                </span>
            </div>
        </div>
    )
}
