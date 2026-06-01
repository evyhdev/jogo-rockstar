import type { QuestionOption } from "../types/game.types";

function AnswerButtons({
  options,
  disabled,
  onSelect,
}: {
  options: QuestionOption[];
  disabled: boolean;
  onSelect: (answerId: "A" | "B" | "C" | "D" | "E") => void;
}) {
  return (
    <div className="grid gap-3">
      {options.map((option) => (
        <button
          key={option.id}
          type="button"
          disabled={disabled}
          onClick={() => onSelect(option.id)}
          className="rounded-3xl border border-amber-400/20 bg-slate-900/90 px-4 py-5 text-left text-white transition hover:border-amber-300/80 disabled:cursor-not-allowed disabled:border-slate-700/60 disabled:text-slate-500"
        >
          <div className="flex items-center justify-between gap-4">
            <span className="text-xl font-semibold">{option.id})</span>
            <span className="text-sm uppercase tracking-[0.35em] text-slate-400">
              {option.color}
            </span>
          </div>
          <p className="mt-3 text-sm leading-6 text-slate-200">{option.text}</p>
        </button>
      ))}
    </div>
  );
}

export default AnswerButtons;
