import { Server, Socket } from "socket.io";
import { GameEngine } from "../game/gameEngine";

export function attachGameSocket(io: Server) {
  const engine = new GameEngine({
    onUpdate: (state) => io.emit("game:stateUpdated", state),
    onQuestionStarted: (state) => io.emit("game:questionStarted", state),
    onAnswerReceived: (state, team) => io.emit("game:answerReceived", { state, team }),
    onRoundResult: (state) => io.emit("game:roundResult", state),
    onFinished: (state) => io.emit("game:finished", state),
    onError: (socketId, message) => {
      if (socketId) {
        const socket = io.sockets.sockets.get(socketId);
        socket?.emit("game:error", { message });
      } else {
        io.emit("game:error", { message });
      }
    },
  });

  io.on("connection", (socket: Socket) => {
    console.log(`Socket conectado: ${socket.id}`);

    socket.emit("game:stateUpdated", engine.getState());

    socket.on("datashow:startGame", () => engine.startGame());
    socket.on("datashow:startRound", () => engine.startRound());
    socket.on("datashow:showResult", () => engine.showResult());
    socket.on("datashow:nextRound", () => engine.nextRound());
    socket.on("datashow:resetGame", () => engine.resetGame());

    socket.on("leader:join", (payload: { teamId: string }) => {
      if (!payload?.teamId) {
        socket.emit("game:error", { message: "É necessário informar o ID da equipe." });
        return;
      }
      socket.emit("game:stateUpdated", engine.getState());
    });

    socket.on(
      "leader:submitAnswer",
      (payload: { teamId: string; answerId: "A" | "B" | "C" | "D" | "E" }) => {
        engine.submitAnswer(payload.teamId, payload.answerId, socket.id);
      }
    );

    socket.on("leader:useCard", (payload: { teamId: string }) => {
      engine.useCard(payload.teamId, socket.id);
    });

    socket.on("disconnect", () => {
      console.log(`Socket desconectado: ${socket.id}`);
    });
  });
}
