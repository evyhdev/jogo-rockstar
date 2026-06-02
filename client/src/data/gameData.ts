import type { Character, Question } from "../types/game.types";

const questionBank: Question[] = [
  {
    id: "servidor-em-chamas", boardPosition: 2, difficulty: "Fácil", house: "Servidor em Chamas", theme: "ITIL: Gestão de Incidentes",
    statement: "Durante a patrulha das guildas pelo Reino Rockstar, o Servidor em Chamas começa a falhar. Os desenvolvedores não conseguem acessar documentos internos do projeto GTA VI, e vários chamados começam a chegar ao Mestre da Operação. A situação ainda não indica vazamento, mas está prejudicando o funcionamento dos serviços de TI. Qual deve ser a melhor primeira atitude da equipe?",
    options: [
      { id: "A", quality: 0, text: "Interromper todos os sistemas do Reino imediatamente, sem triagem, registro formal, comunicação ou priorização dos serviços afetados.", justification: "Está errada porque uma ação extrema sem análise pode piorar o impacto, interromper serviços que ainda funcionam e não segue uma gestão adequada de incidentes." },
      { id: "B", quality: 70, text: "Restaurar o serviço com rapidez, mas registrar o ocorrido depois e analisar o impacto de forma limitada.", justification: "Está parcialmente correta porque busca restaurar o serviço, que é importante no ITIL, mas falha ao deixar o registro e a análise de impacto em segundo plano." },
      { id: "C", quality: 100, text: "Registrar o incidente, classificar impacto e urgência, priorizar o atendimento e iniciar a restauração controlada.", justification: "É a melhor resposta porque segue a lógica da gestão de incidentes: registrar, classificar, priorizar e restaurar o serviço com o menor impacto possível." },
      { id: "D", quality: 0, text: "Desconsiderar a falha do servidor, aguardando normalização espontânea sem chamado, análise ou acompanhamento formal.", justification: "Está errada porque ignorar uma falha crítica aumenta o risco de indisponibilidade, perda de controle e possível agravamento do incidente." },
      { id: "E", quality: 50, text: "Comunicar a indisponibilidade aos usuários, mas não registrar, classificar ou controlar formalmente o incidente.", justification: "Tem uma pequena parte correta porque comunica a indisponibilidade, mas é fraca porque não registra, não prioriza e não controla formalmente o incidente." },
    ], correctOptionId: "C", explanation: "Incidentes devem ser registrados, classificados, priorizados e restaurados com o menor impacto possível.",
    hint: "No ITIL, restaurar rapidamente é importante, mas o controle começa pelo registro e pela priorização.",
  },
  {
    id: "relogio-do-sla", boardPosition: 3, difficulty: "Fácil", house: "Relógio do SLA", theme: "ITIL: SLA",
    statement: "Na casa Relógio do SLA, o relógio mágico do Reino começa a contar o tempo. Um serviço crítico usado para compartilhar materiais sigilosos do GTA VI ficou indisponível. O Conselho do Reino lembra que existe um acordo de nível de serviço definindo prazos e prioridades de atendimento. O que a equipe deve considerar para tomar uma boa decisão?",
    options: [
      { id: "A", quality: 70, text: "Observar apenas o prazo previsto no SLA, tentando resolver rápido sem avaliar criticidade e impacto real.", justification: "Está parcialmente correta porque considera o SLA e tenta agir rápido, mas é incompleta por ignorar a criticidade e o impacto real no negócio." },
      { id: "B", quality: 0, text: "Modificar o SLA após a falha, reduzindo cobranças em vez de tratar corretamente o serviço indisponível.", justification: "Está errada porque manipular o SLA após a falha quebra a confiança, prejudica a governança e não resolve o problema do serviço." },
      { id: "C", quality: 50, text: "Resolver o problema quando houver disponibilidade da equipe, usando o SLA apenas como referência secundária.", justification: "Tem pouca validade porque reconhece a existência do SLA, mas erra ao tratá-lo como algo opcional e sem prioridade." },
      { id: "D", quality: 100, text: "Verificar o SLA acordado, analisar a criticidade, priorizar pelo impacto e acompanhar a restauração.", justification: "É a melhor resposta porque combina cumprimento de SLA, priorização por impacto e controle do tempo de restauração do serviço." },
      { id: "E", quality: 0, text: "Atender chamados mais simples primeiro, mesmo deixando o serviço crítico parado além do prazo adequado.", justification: "Está errada porque prioriza facilidade em vez de impacto no negócio, deixando um serviço crítico indisponível." },
    ], correctOptionId: "D", explanation: "O SLA deve ser associado à criticidade, ao impacto e ao acompanhamento do prazo.",
    hint: "O acordo não é apenas um relógio: a criticidade do serviço também orienta a prioridade.",
    bonusQuestion: { statement: "Um SLA deve refletir principalmente:", options: [{ id: "A", text: "Criticidade e impacto do serviço." }, { id: "B", text: "A facilidade de resolver chamados simples." }], correctOptionId: "A", explanation: "SLA deve estar alinhado ao impacto real do serviço." },
  },
  {
    id: "portao-de-acesso", boardPosition: 6, difficulty: "Fácil", house: "Portão de Acesso", theme: "COBIT: Controle de Acesso",
    statement: "Ao chegar no Portão de Acesso, um novo membro do Reino Rockstar pede entrada nos repositórios do projeto GTA VI. Ele afirma que precisa “de acesso a tudo” para trabalhar mais rápido. Porém, esses repositórios guardam código-fonte, documentos internos e arquivos estratégicos. Qual decisão está mais alinhada à segurança e ao COBIT?",
    options: [
      { id: "A", quality: 0, text: "Compartilhar a senha de outro funcionário, permitindo acesso rápido sem autenticação individual ou rastreabilidade das ações.", justification: "Está errada porque compartilhamento de senha elimina rastreabilidade, enfraquece o controle de acesso e aumenta o risco de uso indevido." },
      { id: "B", quality: 100, text: "Conceder somente permissões necessárias à função, com autenticação adequada, registros e revisão periódica.", justification: "É a melhor resposta porque aplica o princípio do menor privilégio, preserva rastreabilidade e protege ativos críticos." },
      { id: "C", quality: 50, text: "Liberar acesso amplo temporário, esperando remover depois, sem controle rigoroso sobre escopo e duração.", justification: "Tem uma intenção operacional, mas é arriscada porque acesso amplo, mesmo temporário, pode expor informações sensíveis se não houver controle rígido." },
      { id: "D", quality: 0, text: "Autorizar acesso total ao repositório, presumindo que todo membro da empresa precisa consultar tudo.", justification: "Está errada porque pertencer à organização não significa precisar de acesso total aos ativos críticos." },
      { id: "E", quality: 70, text: "Permitir acesso aos arquivos necessários, mas revisar permissões somente após surgir algum problema concreto.", justification: "Está parcialmente correta porque limita o acesso aos arquivos necessários, mas falha por não prever revisão periódica e controle preventivo." },
    ], correctOptionId: "B", explanation: "O menor privilégio, a autenticação e a revisão periódica protegem ativos críticos.",
    hint: "Controle de acesso forte concede somente o necessário e mantém rastreabilidade.",
  },
  {
    id: "portal-da-mudanca", boardPosition: 4, difficulty: "Média", house: "Portal da Mudança", theme: "ITIL: Gestão de Mudanças",
    statement: "No Portal da Mudança, a equipe descobre que as permissões do repositório principal do GTA VI estão mal configuradas. Uma mudança precisa ser feita para corrigir a falha. Porém, se a alteração for feita de forma apressada, pode bloquear desenvolvedores importantes ou causar indisponibilidade no ambiente. Qual é a melhor decisão?",
    options: [
      { id: "A", quality: 0, text: "Permitir alterações por qualquer desenvolvedor, sem aprovação, registro, comunicação prévia ou avaliação dos impactos.", justification: "Está errada porque mudanças sem controle aumentam risco de falhas, indisponibilidade e perda de rastreabilidade." },
      { id: "B", quality: 50, text: "Aplicar a mudança imediatamente por motivo de segurança, deixando análise e documentação para depois.", justification: "Tem uma intenção positiva, mas é fraca porque segurança não justifica mudança descontrolada; documentação tardia pode deixar riscos e impactos sem avaliação." },
      { id: "C", quality: 70, text: "Registrar e aprovar a mudança rapidamente, mas executar sem plano claro de retorno operacional.", justification: "Está parcialmente correta porque registra e aprova a mudança, mas ainda é incompleta por não prever adequadamente um plano de retorno." },
      { id: "D", quality: 0, text: "Evitar qualquer alteração mesmo com falha conhecida, para não gerar esforço adicional ou interrupções.", justification: "Está errada porque manter uma falha conhecida sem tratamento aumenta o risco de vazamento e compromete a segurança do ambiente." },
      { id: "E", quality: 100, text: "Registrar a mudança, avaliar riscos, aprovar, planejar execução, comunicar envolvidos e prever retorno.", justification: "É a melhor resposta porque segue uma gestão de mudanças estruturada, reduz riscos e evita impactos desnecessários no serviço." },
    ], correctOptionId: "E", explanation: "Mudanças devem ser registradas, avaliadas, aprovadas, comunicadas e possuir plano de retorno.",
    hint: "Uma mudança segura precisa prever o que fazer se a implantação falhar.",
    bonusQuestion: { statement: "Antes de executar uma mudança, é essencial:", options: [{ id: "A", text: "Prever riscos e plano de retorno." }, { id: "B", text: "Documentar somente depois." }], correctOptionId: "A", explanation: "Planejamento e rollback reduzem o impacto de falhas." },
  },
  {
    id: "mapa-dos-riscos", boardPosition: 5, difficulty: "Média", house: "Mapa dos Riscos", theme: "COBIT: Gestão de Riscos",
    statement: "No Mapa dos Riscos, o Bruxo do Reino identifica três ameaças contra a Rockstar: mensagens falsas tentando enganar funcionários, acesso remoto sem proteção forte e ausência de monitoramento adequado dos logs. Todas parecem importantes, mas os recursos do Reino são limitados. Como a equipe deve priorizar as ações?",
    options: [
      { id: "A", quality: 100, text: "Avaliar probabilidade, impacto e urgência dos riscos, considerando ativos críticos e objetivos do negócio.", justification: "É a melhor resposta porque prioriza riscos de forma estruturada, considerando impacto, chance de ocorrer, urgência e valor dos ativos protegidos." },
      { id: "B", quality: 0, text: "Ignorar os riscos identificados até que ocorra novo vazamento, falha grave ou prejuízo confirmado.", justification: "Está errada porque gestão de riscos deve ser preventiva, não apenas reativa após o dano acontecer." },
      { id: "C", quality: 50, text: "Começar pelo risco mais fácil de corrigir, mesmo que ele não seja o mais crítico.", justification: "Tem pouca validade porque pode gerar alguma melhoria rápida, mas não garante que os riscos mais perigosos sejam tratados primeiro." },
      { id: "D", quality: 70, text: "Priorizar os riscos aparentemente graves, mas sem análise formal de probabilidade, urgência e impacto.", justification: "Está parcialmente correta porque considera gravidade e impacto, mas é incompleta por não fazer uma análise mais organizada dos riscos." },
      { id: "E", quality: 0, text: "Escolher aleatoriamente um risco para tratar, supondo que todos possuem a mesma relevância.", justification: "Está errada porque riscos não devem ser tratados por sorte; eles precisam ser avaliados e priorizados de acordo com impacto e probabilidade." },
    ], correctOptionId: "A", explanation: "Riscos devem ser priorizados por probabilidade, impacto, urgência e valor dos ativos.",
    hint: "Governança exige comparar riscos, não escolher pela facilidade nem pelo acaso.",
  },
  {
    id: "olho-da-auditoria", boardPosition: 7, difficulty: "Média", house: "Olho da Auditoria", theme: "COBIT: Auditoria e Monitoramento",
    statement: "Ao passar pelo Olho da Auditoria, o Elfo percebe acessos incomuns ao repositório do GTA VI durante a madrugada. Os acessos vieram de uma conta válida, mas em horário estranho e a partir de um local diferente do habitual. Ainda não há certeza de invasão, mas o comportamento é suspeito. Qual é a melhor resposta?",
    options: [
      { id: "A", quality: 0, text: "Desativar o monitoramento para reduzir alertas, mesmo perdendo visibilidade sobre comportamentos suspeitos.", justification: "Está errada porque desativar o monitoramento reduz a capacidade de detectar ameaças e aumenta o risco de vazamentos." },
      { id: "B", quality: 70, text: "Verificar alguns logs e trocar senhas, mas sem investigar origem, contexto e evidências completas.", justification: "Está parcialmente correta porque consulta logs e toma uma ação inicial, mas é incompleta por não investigar a causa e não registrar evidências de forma adequada." },
      { id: "C", quality: 100, text: "Analisar logs, usuários, permissões e comportamento suspeito, registrando evidências e reforçando controles.", justification: "É a melhor resposta porque combina auditoria, monitoramento, investigação, rastreabilidade e melhoria dos controles." },
      { id: "D", quality: 50, text: "Perguntar aos usuários sobre acessos recentes, aguardando novas ocorrências antes da investigação técnica.", justification: "Tem pouca validade porque ouvir os usuários pode ajudar, mas esperar novas ocorrências é arriscado e não substitui análise de logs e evidências." },
      { id: "E", quality: 0, text: "Apagar os logs do sistema para evitar exposição do caso, eliminando registros importantes.", justification: "Está errada porque apagar logs destrói evidências, impede auditoria e dificulta a investigação do possível incidente." },
    ], correctOptionId: "C", explanation: "Auditoria eficaz combina logs, investigação, evidências e reforço dos controles.",
    hint: "Comportamentos suspeitos precisam de evidências preservadas e investigação.",
  },
  {
    id: "cerco-ao-gta-vi", boardPosition: 9, difficulty: "Difícil", house: "Cerco ao GTA VI", theme: "COBIT + ITIL: Resposta a Incidente Crítico",
    statement: "Na casa Cerco ao GTA VI, o Reino Rockstar sofre uma tentativa final de ataque. Há indícios de engenharia social, acesso indevido a uma conta interna, falha em um serviço importante e possível movimentação de arquivos sigilosos. A equipe precisa agir rápido, mas sem perder o controle da situação. Qual decisão combina melhor COBIT e ITIL?",
    options: [
      { id: "A", quality: 50, text: "Restaurar rapidamente o sistema afetado, sem investigar vazamento, riscos envolvidos ou controles comprometidos.", justification: "Tem uma parte correta porque restaurar o serviço é importante no ITIL, mas é insuficiente porque ignora investigação, contenção, risco e proteção dos ativos." },
      { id: "B", quality: 0, text: "Liberar acessos bloqueados para não atrapalhar desenvolvedores, mesmo diante de suspeita ativa.", justification: "Está errada porque liberar acessos durante suspeita de ataque pode ampliar o vazamento e prejudicar a contenção do incidente." },
      { id: "C", quality: 70, text: "Conter acessos e restaurar o serviço, adiando análise de riscos e revisão dos controles.", justification: "Está parcialmente correta porque contém o acesso e restaura o serviço, mas é incompleta por adiar análise de risco e melhoria dos controles." },
      { id: "D", quality: 100, text: "Tratar como incidente crítico, conter acesso, preservar evidências, restaurar serviços e revisar controles.", justification: "É a melhor resposta porque une resposta a incidente, continuidade do serviço, governança, gestão de riscos, comunicação e melhoria dos controles." },
      { id: "E", quality: 0, text: "Ocultar o ocorrido do Conselho, evitando comunicação formal, auditoria e resposta adequada ao risco.", justification: "Está errada porque ocultar um incidente compromete transparência, governança, auditoria e resposta adequada ao risco." },
    ], correctOptionId: "D", explanation: "A crise exige contenção, preservação de evidências, restauração, comunicação e revisão dos controles.",
    hint: "Uma crise crítica exige recuperar o serviço sem abandonar investigação, risco e governança.", finalChallenge: true,
  },
  {
    id: "cofre-do-reino", boardPosition: 8, difficulty: "Difícil", house: "Cofre do Reino", theme: "COBIT: Governança, Orçamento e Priorização",
    statement: "No Cofre do Reino, o Conselho Rockstar possui orçamento limitado para reforçar a proteção do GTA VI. Existem várias propostas: treinar colaboradores contra phishing, implantar autenticação multifator, melhorar o monitoramento de logs e contratar uma ferramenta cara prometendo “segurança total”. O Conselho pede uma decisão que proteja os ativos mais críticos sem desperdiçar recursos. Qual é a melhor decisão?",
    options: [
      { id: "A", quality: 0, text: "Comprar a ferramenta mais cara disponível, presumindo que preço elevado sempre garante proteção superior.", justification: "Está errada porque preço alto não garante valor, redução real de risco ou alinhamento com as necessidades do negócio." },
      { id: "B", quality: 70, text: "Escolher MFA e logs por serem úteis, mas sem comparar custo, risco, benefício e prioridade.", justification: "Está parcialmente correta porque MFA e logs são boas medidas, mas a decisão ainda é incompleta por não avaliar custo, risco, benefício e prioridade." },
      { id: "C", quality: 100, text: "Priorizar investimentos por valor ao negócio, redução de riscos e proteção dos ativos críticos.", justification: "É a melhor resposta porque segue a lógica de governança: equilibrar benefícios, riscos e recursos para proteger o que é mais importante." },
      { id: "D", quality: 50, text: "Investir na opção mais barata para demonstrar ação rápida, sem medir redução real dos riscos.", justification: "Tem pouca validade porque considera limitação de orçamento, mas é fraca por priorizar preço e aparência de ação em vez de impacto real na segurança." },
      { id: "E", quality: 0, text: "Não investir em novas proteções, aceitando o risco porque o vazamento anterior já aconteceu.", justification: "Está errada porque aceitar o risco sem análise formal pode deixar ativos críticos expostos e permitir novos incidentes." },
    ], correctOptionId: "C", explanation: "Governança equilibra valor, riscos, proteção dos ativos e uso responsável dos recursos.",
    hint: "A melhor decisão equilibra benefícios, riscos e recursos disponíveis.",
  },
];

const questionOrder = ["servidor-em-chamas", "relogio-do-sla", "portal-da-mudanca", "mapa-dos-riscos", "portao-de-acesso", "olho-da-auditoria", "cofre-do-reino", "cerco-ao-gta-vi"];
export const questions = questionOrder.map((id) => questionBank.find((question) => question.id === id) as Question);

export const characters: Character[] = [
  { id: "mago", name: "Mago", emoji: "🧙", specialty: "ITIL: SLA e mudanças", advantageQuestionIds: ["relogio-do-sla", "portal-da-mudanca"], powerName: "Ritual de Replanejamento", powerDescription: "Após errar SLA ou mudança, responda uma pergunta simples para tentar remover o vazamento da rodada.", powerTiming: "after-result", powerEffect: "bonus-question" },
  { id: "bruxo", name: "Bruxo", emoji: "🔮", specialty: "COBIT: riscos e estratégia", advantageQuestionIds: ["mapa-dos-riscos", "cofre-do-reino"], powerName: "Presságio Sombrio", powerDescription: "Antes de responder, revele uma dica sobre o conceito da pergunta.", powerTiming: "before-answer", powerEffect: "hint" },
  { id: "elfo", name: "Elfo", emoji: "🏹", specialty: "Auditoria e monitoramento", advantageQuestionIds: ["olho-da-auditoria", "cerco-ao-gta-vi"], powerName: "Olhar Sentinela", powerDescription: "Antes de responder em casa compatível, investigue se uma alternativa é suspeita.", powerTiming: "before-answer", powerEffect: "inspect-option" },
  { id: "anao", name: "Anão", emoji: "⛏️", specialty: "Ativos e acessos", advantageQuestionIds: ["portao-de-acesso", "cofre-do-reino"], powerName: "Fortificação de Pedra", powerDescription: "Após acertar Portão de Acesso ou Cerco ao GTA VI, reduza em 15% o próximo vazamento recebido pela guilda.", powerTiming: "after-result", powerEffect: "fortify" },
  { id: "guerreiro", name: "Guerreiro", emoji: "⚔️", specialty: "Incidentes e crises", advantageQuestionIds: ["servidor-em-chamas", "cerco-ao-gta-vi"], powerName: "Última Linha de Defesa", powerDescription: "Após qualquer erro, reduza pela metade o vazamento recebido na rodada.", powerTiming: "after-result", powerEffect: "halve-leak" },
  { id: "arqueiro", name: "Arqueiro", emoji: "🎯", specialty: "Phishing e ameaças externas", advantageQuestionIds: ["mapa-dos-riscos", "portao-de-acesso"], powerName: "Tiro Preciso", powerDescription: "Antes de responder em casa compatível, escolha duas alternativas e anule as que forem 0%.", powerTiming: "before-answer", powerEffect: "annul-zero-options" },
];

export const boardHouses = ["Conselho do Reino", ...questions.map((question) => question.house), "Reino Protegido"];
export const getQuestion = (round: number) => questions[round];
export const getCharacter = (characterId: string | null) => characters.find((character) => character.id === characterId);
