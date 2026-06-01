function LeakMeter({ leak }: { leak: number }) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between text-sm text-slate-300">
        <span>Medidor de Vazamento</span>
        <span className="font-semibold text-white">{leak}%</span>
      </div>
      <div className="h-4 overflow-hidden rounded-full bg-slate-800">
        <div
          className="h-full rounded-full bg-gradient-to-r from-amber-500 via-red-500 to-rose-600 transition-all"
          style={{ width: `${leak}%` }}
        />
      </div>
      <div className="grid grid-cols-3 gap-2 text-[11px] uppercase tracking-[0.24em] text-slate-500">
        <span className="text-left">Seguro</span>
        <span className="text-center">Alerta</span>
        <span className="text-right">Crítico</span>
      </div>
    </div>
  );
}

export default LeakMeter;
