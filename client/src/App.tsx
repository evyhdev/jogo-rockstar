import { useEffect, useRef, useState } from "react";
import { Link, Navigate, Route, Routes, useNavigate, useParams } from "react-router-dom";
import { boardHouses, characters, getCharacter, getQuestion } from "./data/gameData";
import {
  ROUND_SECONDS, canUsePower, createGame, createTeam, getFinalLeak, getRanking, getSelectionTeams,
  getTeams, nextRound, selectCharacter, showResult, startCharacterSelection, startRound, submitAnswer, usePower,
} from "./game/gameEngine";
import { useGame } from "./hooks/useGame";
import { gameStore } from "./services/gameStore";
import type { GameState, OptionId, Team } from "./types/game.types";

const button = "rounded-xl px-5 py-3 font-bold transition disabled:cursor-not-allowed disabled:opacity-40";
const panel = "rounded-2xl border border-white/10 bg-slate-950/75 p-5 shadow-xl";
const makeId = (prefix: string) => `${prefix}-${Math.random().toString(36).slice(2, 8)}`;

function useCountdown(game: GameState | null) {
  const [, rerender] = useState(0);
  useEffect(() => {
    if (!game?.questionStartedAt) return;
    const interval = window.setInterval(() => rerender((value) => value + 1), 500);
    return () => window.clearInterval(interval);
  }, [game?.questionStartedAt]);
  return game?.questionStartedAt ? Math.max(0, ROUND_SECONDS - Math.floor((Date.now() - game.questionStartedAt) / 1000)) : ROUND_SECONDS;
}

function ErrorMessage({ message }: { message: string | null }) {
  return message ? <p className="rounded-xl border border-red-400/40 bg-red-500/10 p-3 text-sm text-red-200">{message}</p> : null;
}

function Home() {
  const navigate = useNavigate();
  const [room, setRoom] = useState("");
  const [leader, setLeader] = useState("");
  const [error, setError] = useState<string | null>(null);
  const createRoom = async () => {
    const gameId = Math.random().toString(36).slice(2, 7).toUpperCase();
    await gameStore.create(createGame(gameId));
    navigate(`/mestre/${gameId}`);
  };
  const joinRoom = async () => {
    try {
      const gameId = room.trim().toUpperCase();
      if (!gameId || !leader.trim()) throw new Error("Informe o código da sala e seu nome.");
      const teamId = makeId("guilda");
      await gameStore.mutate(gameId, (game) => {
        const teams = getTeams(game);
        if (game.phase !== "lobby") throw new Error("A partida já começou.");
        if (teams.length >= 5) throw new Error("A sala já possui cinco líderes.");
        game.teams ??= {};
        game.teams[teamId] = createTeam(teamId, leader.trim(), teams.length);
      });
      localStorage.setItem(`rockstar-team:${gameId}`, teamId);
      navigate(`/jogador/${gameId}/${teamId}`);
    } catch (cause) { setError(cause instanceof Error ? cause.message : "Não foi possível entrar."); }
  };
  return <main className="home-screen"><div className="home-content">
    <div className="grid gap-6 lg:grid-cols-[1.12fr_0.88fr]">
      <section className="home-hero"><div><p className="eyebrow">Operação Rockstar</p><h1>Protocolo Seguro</h1><p className="home-lead">Uma missão estratégica sobre COBIT, ITIL e segurança da informação. Proteja os dados sigilosos do reino antes que o vazamento chegue a 100%.</p><div className="home-highlights"><span>5 guildas</span><span>8 desafios</span><span>60s por rodada</span><span>1 poder por guilda</span></div></div><button className={`${button} home-master-button`} onClick={createRoom}>Criar sala como mestre</button></section>
      <section className="home-entry"><p className="eyebrow text-cyan-300">Entrada dos líderes</p><h2>Acessar pelo celular</h2><p>Use o código exibido pelo mestre e informe seu nome para representar uma guilda.</p><div className="mt-6 grid gap-4"><input className="home-input uppercase" placeholder="Código da sala" value={room} onChange={(event) => setRoom(event.target.value)} /><input className="home-input" placeholder="Nome do líder" value={leader} onChange={(event) => setLeader(event.target.value)} /><button className={`${button} bg-cyan-500 text-slate-950`} onClick={joinRoom}>Entrar na operação</button><ErrorMessage message={error} /></div></section>
    </div>
    <section className="home-rules"><div className="home-section-heading"><p className="eyebrow">Manual de campo</p><h2>Como funciona a operação</h2><p>O mestre conduz o jogo no datashow. Cada líder participa pelo próprio celular.</p></div><div className="home-rule-grid">
      <article className="home-rule-card"><b>01</b><h3>Prepare a guilda</h3><p>Entre na sala, jogue o dado e escolha um personagem quando chegar sua vez.</p></article>
      <article className="home-rule-card"><b>02</b><h3>Resolva os desafios</h3><p>O tabuleiro possui 8 perguntas. Cada rodada dura 60 segundos.</p></article>
      <article className="home-rule-card"><b>03</b><h3>Confirme a resposta</h3><p>Selecione uma alternativa e confirme o envio. Depois disso, a escolha não pode ser alterada.</p></article>
      <article className="home-rule-card"><b>04</b><h3>Use seu poder</h3><p>Cada personagem possui uma habilidade especial que pode ser usada uma única vez.</p></article>
    </div></section>
    <section className="home-guide-grid">
      <article className="home-guide-card"><p className="eyebrow">Medidor de vazamento</p><h2>Não deixe chegar a 100%</h2><div className="home-leak-track"><span /></div><div className="home-leak-scale"><span>0% Seguro</span><span>50% Perigo</span><span>100% Game Over</span></div><p>Respostas fracas ou não enviadas aumentam o vazamento. Ao atingir 100%, a guilda é eliminada da partida.</p></article>
      <article className="home-guide-card"><p className="eyebrow">Objetivo final</p><h2>Proteja o reino</h2><ul><li>Ganhe pontos com boas decisões.</li><li>Mantenha o vazamento sob controle.</li><li>Use o poder no momento certo.</li><li>Vença com estratégia e consistência.</li></ul></article>
    </section>
  </div></main>;
}

function Board({ game, moving = false, onRevealQuestion }: { game: GameState; moving?: boolean; onRevealQuestion?: () => void }) {
  const activePosition = game.phase === "finished" ? 10 : (getQuestion(game.currentRound)?.boardPosition ?? 1);
  const orbit = boardHouses.map((_, index) => {
    const angle = -90 + index * 36;
    const radians = (angle * Math.PI) / 180;
    const x = 50 + Math.cos(radians) * 34;
    const y = 50 + Math.sin(radians) * 34;
    return { x, y };
  });
  return <div className="board-shell"><div className="board-route"><svg className="board-track" viewBox="0 0 100 100" aria-hidden="true"><circle className="board-track-base" cx="50" cy="50" r="34" /></svg><div className="board-center"><p>Operação</p><b>Rockstar</b><span>Protocolo Seguro</span></div>{boardHouses.map((house, index) => {
    const position = index + 1, active = position === activePosition, canReveal = active && game.roundStage === "waiting" && Boolean(onRevealQuestion);
    return <button type="button" key={house} style={{ left: `${orbit[index].x}%`, top: `${orbit[index].y}%` }} className={`board-house ${active ? "is-active" : ""} ${canReveal ? "is-clickable" : ""} ${moving && active ? "is-departing" : ""}`} disabled={!canReveal} onClick={onRevealQuestion} aria-label={canReveal ? `Abrir pergunta da casa ${house}` : house}>
      <img src={`/assets/houses/${position}.png`} alt="" />
      {active ? <span className="board-marker" aria-label="Posição atual"><span>♜</span></span> : null}
    </button>;
  })}</div></div>;
}

function getAnswerQualityClass(quality: number | null | undefined) {
  if (quality === 100) return "is-ideal";
  if (quality === 70 || quality === 50) return "is-partial";
  return "is-wrong";
}

function Leak({ team }: { team: Team }) {
  return <span className={team.eliminated ? "text-red-300" : team.leakLevel >= 50 ? "text-amber-300" : "text-emerald-300"}>{team.eliminated ? "GAME OVER · 100% de vazamento" : `${team.leakLevel}% de vazamento`}</span>;
}

function StatBar({ label, value, tone }: { label: string; value: number; tone: "current" | "final" | "protection" }) {
  return <div className="guild-stat"><div className="guild-stat-label"><span>{label}</span><b>{value}%</b></div><div className="guild-stat-track"><span className={`guild-stat-fill is-${tone}`} style={{ width: `${Math.min(100, Math.max(0, value))}%` }} /></div></div>;
}

function GuildCard({ game, team }: { game: GameState; team: Team }) {
  return <div className={`guild-card ${team.eliminated ? "is-eliminated" : ""}`}><div className="guild-card-header"><div><p className="text-xs uppercase tracking-widest text-amber-300">{team.name}</p><p className="mt-1 font-bold">{getCharacter(team.characterId) ? `${getCharacter(team.characterId)?.emoji} ${getCharacter(team.characterId)?.name}` : team.leaderName}</p></div><b className="guild-score">{team.score}<span> pts</span></b></div>{game.phase === "lobby" ? <p className="mt-3 text-sm text-cyan-200">Dado: <b>{team.selectionRoll ?? "aguardando"}</b></p> : <div className="guild-stats"><StatBar label="Vazamento atual" value={team.leakLevel} tone="current" /><StatBar label="Projeção final" value={getFinalLeak(team)} tone="final" />{team.futureLeakReduction ? <StatBar label="Proteção ativa" value={team.futureLeakReduction} tone="protection" /> : null}{team.eliminated ? <p className="guild-game-over">GAME OVER · Guilda eliminada</p> : null}</div>}{game.roundStage === "question" && !team.eliminated ? <p className="guild-answer-state">{team.answerId ? "✓ Resposta enviada" : "Discutindo..."}</p> : null}</div>;
}

function PlayerStatus({ team }: { team: Team }) {
  return <section className={`${panel} player-status ${team.eliminated ? "is-eliminated" : ""}`}><div className="guild-card-header"><div><p className="eyebrow">Status da guilda</p><h2 className="mt-2 text-xl font-black text-amber-100">{team.name}</h2></div><b className="guild-score player-score">{team.score}<span> pts</span></b></div><div className="guild-stats"><StatBar label="Vazamento atual" value={team.leakLevel} tone="current" /><StatBar label="Projeção final" value={getFinalLeak(team)} tone="final" />{team.futureLeakReduction ? <StatBar label="Proteção ativa" value={team.futureLeakReduction} tone="protection" /> : null}{team.eliminated ? <p className="guild-game-over">GAME OVER · Guilda eliminada</p> : null}</div></section>;
}

function GameOver() {
  return <section className={`${panel} player-game-over`}><p className="eyebrow">Operação encerrada</p><h2>GAME OVER</h2><p>O nível de vazamento chegou a 100%. Sua guilda foi eliminada da partida.</p></section>;
}

function TeamGrid({ game }: { game: GameState }) {
  return <div className="grid gap-3 md:grid-cols-5">{getTeams(game).map((team) => <GuildCard game={game} team={team} key={team.id} />)}</div>;
}

function GuildSidebar({ game, side }: { game: GameState; side: "left" | "right" }) {
  const teams = getTeams(game), visibleTeams = side === "left" ? teams.slice(0, 3) : teams.slice(3);
  return <aside className={`guild-sidebar guild-sidebar-${side}`}><p className="eyebrow mb-3">Status das guildas</p><div className="grid gap-3">{visibleTeams.map((team) => <GuildCard game={game} team={team} key={team.id} />)}</div></aside>;
}

function HeroGallery({ game }: { game: GameState }) {
  const teams = getTeams(game);
  return <div className="hero-gallery">{characters.map((character) => {
    const selectedBy = teams.find((team) => team.characterId === character.id);
    const imageName = encodeURIComponent(`Herói - ${character.name}.png`);
    return <article className={`hero-gallery-card ${selectedBy ? "is-selected" : ""}`} key={character.id}><img src={`/assets/herois/${imageName}`} alt={`Descrição do personagem ${character.name}`} />{selectedBy ? <div className="hero-gallery-status"><b>Escolhido</b><span>{selectedBy.name}</span></div> : <div className="hero-gallery-status is-available"><b>Disponível</b><span>{character.name}</span></div>}</article>;
  })}</div>;
}

const diceFaces = ["", "⚀", "⚁", "⚂", "⚃", "⚄", "⚅"];

function DiceReveal({ leader, value }: { leader: string; value: number }) {
  return <div className="game-overlay"><div className="dice-reveal"><p className="eyebrow">O destino foi lançado</p><div className="rolling-die">{diceFaces[value]}</div><p className="mt-4 text-xl font-bold text-amber-100">{leader}</p><p className="mt-1 text-sm uppercase tracking-[0.3em] text-cyan-200">resultado: {value}</p></div></div>;
}

function Podium({ game }: { game: GameState }) {
  const ranking = getRanking(game), top = ranking.slice(0, 3), places = [top[1], top[0], top[2]];
  return <section className="podium-panel"><div className="podium-rays" /><p className="eyebrow">Missão concluída</p><h2 className="mt-2 text-4xl font-black text-amber-100">Reino Protegido</h2><p className="mt-2 text-slate-200">As guildas concluíram a Operação Rockstar.</p><div className="podium-stage">{places.map((team, index) => team ? <div className={`podium-place podium-place-${index + 1}`} key={team.id}><p className="podium-character">{getCharacter(team.characterId)?.emoji ?? "◆"}</p><p className="mt-2 text-sm font-black uppercase tracking-wider text-amber-100">{team.name}</p><p className="text-xs text-slate-300">{getCharacter(team.characterId)?.name}</p><div className="podium-step"><b>{index === 1 ? "1º" : index === 0 ? "2º" : "3º"}</b><span>{team.score} pts</span></div></div> : null)}</div><div className="mx-auto mt-6 max-w-3xl text-left">{ranking.map((team, index) => <p className="ranking-row" key={team.id}><b>{index + 1}º {team.name}</b><span>{team.score} pontos · {getFinalLeak(team)}% vazamento final</span></p>)}</div></section>;
}

function Master() {
  const { gameId } = useParams();
  const { game, loading } = useGame(gameId);
  const seconds = useCountdown(game);
  const [error, setError] = useState<string | null>(null);
  const [moving, setMoving] = useState(false);
  const [roundOverlay, setRoundOverlay] = useState<{ round: number; view: "house" | "question" } | null>(null);
  const [diceReveal, setDiceReveal] = useState<{ leader: string; value: number } | null>(null);
  const previousRolls = useRef<Record<string, number | null> | null>(null);
  const run = async (action: (draft: GameState) => void) => { try { if (gameId) await gameStore.mutate(gameId, action); setError(null); } catch (cause) { setError(cause instanceof Error ? cause.message : "Não foi possível atualizar."); } };
  useEffect(() => {
    if (!game) return;
    const rolls = Object.fromEntries(getTeams(game).map((team) => [team.id, team.selectionRoll]));
    if (previousRolls.current) {
      const rolledTeam = getTeams(game).find((team) => team.selectionRoll !== null && previousRolls.current?.[team.id] !== team.selectionRoll);
      if (rolledTeam?.selectionRoll) {
        setDiceReveal({ leader: rolledTeam.leaderName, value: rolledTeam.selectionRoll });
        const timeout = window.setTimeout(() => setDiceReveal(null), 1700);
        previousRolls.current = rolls;
        return () => window.clearTimeout(timeout);
      }
    }
    previousRolls.current = rolls;
  }, [game]);
  const advance = () => {
    if (moving) return;
    setMoving(true);
    setRoundOverlay(null);
    window.setTimeout(() => {
      void run(nextRound);
      window.setTimeout(() => setMoving(false), 650);
    }, 650);
  };
  if (loading) return <Centered text="Carregando sala..." />;
  if (!game) return <Centered text="Sala não encontrada." />;
  const teams = getTeams(game), selectionTeams = getSelectionTeams(game), question = getQuestion(game.currentRound);
  const overlayView = game.roundStage === "waiting" ? (roundOverlay?.round === game.currentRound ? roundOverlay.view : null) : "question";
  return <main className="master-screen"><div className="master-content"><header className="master-header"><div><p className="eyebrow">Painel do mestre</p><h1 className="mt-1 text-3xl font-black text-amber-100">Operação Rockstar</h1><p className="text-sm text-slate-300">Protocolo Seguro</p></div><div className="room-code"><p>SALA DA OPERAÇÃO</p><b>{game.id}</b></div></header><ErrorMessage message={error} />
    {diceReveal ? <DiceReveal leader={diceReveal.leader} value={diceReveal.value} /> : null}
    {game.phase === "lobby" ? <section className="master-panel"><p className="eyebrow">Convocação das guildas</p><h2 className="mt-2 text-3xl font-black text-amber-100">Preparação: {teams.length}/5</h2><p className="mt-2 text-slate-300">Compartilhe o código da sala. Cada líder deve entrar pelo celular e lançar seu dado.</p><div className="mt-6"><TeamGrid game={game} /></div><button className="master-button mt-6" disabled={teams.length !== 5 || teams.some((team) => team.selectionRoll === null)} onClick={() => run(startCharacterSelection)}>Iniciar escolha dos personagens</button></section> : null}
    {game.phase === "character-selection" ? <section className="master-panel"><p className="eyebrow">Ordem definida pelo destino</p><h2 className="mt-2 text-3xl font-black text-amber-100">Escolha dos personagens</h2><p className="mt-2 text-slate-200">Agora é a vez de <b className="text-amber-300">{selectionTeams[game.currentSelectionIndex]?.leaderName}</b>. As habilidades estão exibidas no telão para apoiar a decisão.</p><div className="mt-6 grid gap-3 sm:grid-cols-5">{selectionTeams.map((team, index) => <div className={`selection-card ${index === game.currentSelectionIndex ? "is-current" : ""}`} key={team.id}><p className="text-xs uppercase tracking-widest text-cyan-200">{index + 1}º · dado {team.selectionRoll}</p><p className="mt-2 font-bold">{team.leaderName}</p><p className="mt-1 text-sm text-amber-300">{getCharacter(team.characterId)?.name ?? "Aguardando escolha"}</p></div>)}</div><HeroGallery game={game} /></section> : null}
    {(game.phase === "playing" || game.phase === "finished") ? <>{game.phase === "finished" ? <Podium game={game} /> : <div className="master-game-layout"><GuildSidebar game={game} side="left" /><section className="master-panel board-panel"><div className="mb-4 flex items-end justify-between gap-4"><div><p className="eyebrow">Mapa do reino</p><h2 className="mt-1 text-2xl font-black text-amber-100">Trilha da operação</h2><p className="mt-1 text-sm text-slate-300">{game.roundStage === "waiting" && !overlayView ? "Clique na casa destacada para abrir a pergunta." : "A casa atual está em andamento."}</p></div><p className="text-sm text-slate-300">Casa {question?.boardPosition} de 10</p></div><div className="board-stage"><Board game={game} moving={moving} onRevealQuestion={() => setRoundOverlay({ round: game.currentRound, view: "house" })} />{overlayView === "house" ? <div className="board-overlay"><div className="house-reveal"><img src={`/assets/houses/${question?.boardPosition}.png`} alt={question?.house} /><p className="eyebrow mt-2">Casa {question?.boardPosition}</p><h2 className="mt-2 text-4xl font-black text-amber-100">{question?.house}</h2><button className="master-button mt-6" onClick={() => setRoundOverlay({ round: game.currentRound, view: "question" })}>Continuar</button></div></div> : null}{overlayView === "question" ? <div className="board-overlay question-overlay"><div className="question-overlay-content"><p className="eyebrow">{question?.difficulty} · {question?.theme}</p><h2 className="mt-2 text-3xl font-black text-amber-100">{question?.house}</h2><p className="mt-4 text-lg leading-8 text-slate-100">{question?.statement}</p><div className="mt-5 grid gap-2">{question?.options.map((option) => <div className={`question-option ${game.roundStage === "result" ? getAnswerQualityClass(option.quality) : ""}`} key={option.id}><b>{option.id})</b> {option.text}{game.roundStage === "result" ? <p className="mt-1 text-xs">Qualidade: {option.quality}%</p> : null}</div>)}</div>{game.roundStage === "result" ? <p className="result-callout"><b>Resposta ideal: {question?.correctOptionId}.</b> {question?.explanation}</p> : null}<div className="question-controls"><p className="text-xs uppercase tracking-widest text-cyan-200">Tempo da rodada</p><p className="mt-1 text-5xl font-black text-amber-300">{game.roundStage === "question" ? seconds : ROUND_SECONDS}<span className="text-xl">s</span></p><button className="master-button mt-4 w-full" disabled={game.roundStage !== "waiting"} onClick={() => run(startRound)}>Iniciar cronômetro</button><button className="master-button secondary mt-3 w-full" disabled={game.roundStage !== "question"} onClick={() => run(showResult)}>Mostrar resultados</button><button className="master-button accent mt-3 w-full" disabled={game.roundStage !== "result" || moving} onClick={advance}>{moving ? "Avançando..." : "Próxima casa"}</button></div></div></div> : null}</div></section><GuildSidebar game={game} side="right" /></div>}</> : null}
  </div>
  </main>;
}

function PowerActions({ game, team, run }: { game: GameState; team: Team; run: (action: (draft: GameState) => void) => void }) {
  const character = getCharacter(team.characterId), question = getQuestion(game.currentRound);
  const [selected, setSelected] = useState<OptionId[]>([]);
  if (!character || !question || !canUsePower(game, team)) return team.powerMessage ? <p className="mt-3 rounded-xl bg-cyan-500/10 p-3 text-sm text-cyan-200">{team.powerMessage}</p> : null;
  const invoke = (payload?: Parameters<typeof usePower>[2]) => run((draft) => usePower(draft, team.id, payload));
  if (character.powerEffect === "hint" || character.powerEffect === "halve-leak") return <button className={`${button} mt-4 w-full bg-amber-400 text-slate-950`} onClick={() => invoke()}>Usar {character.powerName}</button>;
  if (character.powerEffect === "inspect-option") return <div className="mt-4"><p className="text-sm">Escolha uma alternativa suspeita:</p><div className="mt-2 flex gap-2">{question.options.map((option) => <button className={`${button} bg-slate-800`} key={option.id} onClick={() => invoke({ optionId: option.id })}>{option.id}</button>)}</div></div>;
  if (character.powerEffect === "annul-zero-options") return <div className="mt-4"><p className="text-sm">Escolha duas alternativas para investigar:</p><div className="mt-2 flex gap-2">{question.options.map((option) => <button className={`${button} ${selected.includes(option.id) ? "bg-amber-400 text-slate-950" : "bg-slate-800"}`} key={option.id} onClick={() => setSelected((current) => current.includes(option.id) ? current.filter((id) => id !== option.id) : current.length < 2 ? [...current, option.id] : current)}>{option.id}</button>)}</div><button className={`${button} mt-3 bg-amber-400 text-slate-950`} disabled={selected.length !== 2} onClick={() => invoke({ optionIds: selected })}>Aplicar Tiro Preciso</button></div>;
  if (character.powerEffect === "bonus-question") return <div className="mt-4 rounded-xl bg-slate-900 p-3"><p className="font-bold">{question.bonusQuestion?.statement}</p><div className="mt-2 grid gap-2">{question.bonusQuestion?.options.map((option) => <button className={`${button} bg-amber-400 text-left text-slate-950`} key={option.id} onClick={() => invoke({ bonusAnswerId: option.id })}>{option.id}) {option.text}</button>)}</div></div>;
  return <button className={`${button} mt-4 w-full bg-amber-400 text-slate-950`} onClick={() => invoke()}>Usar {character.powerName}</button>;
}

function Player() {
  const { gameId, teamId } = useParams();
  const { game, loading } = useGame(gameId);
  const seconds = useCountdown(game);
  const [error, setError] = useState<string | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<OptionId | null>(null);
  const run = async (action: (draft: GameState) => void) => { try { if (gameId) await gameStore.mutate(gameId, action); setError(null); } catch (cause) { setError(cause instanceof Error ? cause.message : "Não foi possível enviar."); } };
  const team = game && teamId ? game.teams?.[teamId] : null, question = game ? getQuestion(game.currentRound) : null, character = getCharacter(team?.characterId ?? null);
  useEffect(() => setSelectedAnswer(null), [game?.currentRound]);
  if (loading) return <Centered text="Entrando na operação..." />; if (!game || !team || !teamId) return <Centered text="Acesso não encontrado." />;
  const activeSelector = game.selectionOrder[game.currentSelectionIndex], available = characters.filter((entry) => !getTeams(game).some((item) => item.characterId === entry.id));
  if ((game.phase === "playing" || game.phase === "finished") && team.eliminated) return <main className="mx-auto max-w-xl space-y-4 px-4 py-6"><header className={panel}><p className="text-xs text-cyan-300">{team.name}</p><h1 className="mt-2 text-2xl font-black">{team.leaderName}</h1>{character ? <p className="mt-2 text-amber-300">{character.emoji} {character.name}</p> : null}</header><ErrorMessage message={error} /><PlayerStatus team={team} /><GameOver /></main>;
  return <main className="mx-auto max-w-xl space-y-4 px-4 py-6"><header className={panel}><p className="text-xs text-cyan-300">{team.name}</p><h1 className="mt-2 text-2xl font-black">{team.leaderName}</h1>{character ? <p className="mt-2 text-amber-300">{character.emoji} {character.name}</p> : null}</header><ErrorMessage message={error} />
    {game.phase === "lobby" ? <section className={panel}><h2 className="text-xl font-bold">Preparação</h2>{team.selectionRoll ? <p className="mt-5 text-5xl font-black text-amber-300">{team.selectionRoll}</p> : <button className={`${button} mt-5 w-full bg-amber-400 text-slate-950`} onClick={() => run((draft) => { draft.teams[teamId].selectionRoll = Math.floor(Math.random() * 6) + 1; })}>Jogar dado</button>}<p className="mt-3 text-sm text-slate-300">Empates serão ordenados alfabeticamente.</p></section> : null}
    {game.phase === "character-selection" ? <section className={panel}><h2 className="text-xl font-bold">Escolha de personagem</h2>{activeSelector === team.id ? <div className="mt-4 grid gap-3">{available.map((entry) => <button className="rounded-xl bg-slate-900 p-4 text-left" key={entry.id} onClick={() => run((draft) => selectCharacter(draft, teamId, entry.id))}><b>{entry.emoji} {entry.name}</b><p className="mt-1 text-sm">{entry.specialty}</p><p className="mt-1 text-xs text-amber-300">{entry.powerName}: {entry.powerDescription}</p></button>)}</div> : <p className="mt-4">Aguarde {game.teams[activeSelector]?.leaderName}.</p>}</section> : null}
    {(game.phase === "playing" || game.phase === "finished") ? <><PlayerStatus team={team} />{character ? <section className={panel}><div className="rounded-xl bg-slate-900 p-3"><b>{character.powerName}</b><p className="mt-1 text-sm">{character.powerDescription}</p><p className="mt-2 text-xs text-amber-300">{team.powerUsed ? "Poder utilizado" : "Disponível uma vez"}</p></div></section> : null}{game.phase === "finished" ? <section className={panel}><h2 className="text-2xl font-bold text-amber-300">Reino Protegido</h2><p className="mt-3">Sua posição: {getRanking(game).findIndex((entry) => entry.id === team.id) + 1}º lugar.</p></section> : <section className={panel}><div className="flex justify-between"><p className="text-xs text-cyan-300">{question?.house}</p><p className="text-amber-300">{game.roundStage === "question" ? seconds : ROUND_SECONDS}s</p></div>{game.roundStage === "waiting" ? <p className="mt-4">Aguarde o mestre iniciar o cronômetro.</p> : null}{game.roundStage === "question" ? <><h2 className="mt-3">{question?.statement}</h2><PowerActions game={game} team={team} run={run} /><div className="mt-4 grid gap-2">{question?.options.map((option) => <button key={option.id} disabled={seconds === 0 || Boolean(team.answerId) || team.annulledOptionIds.includes(option.id)} className={`${button} text-left ${selectedAnswer === option.id ? "bg-amber-400 text-slate-950 ring-2 ring-amber-200" : "bg-slate-900"}`} onClick={() => setSelectedAnswer(option.id)}>{option.id}) {team.annulledOptionIds.includes(option.id) ? "Alternativa anulada pelo Tiro Preciso" : option.text}</button>)}</div>{team.answerId ? <p className="mt-4 rounded-xl bg-emerald-500/15 p-3 text-center font-bold text-emerald-200">Resposta {team.answerId} confirmada.</p> : <button className={`${button} mt-4 w-full bg-emerald-500 text-slate-950`} disabled={!selectedAnswer || seconds === 0 || team.annulledOptionIds.includes(selectedAnswer)} onClick={() => selectedAnswer && run((draft) => submitAnswer(draft, teamId, selectedAnswer))}>Confirmar resposta{selectedAnswer ? ` ${selectedAnswer}` : ""}</button>}</> : null}{game.roundStage === "result" ? <div className={`answer-result mt-4 ${getAnswerQualityClass(team.results[question!.id]?.quality)}`}><p>Qualidade: {team.results[question!.id]?.quality ?? 0}% · +{team.results[question!.id]?.scoreGained} ponto(s) · +{team.results[question!.id]?.leakGained}% vazamento</p><p className="mt-3 text-sm">{question?.explanation}</p><PowerActions game={game} team={team} run={run} /></div> : null}</section>}</> : null}
  </main>;
}

function Ranking({ game }: { game: GameState }) { return <section className={panel}><h2 className="text-2xl font-bold">Ranking final</h2>{getRanking(game).map((team, index) => <p className="mt-3 rounded-xl bg-slate-900 p-4" key={team.id}><b>{index + 1}º {team.name}</b> · <Leak team={team} /> · {team.score} pontos</p>)}</section>; }
function Centered({ text }: { text: string }) { return <main className="flex min-h-screen items-center justify-center p-4"><div className={panel}><p>{text}</p><Link className="mt-4 block text-cyan-300" to="/">Voltar</Link></div></main>; }
export default function App() { return <Routes><Route path="/" element={<Home />} /><Route path="/mestre/:gameId" element={<Master />} /><Route path="/jogador/:gameId/:teamId" element={<Player />} /><Route path="*" element={<Navigate to="/" />} /></Routes>; }
