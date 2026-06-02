# Arquitetura - Operação Rockstar: Protocolo Seguro

## 1. Visão técnica

`Operação Rockstar: Protocolo Seguro` é uma aplicação web responsiva para
condução de um jogo educacional em sala de aula.

O projeto não possui servidor Node.js, API Express ou processo Socket.IO. Ele é
um frontend React compilado pelo Vite e hospedável como site estático.

Para sincronizar o computador do mestre com os celulares dos líderes, a
aplicação utiliza o Firebase Realtime Database como serviço externo.

## 2. Diagrama geral

```text
Computador do mestre              Celulares dos líderes
        |                                  |
        +---------- Website Vite ----------+
                           |
                           v
              Firebase Realtime Database
              /games/{codigoDaSala}
```

No modo de desenvolvimento sem Firebase:

```text
Abas do mesmo navegador
        |
        v
localStorage + BroadcastChannel
```

## 3. Stack

| Camada | Tecnologia | Uso |
| --- | --- | --- |
| Interface | React 18 | Renderização das telas |
| Linguagem | TypeScript | Tipagem e regras do sistema |
| Build | Vite 5 | Desenvolvimento e geração do site estático |
| Rotas | React Router com `HashRouter` | Navegação compatível com hospedagem estática |
| Estilo | Tailwind CSS | Layout responsivo |
| Estado remoto | Firebase Realtime Database via REST | Persistência e sincronização entre dispositivos |
| Estado local | `localStorage` e `BroadcastChannel` | Testes sem Firebase |

## 4. Decisões arquiteturais

### 4.1. Frontend estático

O Vite gera HTML, CSS e JavaScript em `client/dist`. A hospedagem não precisa
executar backend próprio.

### 4.2. Firebase Realtime Database

Uma hospedagem estática não mantém estado compartilhado entre dispositivos. O
Firebase funciona como canal externo para armazenar e sincronizar salas.

### 4.3. HashRouter

As URLs usam `#`, como `/#/mestre/ABCDE`. Isso evita erro `404` ao recarregar
rotas internas em hospedagens estáticas sem configuração de rewrite.

### 4.4. Fallback local

Sem `VITE_FIREBASE_DATABASE_URL`, o sistema usa `localStorage`. Esse modo permite
testar várias abas no mesmo navegador sem infraestrutura externa.

## 5. Sincronização

O frontend consulta a sala periodicamente:

| Modo | Intervalo | Persistência |
| --- | --- | --- |
| Firebase | 800 ms | `games/{gameId}` no Realtime Database |
| Local | 400 ms | `localStorage` |

No modo local, `BroadcastChannel` notifica outras abas assim que uma alteração é
salva.

No modo Firebase, atualizações usam `ETag` e `If-Match`. Esse controle otimista
reduz sobrescritas silenciosas quando duas ações ocorrem simultaneamente. Em caso
de conflito, o sistema tenta novamente até cinco vezes.

## 6. Estrutura de arquivos

```text
.
├── README.md
├── firebase-database.rules.json
├── package.json
├── docs/
│   ├── ARQUITETURA.md
│   ├── DOCUMENTACAO.md
│   └── SPECS.md
└── client/
    ├── .env.example
    ├── index.html
    ├── package.json
    ├── vite.config.ts
    ├── public/assets/houses/
    │   └── 1.webp ... 10.webp
    └── src/
        ├── App.tsx
        ├── main.tsx
        ├── index.css
        ├── data/gameData.ts
        ├── game/gameEngine.ts
        ├── hooks/useGame.ts
        ├── services/gameStore.ts
        └── types/game.types.ts
```

## 7. Responsabilidade dos módulos

| Arquivo | Responsabilidade |
| --- | --- |
| `client/src/App.tsx` | Telas, rotas, componentes visuais e ações dos usuários |
| `client/src/data/gameData.ts` | Casas, desafios, respostas, explicações e personagens |
| `client/src/game/gameEngine.ts` | Regras da partida, validações, pontuação, poderes e ranking |
| `client/src/services/gameStore.ts` | Leitura, criação, alteração e assinatura do estado compartilhado |
| `client/src/hooks/useGame.ts` | Hook React para acompanhar uma sala |
| `client/src/types/game.types.ts` | Contratos TypeScript do domínio |
| `firebase-database.rules.json` | Regras de acesso do Firebase Realtime Database |
| `client/public/assets/houses/` | Imagens das dez casas do tabuleiro |

## 8. Rotas

| Rota | Usuário | Finalidade |
| --- | --- | --- |
| `/#/` | Todos | Página inicial |
| `/#/mestre/{gameId}` | Mestre | Painel de condução |
| `/#/jogador/{gameId}/{teamId}` | Líder | Tela privada da guilda |

`gameId` é o código público da sala. `teamId` é gerado quando o líder entra e
fica incluído na URL da sua tela.

## 9. Modelo de dados

### 9.1. Estado da partida

```ts
interface GameState {
  id: string;
  createdAt: number;
  phase: "lobby" | "character-selection" | "playing" | "finished";
  roundStage: "waiting" | "question" | "result";
  currentRound: number;
  questionStartedAt: number | null;
  selectionOrder: string[];
  currentSelectionIndex: number;
  teams: Record<string, Team>;
}
```

### 9.2. Guilda

```ts
interface Team {
  id: string;
  name: string;
  leaderName: string;
  slotIndex: number;
  selectionRoll: number | null;
  characterId: string | null;
  score: number;
  leakLevel: number;
  leakExplosions: number;
  eliminated: boolean;
  answerId: "A" | "B" | "C" | "D" | "E" | null;
  answerSubmittedAt: number | null;
  powerUsed: boolean;
  powerMessage: string | null;
  futureLeakReduction: number;
  annulledOptionIds: ("A" | "B" | "C" | "D" | "E")[];
  results: Record<string, RoundResult>;
}
```

### 9.3. Resultado de rodada

```ts
interface RoundResult {
  answerId: "A" | "B" | "C" | "D" | "E" | null;
  quality: 100 | 70 | 50 | 0 | null;
  scoreGained: number;
  leakBeforePower: number;
  leakGained: number;
  specialtyBonus: boolean;
  unanswered: boolean;
  responseTimeMs: number | null;
  powerMessage?: string;
}
```

### 9.4. Persistência no Firebase

```text
games/
└── {gameId}/
    ├── id
    ├── createdAt
    ├── phase
    ├── roundStage
    ├── currentRound
    ├── questionStartedAt
    ├── selectionOrder
    ├── currentSelectionIndex
    └── teams/
        └── {teamId}/
```

O Firebase remove objetos vazios e campos `null`. O serviço `gameStore`
normaliza o estado recebido e repõe valores padrão antes de utilizá-lo.

## 10. Motor do jogo

As regras ficam centralizadas em `client/src/game/gameEngine.ts`.

| Função | Efeito |
| --- | --- |
| `createGame` | Cria uma sala vazia |
| `createTeam` | Cria uma guilda |
| `getTeams` | Retorna guildas ordenadas por posição |
| `startCharacterSelection` | Valida cinco guildas e define a ordem do dado, usando nome do líder como desempate |
| `selectCharacter` | Registra escolha exclusiva no turno correto |
| `startRound` | Limpa dados temporários e abre a pergunta |
| `submitAnswer` | Registra uma resposta dentro do prazo |
| `showResult` | Calcula pontos e vazamento |
| `nextRound` | Avança ou encerra a partida |
| `canUsePower` | Valida se o poder está disponível |
| `usePower` | Valida o contexto e aplica o efeito do poder |
| `getRanking` | Ordena guildas pelos critérios de vitória |

## 11. Regras do Firebase

O arquivo `firebase-database.rules.json` permite leitura e escrita pública:

```json
{
  "rules": {
    "games": {
      "$gameId": {
        ".read": true,
        ".write": true,
        ".validate": "newData.hasChildren(['id', 'createdAt', 'phase', 'roundStage', 'currentRound'])"
      }
    }
  }
}
```

Essa configuração serve para demonstração controlada em sala. Para publicação
aberta, consulte a seção de segurança em
[`DOCUMENTACAO.md`](DOCUMENTACAO.md#8-segurança-e-limitações).
