import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import AnswerButtons from "../components/AnswerButtons";
import CardPower from "../components/CardPower";
import CharacterCard from "../components/CharacterCard";
import { socket } from "../socket/socket";
import type { Card, Character, GameState, Question } from "../types/game.types";

const statusLabels: Record<string, string> = {
  waiting: "Aguardando início da rodada",
  question: "Pergunta ativa",
  result: "Resultado exibido",
  finished: "Jogo finalizado",
};

function LiderPage({ gameState }: { gameState: GameState }) {
  const { teamId } = useParams();
  const [message, setMessage] = useState<string | null>(null);

  const team = useMemo(
    () => gameState.teams.find((item) => item.id === teamId),
    [gameState.teams, teamId]
  );

  const question: Question | undefined = gameState.questions.find(
    (item) => item.id === gameState.currentQuestionId
  );

  const character: Character | undefined = useMemo(
    () => gameState.characters.find((item) => item.id === team?.characterId),
    [gameState.characters, team?.characterId]
  );

  const card: Card | undefined = useMemo(
    () => gameState.cards.find((item) => item.id === team?.cardId),
    [gameState.cards, team?.cardId]
  );

  useEffect(() => {
    if (!teamId) {
      return;
    }
    socket.emit("leader:join", { teamId });
  }, [teamId]);

  const canAnswer =
    gameState.status === "question" &&
    question &&
    team &&
    !team.hasAnswered &&
    !gameState.questionLocked;
  const canUseCard = gameState.status === "question" && team && !team.cardUsed;

  const handleAnswer = (answerId: "A" | "B" | "C" | "D" | "E") => {
    if (!team) {
      return;
    }
    socket.emit("leader:submitAnswer", { teamId: team.id, answerId });
    setMessage("Resposta enviada. Aguarde o resultado.");
  };

  const handleUseCard = () => {
    if (!team) {
      return;
    }
    socket.emit("leader:useCard", { teamId: team.id });
  };

  if (!team) {
    return (
      <div className="mx-auto flex min-h-screen max-w-3xl flex-col items-center justify-center px-4 py-10 text-center text-white">
        <div className="rounded-[32px] border border-white/10 bg-slate-950/70 p-8 shadow-glow backdrop-blur-xl">
          <h1 className="text-3xl font-semibold text-amber-300">Equipe não encontrada</h1>
          <p className="mt-4 text-slate-300">
            Verifique se a rota está correta e use /lider/equipe-1 até /lider/equipe-5.
          </p>
        </div>
      </div>
    );
  }

  const advantageActive =
    character?.advantageHouseIds.includes(gameState.currentQuestionId) ?? false;

  return (
    <div className="mx-auto flex min-h-screen max-w-screen-sm flex-col gap-6 px-4 py-6 text-white">
      <header className="rounded-[32px] border border-white/10 bg-slate-950/80 p-6 shadow-glow backdrop-blur-xl">
        <p className="text-sm uppercase tracking-[0.35em] text-slate-400">Acesso do Líder</p>
        <h1 className="mt-3 text-3xl font-semibold text-amber-300">{team.name}</h1>
        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          <div className="rounded-3xl bg-slate-900/90 p-4">
            <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Personagem</p>
            <p className="mt-2 text-lg font-semibold text-white">
              {character?.name ?? team.characterId}
            </p>
          </div>
          <div className="rounded-3xl bg-slate-900/90 p-4">
            <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Pontuação</p>
            <p className="mt-2 text-lg font-semibold text-amber-300">{team.score}</p>
          </div>
          <div className="rounded-3xl bg-slate-900/90 p-4">
            <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Confiança</p>
            <p className="mt-2 text-lg font-semibold text-cyan-300">{team.confidence}</p>
          </div>
        </div>
      </header>

      <div className="grid gap-6 lg:grid-cols-[1fr_0.9fr]">
        <div className="rounded-[32px] border border-white/10 bg-slate-950/80 p-6 shadow-glow backdrop-blur-xl">
          <CharacterCard character={character} />
          <CardPower card={card} used={team.cardUsed} />
        </div>

        <section className="rounded-[32px] border border-white/10 bg-slate-950/80 p-6 shadow-glow backdrop-blur-xl">
          <div className="mb-5 flex items-center justify-between gap-3">
            <div>
              <p className="text-sm uppercase tracking-[0.35em] text-slate-400">Estado</p>
              <p className="mt-2 text-2xl font-semibold text-white">
                {statusLabels[gameState.status]}
              </p>
            </div>
            <div className="rounded-full bg-slate-900/90 px-4 py-2 text-sm text-slate-200">
              Rodada {gameState.round}
            </div>
          </div>

          {question ? (
            <div className="space-y-4">
              <div>
                <p className="text-xs uppercase tracking-[0.35em] text-slate-400">Casa atual</p>
                <p className="mt-2 text-xl font-semibold text-amber-300">{question.house}</p>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-3xl bg-slate-900/90 p-4">
                  <p className="text-xs uppercase tracking-[0.35em] text-slate-400">Tema</p>
                  <p className="mt-2 text-base text-white">{question.theme}</p>
                </div>
                <div className="rounded-3xl bg-slate-900/90 p-4">
                  <p className="text-xs uppercase tracking-[0.35em] text-slate-400">Dificuldade</p>
                  <p className="mt-2 text-base text-white">{question.difficulty}</p>
                </div>
              </div>
              <div className="rounded-[32px] border border-white/10 bg-slate-900/90 p-5">
                <p className="text-base text-slate-300">{question.statement}</p>
              </div>
              <div className="rounded-[32px] border border-white/10 bg-slate-900/90 p-5 text-slate-200">
                {advantageActive ? (
                  <p>Vantagem ativa nesta casa: +2 pontos em resposta correta.</p>
                ) : (
                  <p>Sem vantagem da casa para o personagem atual.</p>
                )}
              </div>
              <AnswerButtons
                options={question.options}
                disabled={!canAnswer}
                onSelect={handleAnswer}
              />
            </div>
          ) : (
            <div className="rounded-[32px] border border-dashed border-slate-700 bg-slate-900/80 p-8 text-center text-slate-300">
              {gameState.status === "finished" ? (
                <div className="space-y-3">
                  <h2 className="text-2xl font-semibold text-amber-300">Resultado final</h2>
                  <p>Pontuação final: {team.score}</p>
                  <p>Confiança final: {team.confidence}</p>
                  <p>
                    Posição no ranking:{" "}
                    {gameState.finalRanking.findIndex((item) => item.id === team.id) + 1}
                  </p>
                  <p>Carta usada: {team.cardUsed ? "Sim" : "Não"}</p>
                  <p className="text-sm text-slate-400">
                    Verde: {team.stats.green} • Azul: {team.stats.blue} • Amarelo:{" "}
                    {team.stats.yellow} • Vermelho: {team.stats.red} • Não respondidas:{" "}
                    {team.stats.unanswered}
                  </p>
                </div>
              ) : (
                <p>Nenhuma pergunta carregada no momento.</p>
              )}
            </div>
          )}
        </section>
      </div>

      <section className="rounded-[32px] border border-white/10 bg-slate-950/80 p-6 shadow-glow backdrop-blur-xl">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-slate-400">Status da carta</p>
            <p className="mt-2 text-lg font-semibold text-amber-300">{card?.name ?? team.cardId}</p>
            <p className="mt-2 text-sm text-slate-300">{team.cardUsed ? "Usada" : "Disponível"}</p>
          </div>
          <button
            type="button"
            disabled={!canUseCard}
            onClick={handleUseCard}
            className="rounded-3xl bg-emerald-500 px-6 py-4 text-base font-semibold text-slate-950 transition hover:bg-emerald-400 disabled:cursor-not-allowed disabled:bg-slate-700"
          >
            Usar carta
          </button>
        </div>
        {team.currentCardRoll ? (
          <p className="mt-4 text-sm text-slate-300">
            Rolagem: {team.currentCardRoll} ({team.currentCardSuccess ? "Sucesso" : "Falha"})
          </p>
        ) : null}
      </section>

      <div className="rounded-[32px] border border-white/10 bg-slate-950/70 p-6 text-center text-slate-200 shadow-glow backdrop-blur-xl">
        <p>{message ?? "Use os controles do datashow para controlar a rodada."}</p>
      </div>
    </div>
  );
}

export default LiderPage;
