import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { socket } from "../socket/socket";

interface SlotAssignmentData {
  teamId: string;
  slotIndex: number;
}

export default function LiderLobbyPage() {
  const navigate = useNavigate();
  const [slotData, setSlotData] = useState<SlotAssignmentData | null>(null);
  const [filledSlots, setFilledSlots] = useState(0);
  const [gamePhase, setGamePhase] = useState<string>("lobby");

  useEffect(() => {
    // Emitir para entrar no lobby
    socket.emit("leader:joinLobby");

    // Escutar atribuição de slot
    const handleSlotAssigned = (data: SlotAssignmentData) => {
      setSlotData(data);
      // Armazenar teamId em localStorage para usar em CharacterSelectionPage
      localStorage.setItem("myTeamId", data.teamId);
    };

    // Escutar atualizações de estado do jogo
    const handleStateUpdated = (state: any) => {
      setFilledSlots(state.filledSlots);
      setGamePhase(state.phase);

      // Se a fase virou character-selection, redirecionar para seleção de personagem
      if (state.phase === "character-selection") {
        navigate("/lider/character-selection");
      }

      // Se a fase virou playing, redirecionar para a equipe normal
      if (state.phase === "playing" && slotData) {
        navigate(`/lider/${slotData.teamId}`);
      }
    };

    socket.on("leader:slotAssigned", handleSlotAssigned);
    socket.on("game:stateUpdated", handleStateUpdated);

    return () => {
      socket.off("leader:slotAssigned", handleSlotAssigned);
      socket.off("game:stateUpdated", handleStateUpdated);
    };
  }, [navigate, slotData]);

  const slotNames = ["Equipe 1", "Equipe 2", "Equipe 3", "Equipe 4", "Equipe 5"];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full space-y-8">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold text-white">Lobby - Aguardando Líderes</h1>
          <p className="text-slate-400">{filledSlots} de 5 líderes conectados</p>
        </div>

        {/* Seu slot */}
        {slotData && (
          <div className="bg-gradient-to-r from-green-600 to-green-800 rounded-lg p-8 shadow-lg border border-green-400">
            <div className="text-center space-y-3">
              <p className="text-green-100 text-sm font-semibold">SEU SLOT</p>
              <h2 className="text-3xl font-bold text-white">{slotNames[slotData.slotIndex]}</h2>
              <p className="text-green-100 text-sm">Posição {slotData.slotIndex + 1} de 5</p>
            </div>
          </div>
        )}

        {/* Status dos slots */}
        <div className="space-y-3">
          <p className="text-slate-300 text-sm font-semibold px-1">STATUS DOS SLOTS</p>
          <div className="grid grid-cols-1 gap-3">
            {slotNames.map((name, index) => (
              <div
                key={index}
                className={`flex items-center justify-between p-4 rounded-lg border-2 transition-all ${
                  index < filledSlots
                    ? "bg-green-900 border-green-500"
                    : index === slotData?.slotIndex
                      ? "bg-blue-900 border-blue-500"
                      : "bg-slate-800 border-slate-600"
                }`}
              >
                <span className="text-white font-medium">{name}</span>
                <span
                  className={`text-sm font-bold ${
                    index < filledSlots
                      ? "text-green-400"
                      : index === slotData?.slotIndex
                        ? "text-blue-400"
                        : "text-slate-500"
                  }`}
                >
                  {index < filledSlots
                    ? "✓ Conectado"
                    : index === slotData?.slotIndex
                      ? "← Você"
                      : "Aguardando"}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Mensagem de status */}
        <div className="bg-slate-800 rounded-lg p-6 text-center border border-slate-700">
          {filledSlots === 5 ? (
            <div className="space-y-2">
              <p className="text-green-400 font-semibold">✓ Todos os líderes conectados!</p>
              <p className="text-slate-300 text-sm">Seleção de personagens começará em breve...</p>
            </div>
          ) : (
            <div className="space-y-2">
              <p className="text-slate-300">Aguardando mais {5 - filledSlots} líder(es)...</p>
              <p className="text-slate-500 text-sm animate-pulse">
                ⏳ Preparando seleção de personagens...
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
