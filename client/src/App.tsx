import { useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import DatashowPage from "./pages/DatashowPage";
import LiderPage from "./pages/LiderPage";
import { socket } from "./socket/socket";
import type { GameState } from "./types/game.types";

const initialState: GameState = {
  status: "waiting",
  round: 1,
  currentQuestionId: "q1",
  leakLevel: 0,
  timer: {
    duration: 60,
    remaining: 60,
    isRunning: false,
  },
  questionLocked: false,
  questions: [],
  characters: [],
  cards: [],
  teams: [],
  roundResults: [],
  finalRanking: [],
  finalMessage: null,
};

function App() {
  const [gameState, setGameState] = useState<GameState>(initialState);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    socket.on("game:stateUpdated", setGameState);
    socket.on("game:error", ({ message }) => setError(message));

    return () => {
      socket.off("game:stateUpdated", setGameState);
      socket.off("game:error");
    };
  }, []);

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(15,23,42,0.95),_rgba(5,11,23,1))] text-white">
      {error ? (
        <div className="fixed bottom-4 left-1/2 z-50 w-[min(95vw,560px)] -translate-x-1/2 rounded-2xl border border-red-500 bg-red-600/90 px-5 py-3 text-sm font-semibold shadow-lg">
          {error}
        </div>
      ) : null}
      <Routes>
        <Route path="/datashow" element={<DatashowPage gameState={gameState} />} />
        <Route path="/lider/:teamId" element={<LiderPage gameState={gameState} />} />
        <Route path="/" element={<Navigate to="/datashow" />} />
        <Route path="*" element={<Navigate to="/datashow" />} />
      </Routes>
    </div>
  );
}

export default App;
