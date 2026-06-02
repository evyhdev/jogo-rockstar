import type { GameState } from "../types/game.types";
import { createGame, createTeam } from "../game/gameEngine";

const databaseUrl = (import.meta.env.VITE_FIREBASE_DATABASE_URL as string | undefined)?.replace(/\/$/, "");
const localPrefix = "operacao-rockstar:";
const channel = "BroadcastChannel" in window ? new BroadcastChannel("operacao-rockstar") : null;

function getFirebaseError(response: Response, fallback: string) {
  if (response.status === 404) {
    return new Error("Realtime Database não encontrado. Confira a URL configurada no Firebase e na Vercel.");
  }
  if (response.status === 401 || response.status === 403) {
    return new Error("Acesso negado pelo Firebase. Publique as regras do Realtime Database.");
  }
  return new Error(fallback);
}

function getLocal(gameId: string) {
  const value = localStorage.getItem(`${localPrefix}${gameId}`);
  return value ? normalizeGame(JSON.parse(value) as GameState) : null;
}

function setLocal(state: GameState) {
  localStorage.setItem(`${localPrefix}${state.id}`, JSON.stringify(state));
  channel?.postMessage(state.id);
}

async function getRemote(gameId: string) {
  const response = await fetch(`${databaseUrl}/games/${gameId}.json`);
  if (!response.ok) throw getFirebaseError(response, "Não foi possível acessar a sala.");
  const state = (await response.json()) as GameState | null;
  return state ? normalizeGame(state) : null;
}

function normalizeGame(state: GameState): GameState {
  const defaults = createGame(state.id);
  const teams = Object.fromEntries(
    Object.entries(state.teams ?? {}).map(([teamId, team]) => {
      const eliminated = team.eliminated ?? (team.leakExplosions > 0 || team.leakLevel >= 100);
      return [
        teamId,
        { ...createTeam(teamId, team.leaderName, team.slotIndex), ...team, leakLevel: eliminated ? 100 : team.leakLevel, eliminated, results: team.results ?? {} },
      ];
    })
  );
  return {
    ...defaults,
    ...state,
    teams,
    selectionOrder: state.selectionOrder ?? [],
  };
}

export const gameStore = {
  mode: databaseUrl ? "firebase" : "local",

  async get(gameId: string) {
    return databaseUrl ? getRemote(gameId) : getLocal(gameId);
  },

  async create(state: GameState) {
    if (!databaseUrl) {
      setLocal(state);
      return;
    }
    const response = await fetch(`${databaseUrl}/games/${state.id}.json`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(state),
    });
    if (!response.ok) throw getFirebaseError(response, "Não foi possível criar a sala no Firebase.");
  },

  async mutate(gameId: string, mutateState: (state: GameState) => void) {
    if (!databaseUrl) {
      const state = getLocal(gameId);
      if (!state) throw new Error("Sala não encontrada.");
      mutateState(state);
      setLocal(state);
      return state;
    }
    for (let attempt = 0; attempt < 5; attempt += 1) {
      const current = await fetch(`${databaseUrl}/games/${gameId}.json`, {
        headers: { "X-Firebase-ETag": "true" },
      });
      if (!current.ok) throw getFirebaseError(current, "Não foi possível atualizar a sala.");
      const remoteState = (await current.json()) as GameState | null;
      if (!remoteState) throw new Error("Sala não encontrada.");
      const state = normalizeGame(remoteState);
      mutateState(state);
      const response = await fetch(`${databaseUrl}/games/${gameId}.json`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "If-Match": current.headers.get("ETag") ?? "*",
        },
        body: JSON.stringify(state),
      });
      if (response.ok) return state;
      if (response.status !== 412) throw new Error("Não foi possível salvar a atualização.");
    }
    throw new Error("Outra ação ocorreu ao mesmo tempo. Tente novamente.");
  },

  subscribe(gameId: string, callback: (state: GameState | null) => void) {
    let active = true;
    let refreshing = false;
    let lastSerializedState: string | null = null;
    const refresh = async () => {
      if (refreshing) return;
      refreshing = true;
      try {
        const state = await gameStore.get(gameId);
        const serializedState = JSON.stringify(state);
        if (active && serializedState !== lastSerializedState) {
          lastSerializedState = serializedState;
          callback(state);
        }
      } catch {
        if (active && lastSerializedState !== "null") {
          lastSerializedState = "null";
          callback(null);
        }
      } finally {
        refreshing = false;
      }
    };
    void refresh();
    const interval = window.setInterval(refresh, databaseUrl ? 800 : 400);
    const handleMessage = (event: MessageEvent<string>) => event.data === gameId && void refresh();
    channel?.addEventListener("message", handleMessage);
    return () => {
      active = false;
      window.clearInterval(interval);
      channel?.removeEventListener("message", handleMessage);
    };
  },
};
