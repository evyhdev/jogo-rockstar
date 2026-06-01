import { characters, getCharacter, getQuestion, questions } from "../data/gameData";
import type { AnswerQuality, GameState, OptionId, PowerPayload, Question, Team } from "../types/game.types";

export const ROUND_SECONDS = 60;

export function createGame(gameId: string): GameState {
  return { id: gameId, createdAt: Date.now(), phase: "lobby", roundStage: "waiting", currentRound: 0, questionStartedAt: null, selectionOrder: [], currentSelectionIndex: 0, teams: {} };
}

export function createTeam(id: string, leaderName: string, slotIndex: number): Team {
  return { id, name: `Guilda ${slotIndex + 1}`, leaderName, slotIndex, selectionRoll: null, characterId: null, score: 0, leakLevel: 0, leakExplosions: 0, eliminated: false, answerId: null, answerSubmittedAt: null, powerUsed: false, powerMessage: null, futureLeakReduction: 0, annulledOptionIds: [], results: {} };
}

export function getTeams(state: GameState) {
  return Object.values(state.teams ?? {}).sort((a, b) => a.slotIndex - b.slotIndex);
}

export function getSelectionTeams(state: GameState) {
  return state.selectionOrder.map((teamId) => state.teams[teamId]).filter(Boolean);
}

export function startCharacterSelection(state: GameState) {
  const teams = getTeams(state);
  if (teams.length !== 5 || teams.some((team) => team.selectionRoll === null)) throw new Error("É necessário ter 5 líderes e todos devem jogar o dado.");
  state.phase = "character-selection";
  state.selectionOrder = [...teams].sort((a, b) => (b.selectionRoll ?? 0) - (a.selectionRoll ?? 0) || a.leaderName.localeCompare(b.leaderName, "pt-BR")).map((team) => team.id);
  state.currentSelectionIndex = 0;
}

export function selectCharacter(state: GameState, teamId: string, characterId: string) {
  if (state.phase !== "character-selection" || state.selectionOrder[state.currentSelectionIndex] !== teamId) throw new Error("Aguarde sua vez de escolher o personagem.");
  if (!characters.some((character) => character.id === characterId)) throw new Error("Personagem inválido.");
  if (getTeams(state).some((team) => team.characterId === characterId)) throw new Error("Esse personagem já foi escolhido.");
  state.teams[teamId].characterId = characterId;
  state.currentSelectionIndex += 1;
  if (state.currentSelectionIndex === 5) {
    state.phase = "playing";
    state.roundStage = "waiting";
  }
}

export function startRound(state: GameState) {
  if (state.phase !== "playing" || state.roundStage === "question") throw new Error("Não é possível iniciar uma rodada agora.");
  for (const team of getTeams(state)) {
    team.answerId = null;
    team.answerSubmittedAt = null;
    team.powerMessage = null;
    team.annulledOptionIds = [];
  }
  state.roundStage = "question";
  state.questionStartedAt = Date.now();
}

export function submitAnswer(state: GameState, teamId: string, answerId: OptionId) {
  const team = state.teams[teamId];
  if (!team || state.phase !== "playing" || state.roundStage !== "question") throw new Error("Não há pergunta ativa.");
  if (team.eliminated) throw new Error("Sua guilda foi eliminada por atingir 100% de vazamento.");
  if (!state.questionStartedAt || Date.now() - state.questionStartedAt >= ROUND_SECONDS * 1000) throw new Error("O tempo da rodada acabou.");
  if (team.answerId) throw new Error("Sua resposta já foi registrada.");
  if (team.annulledOptionIds.includes(answerId)) throw new Error("Essa alternativa foi anulada pelo Tiro Preciso.");
  team.answerId = answerId;
  team.answerSubmittedAt = Date.now();
  const activeTeams = getTeams(state).filter((entry) => !entry.eliminated);
  if (activeTeams.length > 0 && activeTeams.every((entry) => entry.answerId)) showResult(state);
}

function getOutcome(question: Question, team: Team) {
  const option = question.options.find((item) => item.id === team.answerId);
  const quality = option?.quality ?? null;
  const unanswered = !option;
  const character = getCharacter(team.characterId);
  const specialtyBonus = Boolean(character?.advantageQuestionIds.includes(question.id));
  if (question.finalChallenge) {
    const final = { 100: [3, 0], 70: [1, 15], 50: [0, 30], 0: [0, 50] } as const;
    const [score, leak] = unanswered ? [0, 60] : final[quality as AnswerQuality];
    return { quality, unanswered, specialtyBonus, score, leak: specialtyBonus ? Math.max(0, leak - 10) : leak };
  }
  const common = { 100: [2, 0], 70: [1, 10], 50: [0, 20], 0: [0, 35] } as const;
  const bonus = { 100: [3, 0], 70: [2, 5], 50: [1, 15], 0: [0, 30] } as const;
  const [score, leak] = unanswered ? [0, 40] : (specialtyBonus ? bonus : common)[quality as AnswerQuality];
  return { quality, unanswered, specialtyBonus, score, leak };
}

function addLeak(team: Team, amount: number) {
  if (amount <= 0 || team.eliminated) return 0;
  const reducedAmount = Math.max(0, amount - team.futureLeakReduction);
  team.futureLeakReduction = 0;
  if (reducedAmount <= 0) return 0;
  const total = team.leakLevel + reducedAmount;
  team.leakLevel = Math.min(100, total);
  if (total >= 100) {
    team.eliminated = true;
    team.leakExplosions = 1;
  }
  return reducedAmount;
}

function removeLeak(team: Team, amount: number) {
  if (team.eliminated) return;
  const total = Math.max(0, getFinalLeak(team) - amount);
  team.leakLevel = total;
}

export function showResult(state: GameState) {
  const question = getQuestion(state.currentRound);
  if (!question || state.roundStage !== "question") throw new Error("Não há rodada ativa.");
  for (const team of getTeams(state)) {
    if (team.eliminated) continue;
    const outcome = getOutcome(question, team);
    const leakGained = addLeak(team, outcome.leak);
    const responseTimeMs = team.answerSubmittedAt && state.questionStartedAt ? team.answerSubmittedAt - state.questionStartedAt : null;
    team.score += outcome.score;
    team.results[question.id] = { answerId: team.answerId, quality: outcome.quality, scoreGained: outcome.score, leakBeforePower: outcome.leak, leakGained, specialtyBonus: outcome.specialtyBonus, unanswered: outcome.unanswered, responseTimeMs };
  }
  state.roundStage = "result";
  state.questionStartedAt = null;
}

export function nextRound(state: GameState) {
  if (state.roundStage !== "result") throw new Error("Mostre o resultado antes de avançar.");
  if (state.currentRound === questions.length - 1) {
    state.phase = "finished";
    return;
  }
  state.currentRound += 1;
  state.roundStage = "waiting";
}

export function canUsePower(state: GameState, team: Team) {
  const character = getCharacter(team.characterId);
  const question = getQuestion(state.currentRound);
  if (!character || !question || team.powerUsed || state.phase !== "playing") return false;
  if (team.eliminated) return false;
  if (character.powerTiming === "before-answer") {
    const compatible = character.id === "bruxo" || character.advantageQuestionIds.includes(question.id);
    return compatible && state.roundStage === "question" && !team.answerId;
  }
  const result = team.results[question.id];
  if (!result || state.roundStage !== "result") return false;
  if (character.id === "mago") return result.quality !== 100 && character.advantageQuestionIds.includes(question.id);
  if (character.id === "anao") return result.quality === 100 && ["portao-de-acesso", "cerco-ao-gta-vi"].includes(question.id);
  return character.id === "guerreiro" && result.leakGained > 0;
}

export function usePower(state: GameState, teamId: string, payload?: PowerPayload) {
  const team = state.teams[teamId];
  const question = getQuestion(state.currentRound);
  const character = getCharacter(team?.characterId ?? null);
  if (!team || !question || !character || !canUsePower(state, team)) throw new Error("O poder não pode ser usado neste momento.");

  let message = "";
  if (character.powerEffect === "hint") {
    message = `Dica: ${question.hint}`;
  } else if (character.powerEffect === "inspect-option") {
    if (!payload?.optionId) throw new Error("Escolha uma alternativa para investigar.");
    const option = question.options.find((item) => item.id === payload.optionId);
    message = option?.quality === 0 ? `A alternativa ${payload.optionId} é 0%.` : `A alternativa ${payload.optionId} não é 0%.`;
  } else if (character.powerEffect === "annul-zero-options") {
    if (!payload?.optionIds || payload.optionIds.length !== 2) throw new Error("Escolha duas alternativas.");
    const optionIds = [...new Set(payload.optionIds)];
    const options = question.options.filter((option) => optionIds.includes(option.id));
    if (optionIds.length !== 2 || options.length !== 2) throw new Error("Escolha duas alternativas diferentes.");
    team.annulledOptionIds = options.filter((option) => option.quality === 0).map((option) => option.id);
    message = team.annulledOptionIds.length
      ? `Alternativa(s) 0% anulada(s): ${team.annulledOptionIds.join(", ")}.`
      : "Nenhuma das alternativas escolhidas é 0%.";
  } else {
    const result = team.results[question.id];
    if (!result) throw new Error("Resultado da rodada não encontrado.");
    if (character.powerEffect === "bonus-question") {
      if (!question.bonusQuestion || !payload?.bonusAnswerId) throw new Error("Responda à pergunta extra.");
      if (payload.bonusAnswerId === question.bonusQuestion.correctOptionId) {
        removeLeak(team, result.leakGained);
        result.leakGained = 0;
        message = `Pergunta extra correta. ${result.leakBeforePower}% de vazamento removidos.`;
      } else {
        message = `Pergunta extra incorreta. ${question.bonusQuestion.explanation}`;
      }
    } else if (character.powerEffect === "fortify") {
      team.futureLeakReduction += 15;
      message = "Fortificação de Pedra: próximo vazamento reduzido em 15%.";
    } else {
      const reducedLeak = Math.floor(result.leakGained / 2);
      removeLeak(team, result.leakGained - reducedLeak);
      result.leakGained = reducedLeak;
      message = `Última Linha de Defesa: vazamento da rodada reduzido para ${reducedLeak}%.`;
    }
  }
  team.powerUsed = true;
  team.powerMessage = message;
  const result = team.results[question.id];
  if (result) result.powerMessage = message;
}

export function getFinalLeak(team: Team) {
  return team.leakLevel;
}

function countIdeal(team: Team) {
  return Object.values(team.results).filter((result) => result.quality === 100).length;
}

function countUnanswered(team: Team) {
  return Object.values(team.results).filter((result) => result.unanswered).length;
}

function averageResponseTime(team: Team) {
  const times = Object.values(team.results).flatMap((result) => result.responseTimeMs === null ? [] : [result.responseTimeMs]);
  return times.length ? times.reduce((sum, time) => sum + time, 0) / times.length : Number.POSITIVE_INFINITY;
}

export function getRanking(state: GameState) {
  return getTeams(state).sort((a, b) => getFinalLeak(a) - getFinalLeak(b) || b.score - a.score || countIdeal(b) - countIdeal(a) || countUnanswered(a) - countUnanswered(b) || averageResponseTime(a) - averageResponseTime(b));
}
