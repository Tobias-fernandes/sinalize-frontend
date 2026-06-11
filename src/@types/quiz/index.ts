import { EQuizAlternativeId, EQuizFeedback, EQuizPhase } from "@/@enums/quiz"

type QuizAlternativeId = EQuizAlternativeId

interface QuizAlternative {
    id: QuizAlternativeId
    text: string
}

interface QuizQuestionImage {
    src: string
    alt: string
}

type QuizAlternatives = [
    QuizAlternative,
    QuizAlternative,
    QuizAlternative,
    QuizAlternative,
]

interface IAlternatives {
    id: string;
    text: string;
}

interface QuizQuestion {
    id: number;
    title: string;
    description: string;
    alternatives: IAlternatives[];
    correctAlternativeId: string;
    image?: QuizQuestionImage;
}

interface QuizAnswer {
    questionId: number
    selectedAlternativeId: QuizAlternativeId
    isCorrect: boolean
}

type QuizPhase = EQuizPhase
type QuizFeedback = EQuizFeedback | null

export type {
    QuizAlternativeId,
    QuizAlternative,
    QuizQuestionImage,
    QuizAlternatives,
    QuizQuestion,
    QuizAnswer,
    QuizPhase,
    QuizFeedback,
}