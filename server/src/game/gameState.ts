import cardsData from "../data/cards.json";
import charactersData from "../data/characters.json";
import questionsData from "../data/questions.json";
import teamsData from "../data/teams.json";
import {
  Card,
  Character,
  GameState,
  Question,
  TeamDefinition,
  TeamState,
} from "../types/game.types";

export function createInitialState(): GameState {
  const questions: Question[] = questionsData as Question[];
  const characters: Character[] = charactersData as Character[];
  const cards: Card[] = (cardsData as Card[]).map((card) => ({
    ...card,
    used: false,
  }));

  const teams: TeamState[] = (teamsData as TeamDefinition[]).map((team) => ({
    ...team,
    score: 0,
    confidence: 100,
    hasAnswered: false,
    selectedOptionId: null,
    cardUsed: false,
    currentCardRoll: null,
    currentCardSuccess: null,
    stats: {
      green: 0,
      blue: 0,
      yellow: 0,
      red: 0,
      unanswered: 0,
    },
    socketId: undefined,
  }));

  return {
    status: "waiting",
    round: 1,
    currentQuestionId: questions[0]?.id ?? "q1",
    leakLevel: 0,
    timer: {
      duration: 60,
      remaining: 60,
      isRunning: false,
    },
    questionLocked: false,
    questions,
    characters,
    cards,
    teams,
    roundResults: [],
    finalRanking: [],
    finalMessage: null,
  };
}

export function getQuestionByRound(state: GameState, round: number): Question | undefined {
  return state.questions.find((question) => question.round === round);
}

export function getCharacterById(state: GameState, characterId: string): Character | undefined {
  return state.characters.find((character) => character.id === characterId);
}

export function getTeamState(state: GameState, teamId: string): TeamState | undefined {
  return state.teams.find((team) => team.id === teamId);
}

export function getCardById(state: GameState, cardId: string): Card | undefined {
  return state.cards.find((card) => card.id === cardId);
}
