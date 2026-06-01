import Board from "../components/Board";
import GameControls from "../components/GameControls";
import LeakMeter from "../components/LeakMeter";
import QuestionPanel from "../components/QuestionPanel";
import Ranking from "../components/Ranking";
import RoundResultPanel from "../components/RoundResultPanel";
import TeamStatus from "../components/TeamStatus";
import type { GameState, Question } from "../types/game.types";

const statusLabels: Record<string, string> = {
  waiting: "Aguardando",
  question: "Pergunta ativa",
  result: "Resultado",
  finished: "Finalizado",
};

function DatashowPage({ gameState }: { gameState: GameState }) {
  const currentQuestion: Question | undefined = gameState.questions.find(
    (question) => question.id === gameState.currentQuestionId
  );

  const isFinalPage = gameState.currentQuestionId === "final" || gameState.status === "finished";

  return (
    <div className="mx-auto flex min-h-screen max-w-[1600px] flex-col gap-8 px-4 py-6 lg:px-8">
      <header className="rounded-[32px] border border-white/10 bg-slate-950/70 p-6 shadow-glow backdrop-blur-xl">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-amber-300/80">
              Operação Rockstar
            </p>
            <h1 className="mt-2 text-3xl font-semibold text-white">Protocolo Seguro</h1>
          </div>
          <div className="grid gap-3 sm:grid-cols-3">
            <div className="rounded-3xl bg-slate-900/90 px-5 py-4 text-center shadow-lg shadow-slate-900/10">
              <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Rodada</p>
              <p className="mt-2 text-2xl font-semibold text-amber-300">{gameState.round}</p>
            </div>
            <div className="rounded-3xl bg-slate-900/90 px-5 py-4 text-center shadow-lg shadow-slate-900/10">
              <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Status do jogo</p>
              <p className="mt-2 text-2xl font-semibold text-cyan-300">
                {statusLabels[gameState.status]}
              </p>
            </div>
            <div className="rounded-3xl bg-slate-900/90 px-5 py-4 text-center shadow-lg shadow-slate-900/10">
              <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Vazamento</p>
              <p className="mt-2 text-2xl font-semibold text-red-400">{gameState.leakLevel}%</p>
            </div>
          </div>
        </div>
      </header>

      <section className="rounded-[32px] border border-white/10 bg-slate-950/70 p-6 shadow-glow backdrop-blur-xl">
        <Board questions={gameState.questions} currentQuestionId={gameState.currentQuestionId} />
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.35fr_0.65fr]">
        <div className="rounded-[32px] border border-white/10 bg-slate-950/70 p-6 shadow-glow backdrop-blur-xl">
          {isFinalPage ? (
            <div className="space-y-6">
              <div className="rounded-3xl border border-amber-400/20 bg-amber-500/10 p-6">
                <p className="text-sm uppercase tracking-[0.35em] text-amber-300">Conselho Final</p>
                <h2 className="mt-3 text-3xl font-semibold text-white">Resultados Finais</h2>
                <p className="mt-3 text-sm text-slate-300">{gameState.finalMessage}</p>
              </div>
              <div className="rounded-3xl border border-white/10 bg-slate-900/90 p-6 text-slate-200">
                <p className="text-sm uppercase tracking-[0.35em] text-slate-400">
                  Nível final de vazamento
                </p>
                <p className="mt-2 text-4xl font-semibold text-red-400">{gameState.leakLevel}%</p>
              </div>
            </div>
          ) : (
            <QuestionPanel
              question={currentQuestion}
              showCorrect={gameState.status !== "question"}
              correctAnswer={currentQuestion?.bestOptionId}
            />
          )}
        </div>

        <aside className="flex flex-col gap-6">
          <div className="rounded-[32px] border border-white/10 bg-slate-950/70 p-6 shadow-glow backdrop-blur-xl">
            <div className="mb-5 flex items-center justify-between gap-3">
              <div>
                <p className="text-sm uppercase tracking-[0.35em] text-slate-400">Cronômetro</p>
                <p className="mt-2 text-3xl font-semibold text-amber-300">
                  {gameState.timer.remaining}s
                </p>
              </div>
              <div className="rounded-full bg-slate-900/80 px-4 py-2 text-sm text-slate-200">
                {gameState.timer.isRunning ? "Ativo" : "Parado"}
              </div>
            </div>
            <LeakMeter leak={gameState.leakLevel} />
          </div>

          <div className="rounded-[32px] border border-white/10 bg-slate-950/70 p-6 shadow-glow backdrop-blur-xl">
            <h2 className="mb-4 text-xl font-semibold text-white">Controles do jogo</h2>
            <GameControls status={gameState.status} />
          </div>
        </aside>
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.5fr_1fr]">
        <div className="rounded-[32px] border border-white/10 bg-slate-950/70 p-6 shadow-glow backdrop-blur-xl">
          <h2 className="mb-5 text-xl font-semibold text-white">Status das equipes</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {gameState.teams.map((team) => (
              <TeamStatus key={team.id} team={team} roundResults={gameState.roundResults} />
            ))}
          </div>
        </div>

        {isFinalPage ? (
          <div className="rounded-[32px] border border-white/10 bg-slate-950/70 p-6 shadow-glow backdrop-blur-xl">
            <Ranking ranking={gameState.finalRanking} />
          </div>
        ) : null}
      </section>

      {gameState.status === "result" && gameState.roundResults.length > 0 ? (
        <section className="rounded-[32px] border border-white/10 bg-slate-950/70 p-6 shadow-glow backdrop-blur-xl">
          <h2 className="mb-5 text-xl font-semibold text-white">Detalhes do Resultado</h2>
          <RoundResultPanel roundResults={gameState.roundResults} teams={gameState.teams} />
        </section>
      ) : null}
    </div>
  );
}

export default DatashowPage;
