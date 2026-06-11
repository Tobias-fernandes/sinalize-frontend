import {
    QuizAlternativeId,
    QuizAnswer,
    QuizFeedback,
    QuizPhase,
    QuizQuestion,
} from "@/@types/quiz"

interface QuizState {
    phase: QuizPhase
    questions: QuizQuestion[]
    currentQuestionIndex: number
    selectedAlternativeId: QuizAlternativeId | null
    feedback: QuizFeedback
    answers: QuizAnswer[]
    startGame: () => void
    selectAlternative: (alternativeId: QuizAlternativeId) => void
    goToNextQuestion: () => void
    resetGame: () => void
}

export type { QuizState }