import cors from "cors";
import express from "express";
import http from "http";
import { Server } from "socket.io";
import { attachGameSocket } from "./socket/gameSocket";

const app = express();
const server = http.createServer(app);

app.use(cors({ origin: true }));
app.get("/", (req, res) => {
  res.send("Operação Rockstar backend está ativo.");
});

const io = new Server(server, {
  cors: {
    origin: true,
    methods: ["GET", "POST"],
  },
});

attachGameSocket(io);

const port = process.env.PORT || 4000;
server.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
