export type GamePhase = "lobby" | "character-selection" | "playing" | "finished";
export type RoundStage = "waiting" | "question" | "result";
export type OptionId = "A" | "B" | "C" | "D" | "E";
export type AnswerQuality = 100 | 70 | 50 | 0;
export type PowerTiming = "before-answer" | "after-result";
export type PowerEffect = "bonus-question" | "hint" | "inspect-option" | "fortify" | "halve-leak" | "annul-zero-options";

export interface QuestionOption {
  id: OptionId;
  text: string;
  quality: AnswerQuality;
  justification: string;
}

export interface BonusQuestion {
  statement: string;
  options: Array<{ id: "A" | "B"; text: string }>;
  correctOptionId: "A" | "B";
  explanation: string;
}

export interface Question {
  id: string;
  boardPosition: number;
  difficulty: string;
  house: string;
  theme: string;
  statement: string;
  options: QuestionOption[];
  correctOptionId: OptionId;
  explanation: string;
  hint: string;
  bonusQuestion?: BonusQuestion;
  finalChallenge?: boolean;
}

export interface Character {
  id: string;
  name: string;
  emoji: string;
  specialty: string;
  advantageQuestionIds: string[];
  powerName: string;
  powerDescription: string;
  powerTiming: PowerTiming;
  powerEffect: PowerEffect;
}

export interface RoundResult {
  answerId: OptionId | null;
  quality: AnswerQuality | null;
  scoreGained: number;
  leakBeforePower: number;
  leakGained: number;
  specialtyBonus: boolean;
  unanswered: boolean;
  responseTimeMs: number | null;
  powerMessage?: string;
}

export interface Team {
  id: string;
  name: string;
  leaderName: string;
  slotIndex: number;
  selectionRoll: number | null;
  characterId: string | null;
  score: number;
  leakLevel: number;
  leakExplosions: number;
  eliminated: boolean;
  answerId: OptionId | null;
  answerSubmittedAt: number | null;
  powerUsed: boolean;
  powerMessage: string | null;
  futureLeakReduction: number;
  annulledOptionIds: OptionId[];
  results: Record<string, RoundResult>;
}

export interface GameState {
  id: string;
  createdAt: number;
  phase: GamePhase;
  roundStage: RoundStage;
  currentRound: number;
  questionStartedAt: number | null;
  selectionOrder: string[];
  currentSelectionIndex: number;
  teams: Record<string, Team>;
}

export type PowerPayload = { optionId?: OptionId; optionIds?: OptionId[]; bonusAnswerId?: "A" | "B" } | undefined;
