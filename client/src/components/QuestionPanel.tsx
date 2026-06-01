import type { Question } from "../types/game.types";

function QuestionPanel({
  question,
  showCorrect,
  correctAnswer,
}: {
  question?: Question;
  showCorrect: boolean;
  correctAnswer?: string;
}) {
  if (!question) {
    return (
      <div className="rounded-3xl border border-dashed border-slate-700 bg-slate-900/80 p-8 text-center text-slate-300">
        Pergunta não carregada.
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <div className="rounded-3xl border border-white/10 bg-slate-900/90 p-6 shadow-inner shadow-slate-900/20">
        <div className="grid gap-4 sm:grid-cols-3">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-slate-400">Tema</p>
            <p className="mt-2 text-base font-semibold text-white">{question.theme}</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-slate-400">Dificuldade</p>
            <p className="mt-2 text-base font-semibold text-white">{question.difficulty}</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-slate-400">Casa</p>
            <p className="mt-2 text-base font-semibold text-amber-300">{question.house}</p>
          </div>
        </div>
      </div>
      <div className="rounded-3xl border border-white/10 bg-slate-900/90 p-6 shadow-inner shadow-slate-900/20">
        <p className="text-lg font-semibold text-white">{question.statement}</p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        {question.options.map((option) => (
          <div key={option.id} className="rounded-3xl border border-white/10 bg-slate-900/80 p-4">
            <div className="flex items-center justify-between gap-3">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-slate-800 text-lg font-semibold text-white">
                {option.id}
              </span>
              <span className="text-xs uppercase tracking-[0.35em] text-slate-400">
                {option.color}
              </span>
            </div>
            <p className="mt-4 text-sm leading-6 text-slate-200">{option.text}</p>
            {showCorrect && correctAnswer === option.id ? (
              <p className="mt-3 text-sm font-semibold text-emerald-300">Resposta correta</p>
            ) : null}
          </div>
        ))}
      </div>
      {showCorrect ? (
        <div className="rounded-3xl border border-emerald-400/20 bg-emerald-500/10 p-4 text-sm text-emerald-200">
          Resposta correta: <span className="font-semibold text-white">{correctAnswer}</span>
        </div>
      ) : null}
    </div>
  );
}

export default QuestionPanel;
