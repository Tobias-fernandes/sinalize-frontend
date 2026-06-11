"use client"

import { CircleHelp, Hand, Shuffle, Trophy } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

import { IHowToPlayModalProps } from "./types"

const HowToPlayModal = ({ open, onOpenChange }: IHowToPlayModalProps) => {



    if (!open) {
        return null
    }

    return (
        <div className="fixed inset-0 z-50 animate-in fade-in duration-200">
            <button
                type="button"
                aria-label="Fechar modal"
                className="absolute inset-0 bg-black/45 backdrop-blur-sm"
                onClick={() => onOpenChange(false)}
            />

            <div className="relative z-10 flex min-h-full items-center justify-center p-3 sm:p-4">
                <Card className="w-full max-w-xl animate-in zoom-in-95 border-border/70 shadow-2xl duration-200">
                    <CardHeader className="space-y-1 px-4 pt-4 sm:space-y-2 sm:px-6 sm:pt-6">
                        <CardTitle className="flex items-center gap-2 text-xl font-bold font-heading sm:text-2xl">
                            <CircleHelp className="size-5 text-primary" />
                            Como jogar
                        </CardTitle>
                        <CardDescription className="text-xs leading-relaxed sm:text-sm">
                            Responda cada questão escolhendo uma alternativa. Em cada pergunta,
                            existe somente uma opção correta.
                        </CardDescription>
                    </CardHeader>

                    <CardContent className="space-y-2 px-4 pb-4 sm:space-y-3 sm:px-6 sm:pb-6">
                        <div className="flex gap-3 rounded-xl border border-border/60 bg-muted/40 p-2.5 sm:p-3">
                            <Hand className="mt-0.5 size-4 text-primary" />
                            <p className="text-xs leading-relaxed sm:text-sm">
                                Leia a descrição do sinal com calma. Quando houver imagem,
                                utilize-a como apoio para identificar melhor o sinal.
                            </p>
                        </div>

                        <div className="flex gap-3 rounded-xl border border-border/60 bg-muted/40 p-2.5 sm:p-3">
                            <Shuffle className="mt-0.5 size-4 text-primary" />
                            <p className="text-xs leading-relaxed sm:text-sm">
                                Toda nova partida embaralha as questões automaticamente para
                                deixar o jogo mais dinâmico.
                            </p>
                        </div>

                        <div className="flex gap-3 rounded-xl border border-border/60 bg-muted/40 p-2.5 sm:p-3">
                            <Trophy className="mt-0.5 size-4 text-primary" />
                            <p className="text-xs leading-relaxed sm:text-sm">
                                Ao final, você verá sua pontuação e poderá jogar novamente.
                            </p>
                        </div>

                        <div className="flex justify-end pt-2">
                            <Button variant="outline" onClick={() => onOpenChange(false)}>
                                Fechar
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

export default HowToPlayModal;