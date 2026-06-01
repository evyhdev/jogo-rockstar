# Funcionamento Atual do Jogo - Documento para Revisão

## 1. Finalidade deste documento

Este documento descreve como o jogo funciona atualmente no sistema. Ele deve ser
usado como base para revisar e solicitar alterações futuras.

Ao editar este arquivo:

- altere diretamente as regras que deseja mudar;
- adicione observações onde uma regra precisar de esclarecimento;
- mantenha explícitos valores como quantidade de equipes, tempo, pontos e
  condições de uso dos poderes;
- informe se uma mudança é obrigatória ou apenas uma sugestão.

Depois da revisão, o código poderá ser atualizado para corresponder à nova versão
deste documento.

## 2. Resumo da partida atual

`Operação Rockstar: Protocolo Seguro` é um jogo educacional de tabuleiro sobre
COBIT, ITIL e segurança da informação.

A partida possui:

| Item         | Funcionamento atual                                    |
| ------------ | ------------------------------------------------------ |
| Mestre       | 1 pessoa conduzindo a partida pelo computador          |
| Guildas      | Exatamente 5 guildas para iniciar                      |
| Líderes      | 1 líder por guilda, acessando pelo celular             |
| Personagens  | 6 disponíveis; 5 escolhidos e 1 fica fora              |
| Tabuleiro    | 10 casas                                               |
| Desafios     | 8 perguntas                                            |
| Alternativas | 5 por pergunta: `A`, `B`, `C`, `D`, `E`                |
| Tempo        | 60 segundos por pergunta                               |
| Respostas    | 1 resposta por guilda em cada pergunta                 |
| Poderes      | 1 tentativa de poder por guilda durante toda a partida |
| Encerramento | Ranking após a oitava pergunta                         |

## 3. Papéis

### 3.1. Mestre

O mestre utiliza o computador, preferencialmente conectado ao projetor. Ele:

1. Cria a sala.
2. Compartilha o código com os líderes.
3. Acompanha a entrada das cinco guildas.
4. Inicia a seleção dos personagens quando não há empates no dado.
5. Lança cada pergunta.
6. Revela o resultado.
7. Avança para a próxima casa.
8. Apresenta o ranking final.

### 3.2. Líder de guilda

Cada líder utiliza seu celular. Ele:

1. Informa o código da sala e seu nome.
2. Recebe uma guilda automática.
3. Joga o dado para definir a ordem da escolha.
4. Escolhe o personagem no seu turno.
5. Responde às perguntas.
6. Usa o poder do personagem quando o sistema permitir.

## 4. Entrada na sala

### 4.1. Criação

O mestre clica em `Criar sala como mestre`. O sistema gera um código aleatório
de cinco caracteres, como:

```text
ABCDE
```

### 4.2. Entrada dos líderes

Cada líder informa:

- código da sala;
- nome do líder.

O sistema cria automaticamente:

| Ordem de entrada | Guilda atribuída |
| ---------------- | ---------------- |
| 1º líder         | Guilda 1         |
| 2º líder         | Guilda 2         |
| 3º líder         | Guilda 3         |
| 4º líder         | Guilda 4         |
| 5º líder         | Guilda 5         |

Não é possível entrar depois que:

- cinco guildas já foram preenchidas; ou
- a partida saiu do lobby.

## 5. Sorteio da ordem de escolha

1. Cada líder clica em `Jogar dado`.
2. O sistema gera automaticamente um número de `1` a `6`.
3. O maior número escolhe o personagem primeiro.
4. A ordem continua do maior para o menor valor.
5. Se dois ou mais líderes empatarem, a ordem entre eles será alfabética.
6. A seleção pode começar quando os cinco líderes tiverem jogado o dado.

Exemplo:

| Líder             | Dado | Ordem |
| ----------------- | ---- | ----- |
| Líder da Guilda 1 | 6    | 1º    |
| Líder da Guilda 3 | 5    | 2º    |
| Líder da Guilda 2 | 4    | 3º    |
| Líder da Guilda 5 | 3    | 4º    |
| Líder da Guilda 4 | 2    | 5º    |

## 6. Escolha dos personagens

Os personagens são escolhidos um por vez, seguindo a ordem definida pelo dado.

Regras atuais:

1. O líder só consegue escolher quando chega seu turno.
2. Cada personagem pode pertencer a apenas uma guilda.
3. Após a quinta escolha, um personagem fica fora da partida.
4. Ao terminar a seleção, o sistema inicia a etapa das perguntas.

## 7. Personagens e poderes

### 7.1. Regras gerais dos poderes

- Cada guilda pode tentar usar seu poder uma única vez durante a partida.
- O botão só aparece quando o contexto permite a utilização.

### 7.2. Mago

| Item            | Funcionamento atual                                                                                                                 |
| --------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| Especialidade   | ITIL: SLA e mudanças                                                                                                                |
| Casas com bônus | Relógio do SLA; Portal da Mudança                                                                                                   |
| Poder           | Ritual de Replanejamento                                                                                                            |
| Momento         | Depois de errar uma pergunta em casa compatível                                                                                     |
| Efeito          | A guilda pode responder uma pergunta extra mais simples sobre o mesmo tema. Se acertar, remove o vazamento recebido naquela rodada. |

### 7.3. Bruxo

| Item            | Funcionamento atual                                                                 |
| --------------- | ----------------------------------------------------------------------------------- |
| Especialidade   | COBIT: riscos e estratégia                                                          |
| Casas com bônus | Mapa dos Riscos; Cofre do Reino                                                     |
| Poder           | Presságio Sombrio                                                                   |
| Momento         | Antes de responder qualquer pergunta                                                |
| Efeito          | A guilda vê uma dica sobre o conceito da pergunta, sem revelar alternativa correta. |

### 7.4. Elfo

| Item            | Funcionamento atual                                                                                            |
| --------------- | -------------------------------------------------------------------------------------------------------------- |
| Especialidade   | Auditoria e monitoramento                                                                                      |
| Casas com bônus | Olho da Auditoria; Cerco ao GTA VI                                                                             |
| Poder           | Olhar Sentinela                                                                                                |
| Momento         | Antes da resposta final em casa compatível                                                                     |
| Efeito          | A guilda pode marcar uma alternativa como “suspeita”. O sistema informa apenas se essa alternativa é 0% ou não |

### 7.5. Anão

| Item            | Funcionamento atual                                        |
| --------------- | ---------------------------------------------------------- |
| Especialidade   | Ativos e acessos                                           |
| Casas com bônus | Portão de Acesso; Cofre do Reino                           |
| Poder           | Fortificação de Pedra                                      |
| Momento         | Depois de acertar Portão de Acesso ou Cerco ao GTA VI      |
| Efeito          | O próximo vazamento recebido pela guilda é reduzido em 15% |

Observação: atualmente o poder do Anão pode ser utilizado em `Cerco ao GTA VI`,
embora essa casa não esteja na lista de casas com bônus do personagem.

### 7.6. Guerreiro

| Item            | Funcionamento atual                                     |
| --------------- | ------------------------------------------------------- |
| Especialidade   | Incidentes e crises                                     |
| Casas com bônus | Servidor em Chamas; Cerco ao GTA VI                     |
| Poder           | Última Linha de Defesa                                  |
| Momento         | Depois que a guilda errar uma pergunta em qualquer casa |
| Efeito          | Reduz o vazamento da rodada pela metade                 |

### 7.7. Arqueiro

| Item            | Funcionamento atual                                                            |
| --------------- | ------------------------------------------------------------------------------ |
| Especialidade   | Phishing e ameaças externas                                                    |
| Casas com bônus | Mapa dos Riscos; Portão de Acesso                                              |
| Poder           | Tiro Preciso                                                                   |
| Momento         | Antes de responder em Mapa dos Riscos ou Portão de Acesso                      |
| Efeito          | A guilda pode escolher duas alternativas. Se alguma dela for 0%, ela é anulada |

## 8. Tabuleiro

| Casa | Nome               | Funcionamento atual        |
| ---- | ------------------ | -------------------------- |
| 1    | Conselho do Reino  | Casa inicial, sem pergunta |
| 2    | Servidor em Chamas | Pergunta 1                 |
| 3    | Relógio do SLA     | Pergunta 2                 |
| 4    | Portal da Mudança  | Pergunta 3                 |
| 5    | Mapa dos Riscos    | Pergunta 4                 |
| 6    | Portão de Acesso   | Pergunta 5                 |
| 7    | Olho da Auditoria  | Pergunta 6                 |
| 8    | Cofre do Reino     | Pergunta 7                 |
| 9    | Cerco ao GTA VI    | Pergunta 8 e desafio final |
| 10   | Reino Protegido    | Encerramento e ranking     |

## 9. Funcionamento de cada rodada

Para cada pergunta:

1. O mestre clica em `Lançar pergunta`.
2. O sistema inicia os 60 segundos.
3. Cada guilda discute internamente.
4. O líder envia uma alternativa pelo celular.
5. A resposta não pode ser alterada depois do envio.
6. Após 60 segundos, novas respostas são rejeitadas.
7. O mestre clica em `Revelar resultado`.
8. O sistema calcula pontos e vazamento.
9. Poderes disponíveis após o resultado podem ser utilizados.
10. O mestre clica em `Próxima casa`.

Observação: o mestre pode revelar o resultado antes de os 60 segundos acabarem.
O sistema também permite revelar enquanto ainda existem guildas sem resposta.

## 11. Medidor de Vazamento

Cada guilda possui um Medidor de Vazamento individual, representado em porcentagem.

| Faixa     | Situação              |
| --------- | --------------------- |
| 0% a 24%  | Seguro                |
| 25% a 49% | Alerta                |
| 50% a 74% | Perigo                |
| 75% a 99% | Crítico               |
| 100%      | Explosão de Vazamento |

Quando uma guilda atinge ou ultrapassa 100%, ocorre uma Explosão de Vazamento.
A explosão é registrada e o medidor continua a partir do excedente.

Exemplo:

80% de vazamento + 35% de penalidade = 115%

Resultado:

- 1 Explosão de Vazamento;
- Medidor atual em 15%;
- Vazamento Final acumulado de 115%.

### 11.1. Cálculo do Vazamento Final

O Vazamento Final é calculado da seguinte forma:

Vazamento Final = Explosões × 100 + Vazamento atual

Vence a guilda com o menor Vazamento Final acumulado.

### 11.2. Critérios de desempate

Em caso de empate no Vazamento Final, os critérios são:

1. Maior número de Pontos de Segurança;
2. Maior número de respostas 100% corretas;
3. Menor número de perguntas não respondidas;
4. Menor tempo médio de resposta.

# Banco de Questões — Operação Rockstar: Protocolo Seguro

## Lógica das alternativas

Cada questão possui 5 alternativas com níveis diferentes de qualidade.

| Tipo de resposta             | Qualidade | Significado                                             |
| ---------------------------- | --------: | ------------------------------------------------------- |
| Resposta ideal               |      100% | Alternativa completamente correta                       |
| Resposta boa, mas incompleta |       70% | Alternativa parcialmente correta                        |
| Resposta fraca               |       50% | Alternativa com pequena parte correta, mas insuficiente |
| Resposta errada              |        0% | Alternativa incorreta ou perigosa                       |
| Resposta errada              |        0% | Alternativa incorreta ou perigosa                       |

---

## Tabela de efeitos — Pergunta comum

| Qualidade da resposta | Vazamento recebido | Pontos de Segurança |
| --------------------- | -----------------: | ------------------: |
| 100% correta          |                +0% |                  +2 |
| 70% correta           |               +10% |                  +1 |
| 50% correta           |               +20% |                   0 |
| 0% correta            |               +35% |                   0 |
| Não responder         |               +40% |                   0 |

---

## Tabela de efeitos — Casa de bônus do personagem

Quando a guilda responde em uma casa compatível com a especialidade do personagem:

| Qualidade da resposta | Vazamento recebido | Pontos de Segurança |
| --------------------- | -----------------: | ------------------: |
| 100% correta          |                +0% |                  +3 |
| 70% correta           |                +5% |                  +2 |
| 50% correta           |               +15% |                  +1 |
| 0% correta            |               +30% |                   0 |
| Não responder         |               +40% |                   0 |

---

## Tabela de efeitos — Cerco ao GTA VI

A casa **Cerco ao GTA VI** representa uma crise crítica, por isso possui penalidades maiores.

| Qualidade da resposta | Vazamento recebido | Pontos de Segurança |
| --------------------- | -----------------: | ------------------: |
| 100% correta          |                +0% |                  +3 |
| 70% correta           |               +15% |                  +1 |
| 50% correta           |               +30% |                   0 |
| 0% correta            |               +50% |                   0 |
| Não responder         |               +60% |                   0 |

Se o personagem possuir bônus em **Cerco ao GTA VI**, o vazamento recebido nessa casa é reduzido em **10%**.

---

# Questões

## Casa: Servidor em Chamas — Fácil — ITIL: Gestão de Incidentes

**Casa:** Servidor em Chamas  
**Tema:** Gestão de Incidentes  
**Dificuldade:** Fácil

### Pergunta

Durante a patrulha das guildas pelo Reino Rockstar, o Servidor em Chamas começa a falhar. Os desenvolvedores não conseguem acessar documentos internos do projeto GTA VI, e vários chamados começam a chegar ao Mestre da Operação.

A situação ainda não indica vazamento, mas está prejudicando o funcionamento dos serviços de TI.

Qual deve ser a melhor primeira atitude da equipe?

### Alternativas

| Letra | Alternativa                                                                                                                              | Qualidade | Justificativa                                                                                                                                                  |
| ----- | ---------------------------------------------------------------------------------------------------------------------------------------- | --------: | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| A     | Desligar todos os sistemas do Reino Rockstar sem análise, comunicação ou priorização.                                                    |        0% | Está errada porque uma ação extrema sem análise pode piorar o impacto, interromper serviços que ainda funcionam e não segue uma gestão adequada de incidentes. |
| B     | Tentar restaurar o serviço rapidamente e depois registrar o ocorrido, mesmo que a análise de impacto fique incompleta.                   |       70% | Está parcialmente correta porque busca restaurar o serviço, que é importante no ITIL, mas falha ao deixar o registro e a análise de impacto em segundo plano.  |
| C     | Registrar o incidente, avaliar impacto e urgência, priorizar o atendimento e iniciar a restauração do serviço o mais rápido possível.    |      100% | É a melhor resposta porque segue a lógica da gestão de incidentes: registrar, classificar, priorizar e restaurar o serviço com o menor impacto possível.       |
| D     | Ignorar o problema, pois falhas em servidores são normais e costumam voltar sozinhas.                                                    |        0% | Está errada porque ignorar uma falha crítica aumenta o risco de indisponibilidade, perda de controle e possível agravamento do incidente.                      |
| E     | Avisar os usuários que o sistema está indisponível e esperar a equipe técnica identificar a causa sem registrar formalmente o incidente. |       50% | Tem uma pequena parte correta porque comunica a indisponibilidade, mas é fraca porque não registra, não prioriza e não controla formalmente o incidente.       |

**Resposta ideal:** C

---

## Casa: Relógio do SLA — Fácil — ITIL: SLA

**Casa:** Relógio do SLA  
**Tema:** SLA  
**Dificuldade:** Fácil

### Pergunta

Na casa Relógio do SLA, o relógio mágico do Reino começa a contar o tempo. Um serviço crítico usado para compartilhar materiais sigilosos do GTA VI ficou indisponível.

O Conselho do Reino lembra que existe um acordo de nível de serviço definindo prazos e prioridades de atendimento.

O que a equipe deve considerar para tomar uma boa decisão?

### Alternativas

| Letra | Alternativa                                                                                                                             | Qualidade | Justificativa                                                                                                                                 |
| ----- | --------------------------------------------------------------------------------------------------------------------------------------- | --------: | --------------------------------------------------------------------------------------------------------------------------------------------- |
| A     | Verificar apenas o prazo do SLA e tentar resolver rápido, mesmo sem avaliar corretamente o impacto para o negócio.                      |       70% | Está parcialmente correta porque considera o SLA e tenta agir rápido, mas é incompleta por ignorar a criticidade e o impacto real no negócio. |
| B     | Alterar o SLA depois da falha para evitar que a equipe seja cobrada.                                                                    |        0% | Está errada porque manipular o SLA após a falha quebra a confiança, prejudica a governança e não resolve o problema do serviço.               |
| C     | Resolver quando a equipe tiver tempo, considerando o SLA apenas como uma referência informal.                                           |       50% | Tem pouca validade porque reconhece a existência do SLA, mas erra ao tratá-lo como algo opcional e sem prioridade.                            |
| D     | Verificar o SLA acordado, analisar a criticidade do serviço, priorizar conforme impacto no negócio e acompanhar o prazo de restauração. |      100% | É a melhor resposta porque combina cumprimento de SLA, priorização por impacto e controle do tempo de restauração do serviço.                 |
| E     | Atender primeiro os chamados mais simples para limpar a fila, mesmo que o serviço crítico continue parado.                              |        0% | Está errada porque prioriza facilidade em vez de impacto no negócio, deixando um serviço crítico indisponível.                                |

**Resposta ideal:** D

---

## Casa: Portão de Acesso — Fácil — COBIT: Controle de Acesso

**Casa:** Portão de Acesso  
**Tema:** Controle de Acesso  
**Dificuldade:** Fácil

### Pergunta

Ao chegar no Portão de Acesso, um novo membro do Reino Rockstar pede entrada nos repositórios do projeto GTA VI.

Ele afirma que precisa “de acesso a tudo” para trabalhar mais rápido. Porém, esses repositórios guardam código-fonte, documentos internos e arquivos estratégicos.

Qual decisão está mais alinhada à segurança e ao COBIT?

### Alternativas

| Letra | Alternativa                                                                                                                 | Qualidade | Justificativa                                                                                                                                        |
| ----- | --------------------------------------------------------------------------------------------------------------------------- | --------: | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| A     | Compartilhar a senha de outro funcionário para acelerar o início das atividades.                                            |        0% | Está errada porque compartilhamento de senha elimina rastreabilidade, enfraquece o controle de acesso e aumenta o risco de uso indevido.             |
| B     | Conceder apenas as permissões necessárias para a função, com autenticação adequada, registro de acesso e revisão periódica. |      100% | É a melhor resposta porque aplica o princípio do menor privilégio, preserva rastreabilidade e protege ativos críticos.                               |
| C     | Dar acesso temporário amplo para facilitar o trabalho, prometendo remover depois.                                           |       50% | Tem uma intenção operacional, mas é arriscada porque acesso amplo, mesmo temporário, pode expor informações sensíveis se não houver controle rígido. |
| D     | Liberar acesso total ao repositório, pois todos da empresa fazem parte do mesmo projeto.                                    |        0% | Está errada porque pertencer à organização não significa precisar de acesso total aos ativos críticos.                                               |
| E     | Conceder acesso aos arquivos necessários, mas revisar permissões apenas quando algum problema acontecer.                    |       70% | Está parcialmente correta porque limita o acesso aos arquivos necessários, mas falha por não prever revisão periódica e controle preventivo.         |

**Resposta ideal:** B

---

## Casa: Portal da Mudança — Média — ITIL: Gestão de Mudanças

**Casa:** Portal da Mudança  
**Tema:** Gestão de Mudanças  
**Dificuldade:** Média

### Pergunta

No Portal da Mudança, a equipe descobre que as permissões do repositório principal do GTA VI estão mal configuradas.

Uma mudança precisa ser feita para corrigir a falha. Porém, se a alteração for feita de forma apressada, pode bloquear desenvolvedores importantes ou causar indisponibilidade no ambiente.

Qual é a melhor decisão?

### Alternativas

| Letra | Alternativa                                                                                                                                  | Qualidade | Justificativa                                                                                                                                                 |
| ----- | -------------------------------------------------------------------------------------------------------------------------------------------- | --------: | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| A     | Permitir que qualquer desenvolvedor altere permissões quando achar necessário.                                                               |        0% | Está errada porque mudanças sem controle aumentam risco de falhas, indisponibilidade e perda de rastreabilidade.                                              |
| B     | Fazer a mudança diretamente porque o objetivo é melhorar a segurança, documentando somente depois.                                           |       50% | Tem uma intenção positiva, mas é fraca porque segurança não justifica mudança descontrolada; documentação tardia pode deixar riscos e impactos sem avaliação. |
| C     | Registrar e aprovar rapidamente a mudança, mas sem detalhar completamente o plano de retorno caso algo dê errado.                            |       70% | Está parcialmente correta porque registra e aprova a mudança, mas ainda é incompleta por não prever adequadamente um plano de retorno.                        |
| D     | Evitar qualquer mudança, mesmo com falha de segurança conhecida, para não gerar trabalho adicional.                                          |        0% | Está errada porque manter uma falha conhecida sem tratamento aumenta o risco de vazamento e compromete a segurança do ambiente.                               |
| E     | Registrar a mudança, avaliar riscos e impactos, obter aprovação adequada, planejar execução, comunicar envolvidos e prever plano de retorno. |      100% | É a melhor resposta porque segue uma gestão de mudanças estruturada, reduz riscos e evita impactos desnecessários no serviço.                                 |

**Resposta ideal:** E

---

## Casa: Mapa dos Riscos — Média — COBIT: Gestão de Riscos

**Casa:** Mapa dos Riscos  
**Tema:** Gestão de Riscos  
**Dificuldade:** Média

### Pergunta

No Mapa dos Riscos, o Bruxo do Reino identifica três ameaças contra a Rockstar: mensagens falsas tentando enganar funcionários, acesso remoto sem proteção forte e ausência de monitoramento adequado dos logs.

Todas parecem importantes, mas os recursos do Reino são limitados.

Como a equipe deve priorizar as ações?

### Alternativas

| Letra | Alternativa                                                                                                                                | Qualidade | Justificativa                                                                                                                                     |
| ----- | ------------------------------------------------------------------------------------------------------------------------------------------ | --------: | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| A     | Avaliar probabilidade, impacto e urgência de cada risco, considerando os ativos mais críticos e o alinhamento com os objetivos do negócio. |      100% | É a melhor resposta porque prioriza riscos de forma estruturada, considerando impacto, chance de ocorrer, urgência e valor dos ativos protegidos. |
| B     | Ignorar os riscos enquanto não ocorrer um novo vazamento.                                                                                  |        0% | Está errada porque gestão de riscos deve ser preventiva, não apenas reativa após o dano acontecer.                                                |
| C     | Começar pelo risco mais fácil de resolver, mesmo que ele não seja o mais crítico.                                                          |       50% | Tem pouca validade porque pode gerar alguma melhoria rápida, mas não garante que os riscos mais perigosos sejam tratados primeiro.                |
| D     | Priorizar os riscos que parecem mais graves, considerando impacto, mas sem uma análise estruturada de probabilidade e urgência.            |       70% | Está parcialmente correta porque considera gravidade e impacto, mas é incompleta por não fazer uma análise mais organizada dos riscos.            |
| E     | Escolher aleatoriamente um risco, pois todos são importantes do mesmo jeito.                                                               |        0% | Está errada porque riscos não devem ser tratados por sorte; eles precisam ser avaliados e priorizados de acordo com impacto e probabilidade.      |

**Resposta ideal:** A

---

## Casa: Olho da Auditoria — Média — COBIT: Auditoria e Monitoramento

**Casa:** Olho da Auditoria  
**Tema:** Auditoria e Monitoramento  
**Dificuldade:** Média

### Pergunta

Ao passar pelo Olho da Auditoria, o Elfo percebe acessos incomuns ao repositório do GTA VI durante a madrugada.

Os acessos vieram de uma conta válida, mas em horário estranho e a partir de um local diferente do habitual.

Ainda não há certeza de invasão, mas o comportamento é suspeito.

Qual é a melhor resposta?

### Alternativas

| Letra | Alternativa                                                                                                                                    | Qualidade | Justificativa                                                                                                                                                     |
| ----- | ---------------------------------------------------------------------------------------------------------------------------------------------- | --------: | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| A     | Desativar o monitoramento para não gerar alertas excessivos.                                                                                   |        0% | Está errada porque desativar o monitoramento reduz a capacidade de detectar ameaças e aumenta o risco de vazamentos.                                              |
| B     | Verificar os logs principais e trocar algumas senhas, mas sem investigar profundamente a origem dos acessos.                                   |       70% | Está parcialmente correta porque consulta logs e toma uma ação inicial, mas é incompleta por não investigar a causa e não registrar evidências de forma adequada. |
| C     | Analisar logs, verificar usuários e permissões, investigar comportamento suspeito, registrar evidências e reforçar controles de monitoramento. |      100% | É a melhor resposta porque combina auditoria, monitoramento, investigação, rastreabilidade e melhoria dos controles.                                              |
| D     | Perguntar aos usuários se alguém acessou o sistema e aguardar novas ocorrências antes de agir.                                                 |       50% | Tem pouca validade porque ouvir os usuários pode ajudar, mas esperar novas ocorrências é arriscado e não substitui análise de logs e evidências.                  |
| E     | Apagar os logs para evitar exposição do incidente.                                                                                             |        0% | Está errada porque apagar logs destrói evidências, impede auditoria e dificulta a investigação do possível incidente.                                             |

**Resposta ideal:** C

---

## Casa: Cerco ao GTA VI — Difícil — COBIT + ITIL: Resposta a Incidente Crítico

**Casa:** Cerco ao GTA VI  
**Tema:** Resposta a Incidente Crítico  
**Dificuldade:** Difícil

### Pergunta

Na casa Cerco ao GTA VI, o Reino Rockstar sofre uma tentativa final de ataque.

Há indícios de engenharia social, acesso indevido a uma conta interna, falha em um serviço importante e possível movimentação de arquivos sigilosos.

A equipe precisa agir rápido, mas sem perder o controle da situação.

Qual decisão combina melhor COBIT e ITIL?

### Alternativas

| Letra | Alternativa                                                                                                                                                           | Qualidade | Justificativa                                                                                                                                                 |
| ----- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------: | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| A     | Focar apenas em colocar o sistema no ar novamente, sem investigar profundamente a tentativa de vazamento.                                                             |       50% | Tem uma parte correta porque restaurar o serviço é importante no ITIL, mas é insuficiente porque ignora investigação, contenção, risco e proteção dos ativos. |
| B     | Liberar os acessos bloqueados para não atrapalhar o trabalho da equipe de desenvolvimento.                                                                            |        0% | Está errada porque liberar acessos durante suspeita de ataque pode ampliar o vazamento e prejudicar a contenção do incidente.                                 |
| C     | Conter o acesso e restaurar o serviço rapidamente, mas deixar a análise de risco e a revisão dos controles para outro momento.                                        |       70% | Está parcialmente correta porque contém o acesso e restaura o serviço, mas é incompleta por adiar análise de risco e melhoria dos controles.                  |
| D     | Tratar como incidente crítico, conter o acesso, preservar evidências, restaurar serviços afetados, avaliar riscos, comunicar responsáveis e revisar controles depois. |      100% | É a melhor resposta porque une resposta a incidente, continuidade do serviço, governança, gestão de riscos, comunicação e melhoria dos controles.             |
| E     | Esconder o ocorrido para evitar desgaste com o Conselho do Reino.                                                                                                     |        0% | Está errada porque ocultar um incidente compromete transparência, governança, auditoria e resposta adequada ao risco.                                         |

**Resposta ideal:** D

---

## Casa: Cofre do Reino — Difícil — COBIT: Governança, Orçamento e Priorização

**Casa:** Cofre do Reino  
**Tema:** Governança, Orçamento e Priorização  
**Dificuldade:** Difícil

### Pergunta

No Cofre do Reino, o Conselho Rockstar possui orçamento limitado para reforçar a proteção do GTA VI.

Existem várias propostas: treinar colaboradores contra phishing, implantar autenticação multifator, melhorar o monitoramento de logs e contratar uma ferramenta cara prometendo “segurança total”.

O Conselho pede uma decisão que proteja os ativos mais críticos sem desperdiçar recursos.

Qual é a melhor decisão?

### Alternativas

| Letra | Alternativa                                                                                                                                           | Qualidade | Justificativa                                                                                                                                        |
| ----- | ----------------------------------------------------------------------------------------------------------------------------------------------------- | --------: | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| A     | Comprar a ferramenta mais cara, pois ferramentas caras sempre aumentam a segurança.                                                                   |        0% | Está errada porque preço alto não garante valor, redução real de risco ou alinhamento com as necessidades do negócio.                                |
| B     | Escolher MFA e monitoramento de logs por serem controles importantes, mas sem comparar formalmente custo, risco e benefício.                          |       70% | Está parcialmente correta porque MFA e logs são boas medidas, mas a decisão ainda é incompleta por não avaliar custo, risco, benefício e prioridade. |
| C     | Priorizar investimentos com base em valor para o negócio, redução de riscos, proteção dos ativos críticos e uso responsável dos recursos disponíveis. |      100% | É a melhor resposta porque segue a lógica de governança: equilibrar benefícios, riscos e recursos para proteger o que é mais importante.             |
| D     | Investir primeiro na solução mais barata para mostrar ação rápida, mesmo sem saber se ela reduz os principais riscos.                                 |       50% | Tem pouca validade porque considera limitação de orçamento, mas é fraca por priorizar preço e aparência de ação em vez de impacto real na segurança. |
| E     | Não investir em nada e aceitar o risco, pois o vazamento anterior já aconteceu.                                                                       |        0% | Está errada porque aceitar o risco sem análise formal pode deixar ativos críticos expostos e permitir novos incidentes.                              |

**Resposta ideal:** C

---

# Gabarito do Mediador

| Questão | Tema                   | 100% correta | 70% correta | 50% correta | 0% correta |
| ------- | ---------------------- | ------------ | ----------- | ----------- | ---------- |
| 1       | Incidentes             | C            | B           | E           | A, D       |
| 2       | SLA                    | D            | A           | C           | B, E       |
| 3       | Mudanças               | E            | C           | B           | A, D       |
| 4       | Riscos                 | A            | D           | C           | B, E       |
| 5       | Controle de acesso     | B            | E           | C           | A, D       |
| 6       | Auditoria              | C            | B           | D           | A, E       |
| 7       | Governança e orçamento | C            | B           | D           | A, E       |
| 8       | Incidente crítico      | D            | C           | A           | B, E       |

## 13. Ranking final

Ao fim da oitava pergunta, o sistema ordena as guildas automaticamente.

Critérios atuais, em ordem:

1. Menor Vazamento Final acumulado.
2. Maior quantidade de Pontos de Segurança.
3. Maior número de respostas `100%` corretas.
4. Menor número de perguntas não respondidas.
5. Menor tempo médio de resposta.

Se todos esses critérios permanecerem iguais, o sistema preserva a ordem
anterior das guildas.

## 14. Comportamentos atuais importantes para revisão

Os itens abaixo descrevem decisões do código atual que podem ser mantidas ou
alteradas durante a revisão:

1. A partida exige exatamente cinco guildas para sair do lobby.
2. Os nomes das guildas são automáticos.
3. A resposta enviada não pode ser corrigida.
4. O mestre pode revelar resultado antes do fim do tempo.
5. Uma guilda sem resposta recebe penalidade maior do que uma resposta `0%`.
6. O Bruxo pode revelar uma dica em qualquer pergunta.
7. O poder do Anão pode ser usado em `Portão de Acesso` ou `Cerco ao GTA VI`.
8. O medidor registra explosões a cada `100%` e preserva o excedente.
9. O sistema não possui botão para reiniciar uma partida.
10. O sistema não oferece reconexão pela tela inicial.
