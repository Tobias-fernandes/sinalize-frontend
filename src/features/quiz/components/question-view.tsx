"use client"

import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

export function useTimer(startedAt: number, timeLimitSec: number) {
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

export function CircularTimer({ seconds, progress }: { seconds: number; progress: number }) {
    const radius = 18
    const circumference = 2 * Math.PI * radius
    const strokeDashoffset = circumference * (1 - progress / 100)

    const isUrgent = seconds <= 5
    const isWarning = seconds <= 10 && seconds > 5

    return (
        <div className="relative flex size-14 shrink-0 items-center justify-center">
            <svg className="absolute inset-0 -rotate-90" viewBox="0 0 48 48">
                <circle
                    cx="24" cy="24" r={radius}
                    fill="none" strokeWidth="3"
                    className="stroke-border"
                />
                <circle
                    cx="24" cy="24" r={radius}
                    fill="none" strokeWidth="3"
                    strokeLinecap="round"
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeDashoffset}
                    className={cn(
                        "transition-[stroke-dashoffset] duration-100",
                        isUrgent ? "stroke-rose-500" : isWarning ? "stroke-amber-500" : "stroke-primary"
                    )}
                />
            </svg>
            <span
                className={cn(
                    "font-heading text-base font-bold tabular-nums",
                    isUrgent ? "text-rose-600" : isWarning ? "text-amber-600" : "text-foreground"
                )}
            >
                {seconds}
            </span>
        </div>
    )
}

export const OPTION_LABELS = ["A", "B", "C", "D"]

export const OPTION_STYLES = [
    {
        base: "border-sky-200 bg-sky-50 hover:border-sky-400 hover:bg-sky-100",
        selected: "border-sky-500 bg-sky-100 ring-sky-200",
        label: "bg-sky-500 text-white",
        host: "border-sky-200 bg-sky-50 text-sky-900",
    },
    {
        base: "border-amber-200 bg-amber-50 hover:border-amber-400 hover:bg-amber-100",
        selected: "border-amber-500 bg-amber-100 ring-amber-200",
        label: "bg-amber-500 text-white",
        host: "border-amber-200 bg-amber-50 text-amber-900",
    },
    {
        base: "border-rose-200 bg-rose-50 hover:border-rose-400 hover:bg-rose-100",
        selected: "border-rose-500 bg-rose-100 ring-rose-200",
        label: "bg-rose-500 text-white",
        host: "border-rose-200 bg-rose-50 text-rose-900",
    },
    {
        base: "border-emerald-200 bg-emerald-50 hover:border-emerald-400 hover:bg-emerald-100",
        selected: "border-emerald-500 bg-emerald-100 ring-emerald-200",
        label: "bg-emerald-500 text-white",
        host: "border-emerald-200 bg-emerald-50 text-emerald-900",
    },
]
