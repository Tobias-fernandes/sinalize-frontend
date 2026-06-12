import { QuizQuestion } from "@/@types/quiz";

const librasQuestions: QuizQuestion[] = [
  {
    id: 16,
    title: "O sinal descrito abaixo corresponde a qual palavra em Libras?",
    description:
      'Mão na testa que abre e fecha como se estivesse "pegando" a ideia.',
    alternatives: [
      { id: "A", text: "Pensar" },
      { id: "B", text: "Esquecer" },
      { id: "C", text: "Aprender" },
      { id: "D", text: "Entender" },
    ],
    correctAlternativeId: "C",
  },
  {
    id: 17,
    title: "O sinal descrito abaixo corresponde a qual palavra em Libras?",
    description:
      "Dedo indicador apontando para a frente e se afastando do corpo.",
    alternatives: [
      { id: "A", text: "Lá" },
      { id: "B", text: "Ir" },
      { id: "C", text: "Vir" },
      { id: "D", text: "Onde" },
    ],
    correctAlternativeId: "B",
  },
  {
    id: 18,
    title: "O sinal descrito abaixo corresponde a qual palavra em Libras?",
    description:
      "Mão aberta na lateral da cabeça com movimento de balançar para frente.",
    alternatives: [
      { id: "A", text: "Entender" },
      { id: "B", text: "Avisar" },
      { id: "C", text: "Ouvir" },
      { id: "D", text: "Saber" },
    ],
    correctAlternativeId: "B",
  },
  {
    id: 19,
    title: "O sinal descrito abaixo corresponde a qual palavra em Libras?",
    description:
      'Dedos em "V" saindo dos olhos em direção ao que se quer observar.',
    alternatives: [
      { id: "A", text: "Ler" },
      { id: "B", text: "Ficar" },
      { id: "C", text: "Olhar" },
      { id: "D", text: "Vigiar" },
    ],
    correctAlternativeId: "C",
  },
  {
    id: 20,
    title: "O sinal descrito abaixo corresponde a qual palavra em Libras?",
    description:
      "Dedos indicador e médio unidos balançando lateralmente (movimento de negação manual).",
    alternatives: [
      { id: "A", text: "Nunca" },
      { id: "B", text: "Não" },
      { id: "C", text: "Nada" },
      { id: "D", text: "Nenhum" },
    ],
    correctAlternativeId: "B",
  },
  {
    id: 21,
    title: "O sinal descrito abaixo corresponde a qual palavra em Libras?",
    description:
      'Mão fechada em "S" balançando o pulso para frente e para trás.',
    alternatives: [
      { id: "A", text: "Pode" },
      { id: "B", text: "Certo" },
      { id: "C", text: "Sim" },
      { id: "D", text: "Ok" },
    ],
    correctAlternativeId: "C",
  },
  {
    id: 22,
    title: "O sinal descrito abaixo corresponde a qual palavra em Libras?",
    description:
      'Mãos em "L" com palmas para baixo fazendo um movimento descendente.',
    alternatives: [
      { id: "A", text: "Aqui" },
      { id: "B", text: "Hoje / Agora" },
      { id: "C", text: "Depois" },
      { id: "D", text: "Ontem" },
    ],
    correctAlternativeId: "B",
  },
  {
    id: 23,
    title: "O sinal descrito abaixo corresponde a qual palavra em Libras?",
    description:
      "Mão fechada batendo para baixo de forma firme (sentido de autorização).",
    alternatives: [
      { id: "A", text: "Poder" },
      { id: "B", text: "Bater" },
      { id: "C", text: "Parar" },
      { id: "D", text: "Conseguir" },
    ],
    correctAlternativeId: "A",
  },
  {
    id: 24,
    title: "O sinal descrito abaixo corresponde a qual palavra em Libras?",
    description: 'Mão em formato de "L" com o polegar batendo no peito.',
    alternatives: [
      { id: "A", text: "Eu" },
      { id: "B", text: "Meu" },
      { id: "C", text: "Ter" },
      { id: "D", text: "Livre" },
    ],
    correctAlternativeId: "D",
  },
  {
    id: 25,
    title: "O sinal descrito abaixo corresponde a qual palavra em Libras?",
    description: "Mãos unidas que se abrem como se estivessem folheando algo.",
    alternatives: [
      { id: "A", text: "Janela" },
      { id: "B", text: "Porta" },
      { id: "C", text: "Livro" },
      { id: "D", text: "Bíblia" },
    ],
    correctAlternativeId: "C",
  },
  {
    id: 26,
    title: "O sinal descrito abaixo corresponde a qual palavra em Libras?",
    description:
      'Dedos em "V" percorrendo a palma da outra mão aberta (como se fossem os olhos na página).',
    alternatives: [
      { id: "A", text: "Escrever" },
      { id: "B", text: "Ler" },
      { id: "C", text: "Desenhar" },
      { id: "D", text: "Limpar" },
    ],
    correctAlternativeId: "B",
  },
  {
    id: 27,
    title: "O sinal descrito abaixo corresponde a qual palavra em Libras?",
    description: "Dedo indicador riscando a palma da outra mão.",
    alternatives: [
      { id: "A", text: "Escrever" },
      { id: "B", text: "Apagar" },
      { id: "C", text: "Pintar" },
      { id: "D", text: "Estudar" },
    ],
    correctAlternativeId: "A",
  },
  {
    id: 28,
    title: "O sinal descrito abaixo corresponde a qual palavra em Libras?",
    description:
      "Passar as costas dos dedos sob o queixo (referência à barba).",
    alternatives: [
      { id: "A", text: "Mulher" },
      { id: "B", text: "Homem" },
      { id: "C", text: "Pai" },
      { id: "D", text: "Avô" },
    ],
    correctAlternativeId: "B",
  },
  {
    id: 29,
    title: "O sinal descrito abaixo corresponde a qual palavra em Libras?",
    description:
      "Passar o dedo indicador na lateral do rosto (referência a maquiagem ou fita do chapéu).",
    alternatives: [
      { id: "A", text: "Mulher" },
      { id: "B", text: "Menina" },
      { id: "C", text: "Mãe" },
      { id: "D", text: "Avó" },
    ],
    correctAlternativeId: "A",
  },
  {
    id: 30,
    title: "O sinal descrito abaixo corresponde a qual palavra em Libras?",
    description: 'Dedo indicador em "L" balançando no queixo.',
    alternatives: [
      { id: "A", text: "Beber" },
      { id: "B", text: "Água" },
      { id: "C", text: "Sede" },
      { id: "D", text: "Suco" },
    ],
    correctAlternativeId: "B",
  },
];

export { librasQuestions };
