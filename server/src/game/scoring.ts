import {
  Character,
  Question,
  QuestionOption,
  RoundResultTeam,
  TeamState,
} from "../types/game.types";

const confidenceLossMap: Record<string, number> = {
  Verde: 0,
  Azul: 5,
  Amarelo: 10,
  Vermelho: 20,
};

const leakIncreaseMap: Record<string, number> = {
  Verde: 0,
  Azul: 3,
  Amarelo: 6,
  Vermelho: 10,
};

export function getOptionById(
  questionOptions: QuestionOption[],
  optionId: string
): QuestionOption | undefined {
  return questionOptions.find((option) => option.id === optionId);
}

export function calculateRoundResult(
  question: Question | undefined,
  team: TeamState,
  character: Character | undefined
): RoundResultTeam {
  const selectedOptionId = team.selectedOptionId;
  const option =
    selectedOptionId && question ? getOptionById(question.options, selectedOptionId) : undefined;
  const optionColor = option?.color ?? null;
  const justification = option?.justification ?? null;

  const basePoints = option?.points ?? 0;
  const hasAdvantage = Boolean(
    option && option.points > 0 && character?.advantageHouseIds.includes(question?.id ?? "")
  );
  const advantageBonus = hasAdvantage ? 2 : 0;
  const roundScore = basePoints + advantageBonus;

  const confidenceLoss = selectedOptionId
    ? (confidenceLossMap[option?.color ?? "Vermelho"] ?? 15)
    : 15;

  const leakIncreaseBeforeCard = selectedOptionId
    ? (leakIncreaseMap[option?.color ?? "Vermelho"] ?? 8)
    : 8;

  const cardRoll = team.currentCardRoll;
  const cardSuccess = team.currentCardSuccess ?? null;
  const leakReductionByCard = cardSuccess ? 10 : 0;
  const finalLeakIncrease = Math.max(leakIncreaseBeforeCard - leakReductionByCard, 0);

  return {
    teamId: team.id,
    selectedOptionId: selectedOptionId,
    optionColor,
    justification,
    basePoints,
    hasAdvantage,
    advantageBonus,
    roundScore,
    confidenceLoss,
    leakIncreaseBeforeCard,
    cardRoll,
    cardSuccess,
    leakReductionByCard,
    finalLeakIncrease,
  };
}
