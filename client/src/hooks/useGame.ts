import { useEffect, useState } from "react";
import { gameStore } from "../services/gameStore";
import type { GameState } from "../types/game.types";

export function useGame(gameId?: string) {
  const [game, setGame] = useState<GameState | null>(null);
  const [loading, setLoading] = useState(Boolean(gameId));

  useEffect(() => {
    if (!gameId) return;
    return gameStore.subscribe(gameId, (state) => {
      setGame(state);
      setLoading(false);
    });
  }, [gameId]);

  return { game, loading };
}
