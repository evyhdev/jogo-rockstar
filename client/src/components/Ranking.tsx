import type { TeamState } from "../types/game.types";

function Ranking({ ranking }: { ranking: TeamState[] }) {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-white">Ranking Final</h2>
      <div className="space-y-3">
        {ranking.map((team, index) => (
          <div
            key={team.id}
            className="flex items-center justify-between rounded-3xl border border-white/10 bg-slate-900/80 px-4 py-4"
          >
            <div>
              <p className="text-sm text-slate-400">{index + 1}ª posição</p>
              <p className="mt-1 text-lg font-semibold text-white">{team.name}</p>
            </div>
            <div className="text-right">
              <p className="text-lg font-semibold text-amber-300">{team.score} pts</p>
              <p className="text-sm text-slate-400">Confiança: {team.confidence}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Ranking;
