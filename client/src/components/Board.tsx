import type { Question } from "../types/game.types";

function Board({
  questions,
  currentQuestionId,
}: {
  questions: Question[];
  currentQuestionId: string;
}) {
  const angleStep = 360 / 8;

  return (
    <div className="space-y-4">
      <h2 className="mb-6 text-xl font-semibold text-white">Tabuleiro de Casas</h2>

      <div className="relative mx-auto w-full max-w-3xl aspect-square">
        {/* Central castle placeholder */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex items-center justify-center w-32 h-32 rounded-full border-2 border-amber-400/30 bg-slate-900/50 text-center">
            <div className="space-y-1">
              <div className="text-3xl">🏰</div>
              <p className="text-xs text-amber-300 uppercase font-semibold tracking-widest">
                Reino
              </p>
            </div>
          </div>
        </div>

        {/* Houses in circle */}
        {questions.map((question, index) => {
          const isActive = question.id === currentQuestionId;
          const angle = angleStep * index;
          const radian = (angle * Math.PI) / 180;

          // Radius for positioning (in percentage of container)
          const radius = 45;
          const x = Math.cos(radian) * radius;
          const y = Math.sin(radian) * radius;

          return (
            <div
              key={question.id}
              className="absolute w-24 h-32 transition-all duration-300"
              style={{
                left: `calc(50% + ${x}% - 48px)`,
                top: `calc(50% + ${y}% - 64px)`,
                transform: `rotate(${angle + 90}deg)`,
              }}
            >
              <div
                className={`h-full w-full rounded-2xl border-2 p-2 overflow-hidden shadow-lg transition-all duration-300 ${
                  isActive
                    ? "border-amber-400 bg-amber-500/20 shadow-amber-500/50 scale-110"
                    : "border-slate-600 bg-slate-900/80 shadow-slate-900/50 hover:border-slate-500 hover:bg-slate-800/80"
                }`}
                style={{
                  transform: `rotate(${-angle - 90}deg)`,
                }}
              >
                {/* Image background */}
                <div className="relative h-full w-full rounded-lg overflow-hidden bg-gradient-to-b from-slate-700 to-slate-900">
                  <img
                    src={`/assets/houses/${question.round}.png`}
                    alt={question.house}
                    className="h-full w-full object-cover opacity-80 hover:opacity-100 transition-opacity"
                  />
                  {/* Overlay with info */}
                  <div className="absolute inset-0 flex flex-col items-center justify-between bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent p-2">
                    <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-amber-500 text-xs font-bold text-slate-950">
                      {question.round}
                    </span>
                    <p className="text-center text-[10px] font-semibold text-white leading-tight uppercase tracking-wide drop-shadow">
                      {question.house}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Legend */}
      <div className="mt-8 rounded-2xl border border-white/10 bg-slate-900/50 p-4">
        <p className="text-sm text-slate-400">
          <span className="inline-block h-2 w-2 rounded-full bg-amber-400 mr-2"></span>
          Casa destacada é a pergunta ativa
        </p>
      </div>
    </div>
  );
}

export default Board;
