import { socket } from "../socket/socket";
import type { GameStatus } from "../types/game.types";

function GameControls({ status }: { status: GameStatus }) {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {status === "waiting" ? (
        <>
          <button
            type="button"
            onClick={() => socket.emit("datashow:startGame")}
            className="rounded-3xl bg-amber-500 px-5 py-4 font-semibold text-slate-950 transition hover:bg-amber-400"
          >
            Iniciar jogo
          </button>
          <button
            type="button"
            onClick={() => socket.emit("datashow:startRound")}
            className="rounded-3xl bg-cyan-500 px-5 py-4 font-semibold text-slate-950 transition hover:bg-cyan-400"
          >
            Iniciar rodada
          </button>
        </>
      ) : null}

      {status === "question" ? (
        <button
          type="button"
          onClick={() => socket.emit("datashow:showResult")}
          className="rounded-3xl bg-emerald-500 px-5 py-4 font-semibold text-slate-950 transition hover:bg-emerald-400"
        >
          Mostrar resultado
        </button>
      ) : null}

      {status === "result" ? (
        <button
          type="button"
          onClick={() => socket.emit("datashow:nextRound")}
          className="rounded-3xl bg-slate-700 px-5 py-4 font-semibold text-white transition hover:bg-slate-600"
        >
          Próxima rodada
        </button>
      ) : null}

      <button
        type="button"
        onClick={() => socket.emit("datashow:resetGame")}
        className="col-span-full rounded-3xl bg-red-500 px-5 py-4 font-semibold text-white transition hover:bg-red-400"
      >
        Reiniciar jogo
      </button>
    </div>
  );
}

export default GameControls;
