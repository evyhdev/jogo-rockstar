import { io, type Socket } from "socket.io-client";
import type { GameState } from "../types/game.types";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL ?? "http://localhost:4000";

export const socket: Socket = io(BACKEND_URL, {
  transports: ["websocket"],
  autoConnect: true,
});

export type SocketEvents = {
  "game:stateUpdated": (state: GameState) => void;
  "game:questionStarted": (state: GameState) => void;
  "game:answerReceived": (payload: { state: GameState; team: any }) => void;
  "game:roundResult": (state: GameState) => void;
  "game:finished": (state: GameState) => void;
  "game:error": (payload: { message: string }) => void;
};
