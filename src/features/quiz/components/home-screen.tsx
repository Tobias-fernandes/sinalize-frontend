"use client"

import { Monitor, Users } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { useGameStore } from "@/context/game"

export function HomeScreen() {
    const { chooseHost, choosePlayer, createRoom, error } = useGameStore()

    function handleHostClick() {
        chooseHost()
        createRoom()
    }

    return (
        <div className="space-y-6">
            <div className="space-y-1">
                <h1 className="font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                    Bem-vindo ao Sinalize
                </h1>
                <p className="text-base text-muted-foreground">
                    Quiz de Libras em tempo real. Crie uma sala ou entre em uma existente.
                </p>
            </div>

            {error && (
                <div className="flex items-center gap-3 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
                    <span className="size-1.5 shrink-0 rounded-full bg-rose-500" />
                    {error}
                </div>
            )}

            <div className="grid gap-4 sm:grid-cols-2">
                <ActionCard
                    onClick={handleHostClick}
                    icon={<Monitor className="size-6 text-primary" />}
                    iconBg="bg-primary/10"
                    title="Criar sala"
                    description="Seja o host e controle o jogo. Compartilhe o código com os jogadores."
                    accentClass="border-primary/25 hover:border-primary/50 hover:bg-primary/4"
                    badge="Host"
                    badgeClass="bg-primary/10 text-primary"
                />

                <ActionCard
                    onClick={choosePlayer}
                    icon={<Users className="size-6 text-amber-600" />}
                    iconBg="bg-amber-400/15"
                    title="Entrar na sala"
                    description="Entre com um código de 6 dígitos e escolha seu apelido."
                    accentClass="border-amber-400/30 hover:border-amber-400/60 hover:bg-amber-400/4"
                    badge="Jogador"
                    badgeClass="bg-amber-400/15 text-amber-700"
                />
            </div>

            <Card className="border-border/50 bg-muted/30">
                <CardContent className="px-5 py-4">
                    <div className="flex flex-wrap items-center gap-x-6 gap-y-1.5">
                        {[
                            { value: "15", label: "perguntas" },
                            { value: "20s", label: "por questão" },
                            { value: "1000", label: "pts máx/acerto" },
                            { value: "∞", label: "jogadores" },
                        ].map((stat) => (
                            <div key={stat.label} className="flex items-baseline gap-1.5">
                                <span className="font-heading text-base font-bold text-foreground">{stat.value}</span>
                                <span className="text-xs text-muted-foreground">{stat.label}</span>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

function ActionCard({
    onClick,
    icon,
    iconBg,
    title,
    description,
    accentClass,
    badge,
    badgeClass,
}: {
    onClick: () => void
    icon: React.ReactNode
    iconBg: string
    title: string
    description: string
    accentClass: string
    badge: string
    badgeClass: string
}) {
    return (
        <button
            onClick={onClick}
            className={`group flex flex-col gap-4 rounded-2xl border-2 bg-card p-6 text-left transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60 active:scale-[0.99] ${accentClass}`}
        >
            <div className="flex items-start justify-between">
                <div className={`flex size-11 items-center justify-center rounded-xl ${iconBg}`}>
                    {icon}
                </div>
                <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${badgeClass}`}>
                    {badge}
                </span>
            </div>
            <div className="space-y-1">
                <p className="font-heading text-lg font-semibold text-foreground">{title}</p>
                <p className="text-sm leading-relaxed text-muted-foreground">{description}</p>
            </div>
        </button>
    )
}
