import type { Character } from "../types/game.types";

function CharacterCard({ character }: { character?: Character }) {
  if (!character) {
    return (
      <div className="rounded-3xl border border-dashed border-slate-700 bg-slate-900/80 p-6 text-center text-slate-400">
        Personagem não definido.
      </div>
    );
  }

  return (
    <div className="rounded-[32px] border border-white/10 bg-slate-900/90 p-6 shadow-inner shadow-slate-950/30">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.35em] text-slate-400">Personagem</p>
          <h2 className="mt-2 text-2xl font-semibold text-white">{character.name}</h2>
        </div>
        <span className="rounded-full bg-amber-500/10 px-4 py-2 text-sm font-semibold text-amber-300">
          {character.className}
        </span>
      </div>
      <p className="mt-4 text-sm leading-6 text-slate-300">{character.description}</p>
      <div className="mt-5 rounded-3xl bg-slate-950/80 p-4">
        <p className="text-xs uppercase tracking-[0.35em] text-slate-400">Vantagem</p>
        <p className="mt-2 text-sm text-slate-200">
          {character.advantageBonus} pontos em casas especiais
        </p>
        <p className="mt-1 text-sm text-slate-400">
          Casas: {character.advantageHouseIds.join(", ")}
        </p>
      </div>
    </div>
  );
}

export default CharacterCard;
