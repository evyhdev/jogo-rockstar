import type { RoundResultTeam, TeamState } from "../types/game.types";

const colorStyles: Record<string, string> = {
  Verde: "bg-emerald-500/10 border-emerald-400/30 text-emerald-200",
  Azul: "bg-sky-500/10 border-sky-400/30 text-sky-200",
  Amarelo: "bg-amber-500/10 border-amber-400/30 text-amber-200",
  Vermelho: "bg-rose-500/10 border-rose-400/30 text-rose-200",
};

function getTeamName(teams: TeamState[], teamId: string) {
  return teams.find((team) => team.id === teamId)?.name ?? "Equipe";
}

function RoundResultPanel({
  roundResults,
  teams,
}: {
  roundResults: RoundResultTeam[];
  teams: TeamState[];
}) {
  return (
    <div className="grid gap-4">
      {roundResults.map((result) => (
        <div
          key={result.teamId}
          className="rounded-3xl border border-white/10 bg-slate-900/80 p-5 shadow-inner shadow-slate-950/30"
        >
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.35em] text-slate-400">
                {getTeamName(teams, result.teamId)}
              </p>
              <p className="mt-1 text-lg font-semibold text-white">Resultado da rodada</p>
            </div>
            <span
              className={`inline-flex items-center rounded-full border px-3 py-1 text-xs uppercase tracking-[0.35em] ${
                result.optionColor ? colorStyles[result.optionColor] : "bg-slate-800 text-slate-200"
              }`}
            >
              {result.selectedOptionId ?? "Sem resposta"} {result.optionColor ?? "-"}
            </span>
          </div>

          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <div className="rounded-3xl bg-slate-950/80 p-4">
              <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Pontos base</p>
              <p className="mt-2 text-2xl font-semibold text-white">{result.basePoints}</p>
            </div>
            <div className="rounded-3xl bg-slate-950/80 p-4">
              <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Vantagem</p>
              <p className="mt-2 text-2xl font-semibold text-white">
                {result.hasAdvantage ? "+2" : "0"}
              </p>
            </div>
            <div className="rounded-3xl bg-slate-950/80 p-4">
              <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Total da rodada</p>
              <p className="mt-2 text-2xl font-semibold text-amber-300">{result.roundScore}</p>
            </div>
            <div className="rounded-3xl bg-slate-950/80 p-4">
              <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Confiança perdida</p>
              <p className="mt-2 text-2xl font-semibold text-cyan-300">-{result.confidenceLoss}</p>
            </div>
          </div>

          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <div className="rounded-3xl bg-slate-950/80 p-4">
              <p className="text-xs uppercase tracking-[0.3em] text-slate-400">
                Vazamento antes da carta
              </p>
              <p className="mt-2 text-2xl font-semibold text-red-400">
                +{result.leakIncreaseBeforeCard}
              </p>
            </div>
            <div className="rounded-3xl bg-slate-950/80 p-4">
              <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Carta usada</p>
              <p className="mt-2 text-2xl font-semibold text-white">
                {result.cardRoll ? "Sim" : "Não"}
              </p>
            </div>
            {result.cardRoll ? (
              <div className="rounded-3xl bg-slate-950/80 p-4">
                <p className="text-xs uppercase tracking-[0.3em] text-slate-400">
                  Resultado do dado
                </p>
                <p className="mt-2 text-2xl font-semibold text-white">
                  {result.cardRoll} ({result.cardSuccess ? "Sucesso" : "Falha"})
                </p>
              </div>
            ) : null}
            <div className="rounded-3xl bg-slate-950/80 p-4">
              <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Vazamento final</p>
              <p className="mt-2 text-2xl font-semibold text-red-400">
                +{result.finalLeakIncrease}
              </p>
            </div>
          </div>

          {result.justification ? (
            <div className="mt-4 rounded-3xl bg-slate-900/80 p-4 text-sm text-slate-200">
              <p className="font-semibold text-white">Justificativa</p>
              <p className="mt-2">{result.justification}</p>
            </div>
          ) : null}
        </div>
      ))}
    </div>
  );
}

export default RoundResultPanel;
