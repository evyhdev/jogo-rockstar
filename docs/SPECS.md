# Specs - Operação Rockstar: Protocolo Seguro

## 1. Visão geral

O sistema conduz um jogo educacional de tabuleiro sobre COBIT, ITIL e segurança
da informação. Um mestre controla a partida no computador e cinco líderes
respondem pelos celulares.

| Papel | Dispositivo recomendado | Responsabilidade |
| --- | --- | --- |
| Mestre | Computador conectado ao projetor | Criar sala, acompanhar guildas, lançar perguntas, revelar resultados, avançar casas e anunciar ranking |
| Líder de guilda | Celular | Entrar na sala, jogar dado, escolher personagem, responder e usar poder especial |

## 2. Objetivos

### 2.1. Objetivo funcional

Permitir que o mestre conduza uma partida sincronizada enquanto cinco líderes
interagem simultaneamente usando a mesma sala.

### 2.2. Objetivo pedagógico

Trabalhar decisões relacionadas a:

- COBIT;
- ITIL;
- gestão de incidentes;
- SLA;
- gestão de mudanças;
- gestão de riscos;
- controle de acesso;
- auditoria e monitoramento;
- governança e orçamento;
- segurança da informação;
- proteção de propriedade intelectual.

## 3. Escopo

### 3.1. Implementado

- Sala com código aleatório de cinco caracteres.
- Entrada de até cinco líderes.
- Dado de seis lados para ordem de escolha.
- Ordenação alfabética em caso de empate no dado.
- Escolha sequencial de cinco entre seis personagens.
- Tabuleiro com dez casas.
- Oito desafios com cinco alternativas.
- Cronômetro de 60 segundos.
- Bloqueio de respostas atrasadas.
- Uma resposta por guilda em cada rodada.
- Pontuação automática.
- Medidor de Vazamento individual.
- Poder especial usado no máximo uma vez.
- Dado automático para ativação de poder.
- Ranking final automático.
- Sincronização entre dispositivos via Firebase.
- Testes locais em abas do mesmo navegador.

### 3.2. Fora do escopo atual

- Cadastro e login.
- Banco de dados relacional.
- Servidor próprio.
- Painel para editar perguntas.
- Expiração automática de salas.
- Reconexão por botão na página inicial.
- QR Code.
- Proteção por senha do painel do mestre.
- Autorização Firebase por usuário.

## 4. Fluxo funcional

### 4.1. Criação da sala

1. O mestre abre a página inicial.
2. Clica em `Criar sala como mestre`.
3. O sistema gera um código aleatório.
4. O mestre é redirecionado ao painel.
5. O código fica disponível para compartilhamento.

### 4.2. Entrada das guildas

1. O líder informa o código e seu nome.
2. O sistema valida a sala, a fase e a quantidade de vagas.
3. O sistema cria uma guilda de `Guilda 1` até `Guilda 5`.
4. O líder é redirecionado para sua rota.

### 4.3. Sorteio da ordem

1. Cada líder joga o dado.
2. Em caso de empate, os líderes empatados são ordenados alfabeticamente.
3. O mestre inicia a seleção após as cinco rolagens.
4. A ordem é definida pelo dado e, em empate, pelo nome.

### 4.4. Escolha de personagens

1. Cada líder escolhe no seu turno.
2. Personagens já utilizados não podem ser escolhidos novamente.
3. Após a quinta escolha, um personagem fica fora da partida.
4. A fase muda automaticamente para `playing`.

### 4.5. Rodadas

1. O mestre lança a pergunta.
2. O cronômetro inicia em 60 segundos.
3. Líderes discutem e enviam uma alternativa.
4. Após o prazo, novas respostas são rejeitadas.
5. O mestre revela o resultado.
6. Pontuação e vazamento são calculados.
7. Poderes posteriores ao resultado ficam disponíveis quando aplicáveis.
8. O mestre avança para a próxima casa.

### 4.6. Encerramento

Após a casa `Cerco ao GTA VI`, a partida termina. O mestre vê o ranking e cada
líder vê sua posição.

## 5. Máquina de estados

### 5.1. Fases da partida

| Fase | Significado | Próxima fase |
| --- | --- | --- |
| `lobby` | Entrada das guildas e rolagem inicial | `character-selection` |
| `character-selection` | Escolha sequencial dos personagens | `playing` |
| `playing` | Execução dos oito desafios | `finished` |
| `finished` | Ranking final | Estado terminal |

### 5.2. Estados da rodada

| Estado | Significado | Próximo estado |
| --- | --- | --- |
| `waiting` | Aguardando lançamento da pergunta | `question` |
| `question` | Pergunta aberta | `result` |
| `result` | Resultado calculado | `waiting` ou `finished` |

## 6. Regras do jogo

### 6.1. Tabuleiro

| Casa | Nome | Tipo |
| --- | --- | --- |
| 1 | Conselho do Reino | Introdução |
| 2 | Servidor em Chamas | Desafio |
| 3 | Relógio do SLA | Desafio |
| 4 | Portal da Mudança | Desafio |
| 5 | Mapa dos Riscos | Desafio |
| 6 | Portão de Acesso | Desafio |
| 7 | Olho da Auditoria | Desafio |
| 8 | Cofre do Reino | Desafio |
| 9 | Cerco ao GTA VI | Desafio final |
| 10 | Reino Protegido | Encerramento |

### 6.2. Pontos e vazamento

Perguntas comuns usam qualidade gradual:

| Qualidade | Vazamento | Pontos |
| --- | ---: | ---: |
| `100%` | `+0%` | `+2` |
| `70%` | `+10%` | `+1` |
| `50%` | `+20%` | `0` |
| `0%` | `+35%` | `0` |
| Sem resposta | `+40%` | `0` |

Casas de especialidade melhoram pontos e reduzem vazamento. `Cerco ao GTA VI`
usa penalidades próprias. Ao atingir `100%`, ocorre uma Explosão de Vazamento e
o excedente permanece como medidor atual.

### 6.4. Poderes

- Cada personagem usa seu poder no máximo uma vez.
- Cada poder possui uma interação própria conforme o personagem.
- A utilização é consumida assim que o efeito é acionado.

| Personagem | Especialidade | Casas de vantagem | Poder | Momento |
| --- | --- | --- | --- | --- |
| Mago | ITIL: SLA e mudanças | Relógio do SLA, Portal da Mudança | Ritual de Replanejamento: pergunta extra pode remover vazamento | Após resultado |
| Bruxo | COBIT: riscos e estratégia | Mapa dos Riscos, Cofre do Reino | Presságio Sombrio: revela dica conceitual | Antes da resposta |
| Elfo | Auditoria e monitoramento | Olho da Auditoria, Cerco ao GTA VI | Olhar Sentinela: informa se uma alternativa é `0%` | Antes da resposta |
| Anão | Ativos e acessos | Portão de Acesso, Cofre do Reino | Fortificação de Pedra: reduz em `15%` o próximo vazamento | Após resultado |
| Guerreiro | Incidentes e crises | Servidor em Chamas, Cerco ao GTA VI | Última Linha de Defesa: reduz vazamento pela metade | Após resultado |
| Arqueiro | Phishing e ameaças externas | Mapa dos Riscos, Portão de Acesso | Tiro Preciso: anula alternativas `0%` entre duas escolhidas | Antes da resposta |

### 6.5. Ranking

Critérios automáticos:

1. Menor Vazamento Final.
2. Maior Pontuação de Segurança.
3. Maior quantidade de respostas `100%`.
4. Menor quantidade de perguntas não respondidas.
5. Menor tempo médio de resposta.

Se ainda existir empate, a ordem anterior é preservada. O mestre pode usar
justificativa oral como critério complementar.

## 7. Desafios

| Rodada | Casa | Tema | Resposta correta resumida |
| --- | --- | --- | --- |
| 1 | Servidor em Chamas | ITIL: incidentes | Registrar, classificar impacto e restaurar |
| 2 | Relógio do SLA | ITIL: nível de serviço | Definir metas conforme criticidade e impacto |
| 3 | Portal da Mudança | ITIL: mudanças | Planejar, testar, aprovar e comunicar |
| 4 | Mapa dos Riscos | COBIT: riscos | Avaliar probabilidade, impacto e urgência |
| 5 | Portão de Acesso | COBIT e segurança | Aplicar menor privilégio, autenticação e revisões |
| 6 | Olho da Auditoria | COBIT: auditoria | Registrar eventos, monitorar e alertar |
| 7 | Cofre do Reino | COBIT: governança | Priorizar valor, ativos críticos e riscos |
| 8 | Cerco ao GTA VI | Segurança | Isolar acessos, responder e preservar evidências |

Textos completos: `client/src/data/gameData.ts`.

## 8. Requisitos funcionais

| ID | Requisito | Status |
| --- | --- | --- |
| RF-01 | O mestre deve conseguir criar uma sala | Implementado |
| RF-02 | A sala deve possuir código compartilhável | Implementado |
| RF-03 | Até cinco líderes devem conseguir entrar | Implementado |
| RF-04 | Líderes devem jogar o dado para definir ordem | Implementado |
| RF-05 | Empates no dado devem usar ordem alfabética | Implementado |
| RF-06 | Cada guilda deve escolher personagem exclusivo | Implementado |
| RF-07 | Um personagem deve ficar fora da partida | Implementado |
| RF-08 | O mestre deve controlar pergunta, resultado e avanço | Implementado |
| RF-09 | Cada rodada deve aceitar uma resposta por guilda | Implementado |
| RF-10 | Respostas após 60 segundos devem ser rejeitadas | Implementado |
| RF-11 | Pontos e vazamento devem ser calculados automaticamente | Implementado |
| RF-12 | Cada personagem deve possuir um poder único | Implementado |
| RF-13 | O poder deve ser consumido após tentativa | Implementado |
| RF-14 | O sistema deve exibir ranking final | Implementado |
| RF-15 | O sistema deve sincronizar dispositivos pela internet | Implementado com Firebase configurado |

## 9. Requisitos não funcionais

| ID | Requisito | Solução |
| --- | --- | --- |
| RNF-01 | Hospedagem sem servidor próprio | Build estático Vite |
| RNF-02 | Uso em celular | Interface responsiva |
| RNF-03 | Compatibilidade com hosting estático | `HashRouter` |
| RNF-04 | Tipagem | TypeScript com `strict: true` |
| RNF-05 | Concorrência básica | `ETag`, `If-Match` e novas tentativas |
| RNF-06 | Teste sem infraestrutura externa | Fallback `localStorage` |
| RNF-07 | Atualização próxima de tempo real | Polling Firebase de 800 ms |

## 10. Evoluções previstas

- QR Code da sala.
- Nome customizável para guildas.
- Reconexão na página inicial.
- Botão para reiniciar partida.
- Exclusão automática de salas antigas.
- Tela administrativa para desafios.
- Histórico de partidas.
- Métricas pedagógicas.
- Autenticação e autorização por papel.
- Backend autoritativo para publicação aberta.
