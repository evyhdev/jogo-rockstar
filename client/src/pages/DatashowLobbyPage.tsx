import { GameState } from "../types/game.types";

interface DatashowLobbyPageProps {
  gameState: GameState;
}

export default function DatashowLobbyPage({ gameState }: DatashowLobbyPageProps) {
  const slotNames = ["Equipe 1", "Equipe 2", "Equipe 3", "Equipe 4", "Equipe 5"];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex flex-col items-center justify-center p-4">
      <div className="max-w-4xl w-full space-y-8">
        {/* Título principal */}
        <div className="text-center space-y-4">
          <h1 className="text-5xl font-bold text-white">Operação Rockstar</h1>
          <p className="text-2xl font-semibold text-yellow-400">Protocolo Seguro</p>
        </div>

        {/* Status do Lobby */}
        <div className="bg-slate-800 rounded-lg p-8 text-center border-2 border-slate-700 shadow-xl">
          <h2 className="text-3xl font-bold text-white mb-4">Aguardando Líderes</h2>
          <p className="text-4xl font-bold text-blue-400 mb-2">{gameState.filledSlots ?? 0}/5</p>
          <p className="text-slate-300">Líderes conectados</p>
        </div>

        {/* Grade de slots */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {slotNames.map((name, index) => {
            const connected = index < (gameState.filledSlots ?? 0);
            return (
              <div
                key={index}
                className={`p-6 rounded-lg border-2 text-center transition-all transform ${
                  connected
                    ? "bg-green-900 border-green-500 scale-105 shadow-lg"
                    : "bg-slate-800 border-slate-600 opacity-50"
                }`}
              >
                <div className="text-3xl mb-2">{connected ? "✓" : "◯"}</div>
                <h3 className="text-lg font-bold text-white">{name}</h3>
                <p className="text-sm text-slate-300 mt-2">
                  {connected ? "Conectado" : "Aguardando"}
                </p>
              </div>
            );
          })}
        </div>

        {/* Mensagem de instrução */}
        <div className="bg-gradient-to-r from-blue-900 to-blue-800 rounded-lg p-6 border border-blue-400 shadow-lg">
          <p className="text-white text-center text-lg">
            <span className="font-bold">🎬 Próxima etapa:</span> Seleção de Personagens
          </p>
          <p className="text-blue-100 text-center text-sm mt-2">
            Assim que todos os 5 líderes conectarem, a seleção de personagens começará.
          </p>
        </div>

        {/* Footer com versão */}
        <div className="text-center text-slate-500 text-sm">Operação Rockstar - MVP v1.0</div>
      </div>
    </div>
  );
}
