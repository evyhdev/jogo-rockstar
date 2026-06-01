export type GameStatus = "waiting" | "question" | "result" | "finished";
export type OptionColor = "Vermelho" | "Azul" | "Verde" | "Amarelo";

export interface QuestionOption {
  id: "A" | "B" | "C" | "D" | "E";
  text: string;
  points: number;
  color: OptionColor;
  justification: string;
}

export interface Question {
  id: string;
  round: number;
  difficulty: string;
  theme: string;
  house: string;
  statement: string;
  options: QuestionOption[];
  bestOptionId: "A" | "B" | "C" | "D" | "E";
}

export interface Character {
  id: string;
  name: string;
  className: string;
  description: string;
  visualStyle: string;
  advantageHouseIds: string[];
  advantageBonus: number;
  cardId: string;
}

export interface Card {
  id: string;
  name: string;
  description: string;
  effect: string;
  used: boolean;
}

export interface TeamDefinition {
  id: string;
  name: string;
  characterId: string;
  cardId: string;
}

export interface TeamState extends TeamDefinition {
  score: number;
  confidence: number;
  hasAnswered: boolean;
  selectedOptionId: "A" | "B" | "C" | "D" | "E" | null;
  cardUsed: boolean;
  currentCardRoll: number | null;
  currentCardSuccess: boolean | null;
  stats: {
    green: number;
    blue: number;
    yellow: number;
    red: number;
    unanswered: number;
  };
  socketId?: string;
}

export interface RoundResultTeam {
  teamId: string;
  selectedOptionId: "A" | "B" | "C" | "D" | "E" | null;
  optionColor: OptionColor | null;
  justification: string | null;
  basePoints: number;
  hasAdvantage: boolean;
  advantageBonus: number;
  roundScore: number;
  confidenceLoss: number;
  leakIncreaseBeforeCard: number;
  cardRoll: number | null;
  cardSuccess: boolean | null;
  leakReductionByCard: number;
  finalLeakIncrease: number;
}

export interface GameState {
  status: GameStatus;
  round: number;
  currentQuestionId: string;
  leakLevel: number;
  timer: {
    duration: number;
    remaining: number;
    isRunning: boolean;
  };
  questionLocked: boolean;
  questions: Question[];
  characters: Character[];
  cards: Card[];
  teams: TeamState[];
  roundResults: RoundResultTeam[];
  finalRanking: TeamState[];
  finalMessage: string | null;
}
