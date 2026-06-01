import type { Card } from "../types/game.types";

function CardPower({ card, used }: { card?: Card; used: boolean }) {
  if (!card) {
    return (
      <div className="mt-6 rounded-3xl border border-dashed border-slate-700 bg-slate-900/80 p-6 text-center text-slate-400">
        Carta não disponível.
      </div>
    );
  }

  return (
    <div className="mt-6 rounded-[32px] border border-white/10 bg-slate-900/90 p-6 shadow-inner shadow-slate-950/30">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.35em] text-slate-400">Carta</p>
          <h3 className="mt-2 text-xl font-semibold text-white">{card.name}</h3>
        </div>
        <span
          className={`rounded-full px-3 py-1 text-xs uppercase tracking-[0.35em] ${used ? "bg-rose-500/10 text-rose-200" : "bg-emerald-500/10 text-emerald-200"}`}
        >
          {used ? "Usada" : "Disponível"}
        </span>
      </div>
      <p className="mt-4 text-sm leading-6 text-slate-300">{card.description}</p>
      <p className="mt-3 text-sm text-slate-400">Efeito: {card.effect}</p>
    </div>
  );
}

export default CardPower;
