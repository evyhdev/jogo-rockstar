import type { GameState, TeamState } from "../types/game.types";

function TeamStatus({
  team,
  roundResults,
}: {
  team: TeamState;
  roundResults?: GameState["roundResults"];
}) {
  const teamResult = roundResults?.find((item) => item.teamId === team.id);
  const answerText = team.hasAnswered ? (team.selectedOptionId ?? "-") : "Sem resposta";

  return (
    <div className="rounded-3xl border border-white/10 bg-slate-900/80 p-5 shadow-inner shadow-slate-950/30">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-slate-400">{team.name}</p>
          <p className="mt-1 text-sm text-slate-300">{team.characterId}</p>
        </div>
        <span className="inline-flex items-center rounded-full bg-slate-800 px-3 py-1 text-xs uppercase tracking-[0.3em] text-white">
          {team.score} pts
        </span>
      </div>
      <div className="mt-4 grid gap-3 text-sm text-slate-300">
        <div className="flex items-center justify-between rounded-3xl bg-slate-950/80 px-3 py-2">
          <span>Confiança</span>
          <span>{team.confidence}</span>
        </div>
        <div className="flex items-center justify-between rounded-3xl bg-slate-950/80 px-3 py-2">
          <span>Status</span>
          <span>{team.hasAnswered ? "Respondido" : "Sem resposta"}</span>
        </div>
        <div className="rounded-3xl bg-slate-950/80 px-3 py-2">
          <span className="text-xs uppercase tracking-[0.3em] text-slate-400">Alternativa</span>
          <p className="mt-1 text-base font-semibold text-white">{answerText}</p>
        </div>
        <div className="flex items-center justify-between rounded-3xl bg-slate-950/80 px-3 py-2 text-sm text-slate-300">
          <span>Carta</span>
          <span>{team.cardUsed ? "Usada" : "Disponível"}</span>
        </div>
      </div>
      {teamResult ? (
        <div className="mt-4 rounded-3xl bg-slate-800/80 p-3 text-sm text-slate-200">
          <p>
            Pontos: {teamResult.roundScore} • Vazamento: +
            {teamResult.leakIncreaseBeforeCard + teamResult.finalLeakIncrease}
          </p>
        </div>
      ) : null}
    </div>
  );
}

export default TeamStatus;
