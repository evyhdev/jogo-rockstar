import { Character, GameState } from "../types/game.types";

interface DatashowCharacterSelectionPageProps {
  gameState: GameState;
}

export default function DatashowCharacterSelectionPage({
  gameState,
}: DatashowCharacterSelectionPageProps) {
  if (!gameState.characterSelection) {
    return <div className="text-white">Erro: dados de seleção não disponíveis</div>;
  }

  const { characterSelection, teams } = gameState;
  const currentSlotIndex = characterSelection.currentSlotIndex;
  const currentTeam = teams[currentSlotIndex];

  const characterEmojis: Record<string, string> = {
    mago: "🧙",
    guerreira: "⚔️",
    elfo: "🏹",
    anao: "⛏️",
    bruxo: "🔮",
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex flex-col items-center justify-center p-4">
      <div className="max-w-6xl w-full space-y-8">
        {/* Título */}
        <div className="text-center space-y-2">
          <h1 className="text-5xl font-bold text-white">Seleção de Personagem</h1>
          <p className="text-slate-400">
            Posição {currentSlotIndex + 1} de 5 • {currentTeam?.name}
          </p>
        </div>

        {/* Líder atual */}
        <div className="bg-gradient-to-r from-yellow-600 to-yellow-800 rounded-lg p-8 text-center border-2 border-yellow-400 shadow-xl">
          <p className="text-yellow-100 text-lg mb-2">ESCOLHENDO AGORA:</p>
          <h2 className="text-4xl font-bold text-white">{currentTeam?.name}</h2>
        </div>

        {/* Grid de personagens */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {characterSelection.availableCharacters.map((character: Character) => {
            const isSelected =
              characterSelection.selectedCharacters[currentSlotIndex] === character.id;
            const isAlreadyChosen = Object.values(characterSelection.selectedCharacters).includes(
              character.id
            );

            return (
              <div
                key={character.id}
                className={`p-6 rounded-lg border-4 text-center transition-all transform ${
                  isSelected
                    ? "bg-green-900 border-green-400 scale-110 shadow-2xl"
                    : isAlreadyChosen
                      ? "bg-slate-800 border-slate-600 opacity-50"
                      : "bg-slate-800 border-slate-600 hover:border-white hover:scale-105"
                }`}
              >
                <div className="text-6xl mb-3">{characterEmojis[character.id] || "🎭"}</div>
                <h3 className="text-xl font-bold text-white">{character.name}</h3>
                <p className="text-xs text-slate-400 mt-2 h-8">{character.description}</p>

                {isSelected && (
                  <div className="mt-4 pt-2 border-t border-green-400">
                    <p className="text-green-300 font-bold text-sm">✓ SELECIONADO</p>
                  </div>
                )}

                {isAlreadyChosen && !isSelected && (
                  <div className="mt-4 pt-2 border-t border-slate-500">
                    <p className="text-slate-400 font-bold text-sm">✗ JÁ ESCOLHIDO</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Histórico de escolhas */}
        <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
          <h3 className="text-white font-bold mb-4">Histórico de Escolhas:</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3">
            {teams.map((team, index) => {
              const selectedCharId = characterSelection.selectedCharacters[team.slotIndex ?? 0];
              const selectedChar = characterSelection.availableCharacters.find(
                (c) => c.id === selectedCharId
              );

              return (
                <div
                  key={index}
                  className={`p-4 rounded border ${
                    selectedChar
                      ? "bg-green-900 border-green-500"
                      : index === currentSlotIndex
                        ? "bg-yellow-900 border-yellow-500"
                        : "bg-slate-700 border-slate-600"
                  }`}
                >
                  <p className="text-slate-300 text-xs font-semibold">
                    Pos {(team.slotIndex ?? 0) + 1}
                  </p>
                  <p className="text-white font-bold text-sm">{team.name}</p>
                  <p
                    className={`text-sm mt-1 ${selectedChar ? "text-green-200" : "text-slate-400"}`}
                  >
                    {selectedChar ? selectedChar.name : "Aguardando..."}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
