import { Character, GameState, Question, RoundResultTeam, TeamState } from "../types/game.types";
import { createInitialState, getCharacterById, getQuestionByRound } from "./gameState";
import { calculateRoundResult } from "./scoring";
import { GameTimer } from "./timer";

export type GameEventHandlers = {
  onUpdate: (state: GameState) => void;
  onQuestionStarted: (state: GameState) => void;
  onAnswerReceived: (state: GameState, team: TeamState) => void;
  onRoundResult: (state: GameState) => void;
  onFinished: (state: GameState) => void;
  onError: (socketId: string | null, message: string) => void;
};

export class GameEngine {
  private state: GameState;
  private timer: GameTimer | null = null;
  private handlers: GameEventHandlers;

  constructor(handlers: GameEventHandlers) {
    this.handlers = handlers;
    this.state = createInitialState();
  }

  private broadcastUpdate() {
    this.handlers.onUpdate(this.state);
  }

  private broadcastQuestionStarted() {
    this.handlers.onQuestionStarted(this.state);
  }

  private broadcastAnswerReceived(team: TeamState) {
    this.handlers.onAnswerReceived(this.state, team);
  }

  private broadcastRoundResult() {
    this.handlers.onRoundResult(this.state);
  }

  private broadcastFinished() {
    this.handlers.onFinished(this.state);
  }

  private sendError(socketId: string | null, message: string) {
    this.handlers.onError(socketId, message);
  }

  private get currentQuestion(): Question | undefined {
    return getQuestionByRound(this.state, this.state.round);
  }

  private resetRoundAnswers() {
    this.state.teams = this.state.teams.map((team) => ({
      ...team,
      hasAnswered: false,
      selectedOptionId: null,
      currentCardRoll: null,
      currentCardSuccess: null,
    }));
    this.state.roundResults = [];
  }

  private resetTimer() {
    if (this.timer) {
      this.timer.stop();
    }
    this.state.timer = {
      duration: 60,
      remaining: 60,
      isRunning: false,
    };
    this.state.questionLocked = false;
    this.timer = new GameTimer(
      60,
      (timeLeft) => {
        this.state.timer.remaining = timeLeft;
        this.broadcastUpdate();
      },
      () => {
        this.state.timer.isRunning = false;
        this.state.questionLocked = true;
        this.broadcastUpdate();
      }
    );
  }

  private startTimer() {
    this.resetTimer();
    this.state.timer.isRunning = true;
    this.timer?.start();
  }

  private stopTimer() {
    if (this.timer) {
      this.timer.stop();
    }
    this.state.timer.isRunning = false;
    this.state.questionLocked = true;
  }

  private getCharacter(characterId: string): Character | undefined {
    return getCharacterById(this.state, characterId);
  }

  private computeRoundResults() {
    const question = this.currentQuestion;
    if (!question) {
      this.sendError(null, "Pergunta atual não encontrada.");
      return;
    }

    const results: RoundResultTeam[] = this.state.teams.map((team) => {
      const character = this.getCharacter(team.characterId);
      return calculateRoundResult(question, team, character);
    });

    this.state.roundResults = results;

    this.state.teams = this.state.teams.map((team) => {
      const result = results.find((entry) => entry.teamId === team.id);
      if (!result) return team;

      const updatedStats = {
        ...team.stats,
        green: team.stats.green + (result.optionColor === "Verde" ? 1 : 0),
        blue: team.stats.blue + (result.optionColor === "Azul" ? 1 : 0),
        yellow: team.stats.yellow + (result.optionColor === "Amarelo" ? 1 : 0),
        red: team.stats.red + (result.optionColor === "Vermelho" ? 1 : 0),
        unanswered: team.stats.unanswered + (result.selectedOptionId === null ? 1 : 0),
      };

      return {
        ...team,
        score: team.score + result.roundScore,
        confidence: Math.max(team.confidence - result.confidenceLoss, 0),
        stats: updatedStats,
      };
    });

    const totalLeak = results.reduce((sum, entry) => sum + entry.finalLeakIncrease, 0);
    this.state.leakLevel = Math.min(this.state.leakLevel + totalLeak, 100);
  }

  private computeFinalMessage(): string {
    if (this.state.leakLevel >= 100) {
      return "Falha crítica. O vazamento atingiu nível máximo e a operação foi comprometida.";
    }
    if (this.state.leakLevel >= 80) {
      return "Operação crítica. O Reino evitou o pior, mas ficou muito próximo de um vazamento grave.";
    }
    if (this.state.leakLevel >= 50) {
      return "Operação concluída com riscos. O Reino sobreviveu, mas precisa melhorar seus controles.";
    }
    return "Operação concluída com sucesso. O Reino Rockstar protegeu seus ativos críticos.";
  }

  private buildRanking(): TeamState[] {
    return [...this.state.teams].sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      if (b.confidence !== a.confidence) return b.confidence - a.confidence;
      if (a.stats.red !== b.stats.red) return a.stats.red - b.stats.red;
      return 0;
    });
  }

  private finishGame() {
    this.state.status = "finished";
    this.state.currentQuestionId = "final";
    this.state.round = 9;
    this.state.finalRanking = this.buildRanking();
    this.state.finalMessage = this.computeFinalMessage();
    this.stopTimer();
    this.state.questionLocked = true;
    this.broadcastUpdate();
    this.broadcastFinished();
  }

  public startGame() {
    this.state = createInitialState();
    this.resetTimer();
    this.state.status = "waiting";
    this.broadcastUpdate();
  }

  public startRound() {
    if (this.state.status === "finished") {
      this.sendError(null, "O jogo já terminou.");
      return;
    }

    if (this.state.status === "question") {
      this.sendError(null, "A rodada já está ativa.");
      return;
    }

    this.resetRoundAnswers();
    this.state.currentQuestionId = this.currentQuestion?.id ?? this.state.currentQuestionId;
    this.state.status = "question";
    this.state.questionLocked = false;
    this.startTimer();
    this.broadcastQuestionStarted();
    this.broadcastUpdate();
  }

  public submitAnswer(
    teamId: string,
    answerId: "A" | "B" | "C" | "D" | "E",
    socketId: string | null = null
  ) {
    if (this.state.status !== "question") {
      this.sendError(socketId, "Não há pergunta ativa no momento.");
      return;
    }
    if (this.state.questionLocked) {
      this.sendError(socketId, "O tempo acabou ou a rodada está encerrada.");
      return;
    }

    const team = this.state.teams.find((item) => item.id === teamId);
    if (!team) {
      this.sendError(socketId, "Equipe inválida.");
      return;
    }
    if (team.hasAnswered) {
      this.sendError(socketId, "Resposta já registrada para esta equipe.");
      return;
    }

    team.hasAnswered = true;
    team.selectedOptionId = answerId;
    this.broadcastAnswerReceived(team);
    this.broadcastUpdate();
  }

  public useCard(teamId: string, socketId: string | null = null) {
    if (this.state.status !== "question") {
      this.sendError(socketId, "A carta só pode ser usada durante uma pergunta ativa.");
      return;
    }

    const team = this.state.teams.find((item) => item.id === teamId);
    if (!team) {
      this.sendError(socketId, "Equipe inválida.");
      return;
    }
    if (team.cardUsed) {
      this.sendError(socketId, "A carta já foi usada por esta equipe.");
      return;
    }

    const roll = Math.floor(Math.random() * 6) + 1;
    team.cardUsed = true;
    team.currentCardRoll = roll;
    team.currentCardSuccess = roll % 2 === 0;
    this.broadcastUpdate();
  }

  public showResult() {
    if (this.state.status !== "question") {
      this.sendError(null, "Não há rodada ativa para mostrar resultado.");
      return;
    }

    this.stopTimer();
    this.state.questionLocked = true;
    this.computeRoundResults();

    if (this.state.leakLevel >= 100) {
      this.finishGame();
      return;
    }

    this.state.status = "result";
    this.broadcastRoundResult();
    this.broadcastUpdate();
  }

  public nextRound() {
    if (this.state.status !== "result") {
      this.sendError(null, "É preciso mostrar o resultado antes de ir para a próxima rodada.");
      return;
    }

    if (this.state.round >= 8) {
      this.finishGame();
      return;
    }

    this.state.round += 1;
    this.state.currentQuestionId = this.currentQuestion?.id ?? this.state.currentQuestionId;
    this.state.status = "waiting";
    this.resetRoundAnswers();
    this.resetTimer();
    this.broadcastUpdate();
  }

  public resetGame() {
    this.startGame();
  }

  public getState() {
    return this.state;
  }
}
