function Timer({ seconds, running }: { seconds: number; running: boolean }) {
  return (
    <div className="rounded-3xl bg-slate-900/90 p-5 text-center shadow-inner shadow-slate-900/20">
      <p className="text-sm uppercase tracking-[0.35em] text-slate-400">Tempo restante</p>
      <p className="mt-3 text-5xl font-bold text-amber-300">{seconds}s</p>
      <p className="mt-2 text-sm text-slate-300">{running ? "Rodada ativa" : "Parado"}</p>
    </div>
  );
}

export default Timer;
