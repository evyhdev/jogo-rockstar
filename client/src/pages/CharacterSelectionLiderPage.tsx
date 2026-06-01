import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { socket } from "../socket/socket";

interface Character {
  id: string;
  name: string;
  description: string;
  image?: string;
}

interface GameState {
  phase: string;
  characterSelection: {
    currentSlotIndex: number;
    selectedCharacters: Record<number, string>;
    availableCharacters: Character[];
  };
  teams: Array<{
    id: string;
    slotIndex: number;
    name: string;
  }>;
}

export default function CharacterSelectionLiderPage() {
  const navigate = useNavigate();
  const [gameState, setGameState] = useState<GameState | null>(null);
  const [selectedCharacter, setSelectedCharacter] = useState<string | null>(null);
  const [isWaiting, setIsWaiting] = useState(false);

  // Obter teamId da sessão localStorage (foi atribuído em LiderLobbyPage)
  const storedTeamId = localStorage.getItem("myTeamId");

  useEffect(() => {
    const handleStateUpdated = (state: GameState) => {
      setGameState(state);

      // Se não for mais character-selection, ir para o jogo normal
      if (state.phase !== "character-selection") {
        navigate(`/lider/${storedTeamId}`);
      }
    };

    socket.on("game:stateUpdated", handleStateUpdated);

    return () => {
      socket.off("game:stateUpdated", handleStateUpdated);
    };
  }, [navigate, storedTeamId]);

  if (!gameState) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <p className="text-slate-300">Carregando...</p>
      </div>
    );
  }

  const { characterSelection, teams } = gameState;
  const myTeam = teams.find((t) => t.id === storedTeamId);
  const mySlotIndex = myTeam?.slotIndex ?? -1;
  const isMyTurn = characterSelection.currentSlotIndex === mySlotIndex;

  const characterEmojis: Record<string, string> = {
    mago: "🧙",
    guerreira: "⚔️",
    elfo: "🏹",
    anao: "⛏️",
    bruxo: "🔮",
  };

  const handleSelectCharacter = (characterId: string) => {
    if (!storedTeamId) return;

    socket.emit("leader:selectCharacter", {
      teamId: storedTeamId,
      characterId,
    });

    setSelectedCharacter(characterId);
    setIsWaiting(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold text-white">Seleção de Personagem</h1>
          <p className="text-slate-400">
            {myTeam?.name} • Turno: Posição {characterSelection.currentSlotIndex + 1}/5
          </p>
        </div>

        {/* Status da seleção */}
        <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
          {isMyTurn ? (
            <div className="text-center space-y-2">
              <p className="text-green-400 text-lg font-bold">✓ É sua vez de escolher!</p>
              <p className="text-slate-300 text-sm">Selecione seu personagem abaixo</p>
            </div>
          ) : (
            <div className="text-center space-y-2">
              <p className="text-yellow-400 text-lg font-bold">⏳ Aguardando outro líder...</p>
              <p className="text-slate-300 text-sm">
                Posição {characterSelection.currentSlotIndex + 1} está escolhendo
              </p>
            </div>
          )}
        </div>

        {/* Grid de personagens */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {characterSelection.availableCharacters.map((character) => {
            const isSelected = selectedCharacter === character.id;
            const isAlreadyChosen = Object.values(characterSelection.selectedCharacters).includes(
              character.id
            );

            return (
              <button
                key={character.id}
                onClick={() => handleSelectCharacter(character.id)}
                disabled={!isMyTurn || isAlreadyChosen || isWaiting}
                className={`p-6 rounded-lg border-2 transition-all transform ${
                  isAlreadyChosen
                    ? "bg-slate-700 border-slate-600 opacity-50 cursor-not-allowed"
                    : isMyTurn && !isWaiting
                      ? "bg-slate-800 border-slate-600 hover:border-white hover:bg-slate-700 cursor-pointer hover:scale-105"
                      : "bg-slate-800 border-slate-600 opacity-70 cursor-not-allowed"
                } ${isSelected ? "ring-4 ring-green-500 border-green-500" : ""}`}
              >
                <div className="space-y-3">
                  <div className="text-5xl text-center">
                    {characterEmojis[character.id] || "🎭"}
                  </div>
                  <h3 className="text-xl font-bold text-white">{character.name}</h3>
                  <p className="text-sm text-slate-400">{character.description}</p>
                  {isSelected && (
                    <div className="pt-2 text-green-400 font-semibold text-sm">✓ SELECIONADO</div>
                  )}
                  {isAlreadyChosen && (
                    <div className="pt-2 text-slate-500 font-semibold text-sm">✗ JÁ ESCOLHIDO</div>
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {/* Log de escolhas */}
        <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
          <p className="text-slate-300 text-sm font-semibold mb-3">Escolhas até agora:</p>
          <div className="space-y-2">
            {teams.map((team, index) => {
              const selectedCharId = characterSelection.selectedCharacters[team.slotIndex];
              const selectedChar = characterSelection.availableCharacters.find(
                (c) => c.id === selectedCharId
              );

              return (
                <div key={index} className="flex justify-between items-center text-sm">
                  <span className="text-slate-400">
                    Posição {team.slotIndex + 1} ({team.name}):
                  </span>
                  <span
                    className={`font-semibold ${
                      selectedChar ? "text-green-400" : "text-slate-500"
                    }`}
                  >
                    {selectedChar ? selectedChar.name : "Aguardando..."}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
