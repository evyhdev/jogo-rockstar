import type { Character, Question } from "../types/game.types";

const questionBank: Question[] = [
  {
    id: "servidor-em-chamas", boardPosition: 2, difficulty: "Fácil", house: "Servidor em Chamas", theme: "ITIL: Gestão de Incidentes",
    statement: "Durante a patrulha das guildas pelo Reino Rockstar, o Servidor em Chamas começa a falhar. Os desenvolvedores não conseguem acessar documentos internos do projeto GTA VI, e vários chamados começam a chegar ao Mestre da Operação. A situação ainda não indica vazamento, mas está prejudicando o funcionamento dos serviços de TI. Qual deve ser a melhor primeira atitude da equipe?",
    options: [
      { id: "A", quality: 0, text: "Desligar todos os sistemas do Reino Rockstar sem análise, comunicação ou priorização.", justification: "Uma ação extrema sem análise pode piorar o impacto e interromper serviços que ainda funcionam." },
      { id: "B", quality: 70, text: "Tentar restaurar o serviço rapidamente e depois registrar o ocorrido, mesmo que a análise de impacto fique incompleta.", justification: "Busca restaurar o serviço, mas deixa registro e análise de impacto em segundo plano." },
      { id: "C", quality: 100, text: "Registrar o incidente, avaliar impacto e urgência, priorizar o atendimento e iniciar a restauração do serviço o mais rápido possível.", justification: "Segue a gestão de incidentes: registrar, classificar, priorizar e restaurar." },
      { id: "D", quality: 0, text: "Ignorar o problema, pois falhas em servidores são normais e costumam voltar sozinhas.", justification: "Ignorar uma falha crítica aumenta o risco de indisponibilidade." },
      { id: "E", quality: 50, text: "Avisar os usuários que o sistema está indisponível e esperar a equipe técnica identificar a causa sem registrar formalmente o incidente.", justification: "Comunica a indisponibilidade, mas não registra, prioriza ou controla o incidente." },
    ], correctOptionId: "C", explanation: "Incidentes devem ser registrados, classificados, priorizados e restaurados com o menor impacto possível.",
    hint: "No ITIL, restaurar rapidamente é importante, mas o controle começa pelo registro e pela priorização.",
  },
  {
    id: "relogio-do-sla", boardPosition: 3, difficulty: "Fácil", house: "Relógio do SLA", theme: "ITIL: SLA",
    statement: "Na casa Relógio do SLA, o relógio mágico do Reino começa a contar o tempo. Um serviço crítico usado para compartilhar materiais sigilosos do GTA VI ficou indisponível. O Conselho do Reino lembra que existe um acordo de nível de serviço definindo prazos e prioridades de atendimento. O que a equipe deve considerar para tomar uma boa decisão?",
    options: [
      { id: "A", quality: 70, text: "Verificar apenas o prazo do SLA e tentar resolver rápido, mesmo sem avaliar corretamente o impacto para o negócio.", justification: "Considera o SLA, mas ignora a criticidade e o impacto real." },
      { id: "B", quality: 0, text: "Alterar o SLA depois da falha para evitar que a equipe seja cobrada.", justification: "Manipular o SLA após a falha quebra a confiança e não resolve o serviço." },
      { id: "C", quality: 50, text: "Resolver quando a equipe tiver tempo, considerando o SLA apenas como uma referência informal.", justification: "Reconhece o SLA, mas o trata como opcional." },
      { id: "D", quality: 100, text: "Verificar o SLA acordado, analisar a criticidade do serviço, priorizar conforme impacto no negócio e acompanhar o prazo de restauração.", justification: "Combina SLA, impacto e controle do tempo de restauração." },
      { id: "E", quality: 0, text: "Atender primeiro os chamados mais simples para limpar a fila, mesmo que o serviço crítico continue parado.", justification: "Prioriza facilidade em vez de impacto." },
    ], correctOptionId: "D", explanation: "O SLA deve ser associado à criticidade, ao impacto e ao acompanhamento do prazo.",
    hint: "O acordo não é apenas um relógio: a criticidade do serviço também orienta a prioridade.",
    bonusQuestion: { statement: "Um SLA deve refletir principalmente:", options: [{ id: "A", text: "Criticidade e impacto do serviço." }, { id: "B", text: "A facilidade de resolver chamados simples." }], correctOptionId: "A", explanation: "SLA deve estar alinhado ao impacto real do serviço." },
  },
  {
    id: "portao-de-acesso", boardPosition: 6, difficulty: "Fácil", house: "Portão de Acesso", theme: "COBIT: Controle de Acesso",
    statement: "Ao chegar no Portão de Acesso, um novo membro do Reino Rockstar pede entrada nos repositórios do projeto GTA VI. Ele afirma que precisa “de acesso a tudo” para trabalhar mais rápido. Porém, esses repositórios guardam código-fonte, documentos internos e arquivos estratégicos. Qual decisão está mais alinhada à segurança e ao COBIT?",
    options: [
      { id: "A", quality: 0, text: "Compartilhar a senha de outro funcionário para acelerar o início das atividades.", justification: "Compartilhar senha elimina rastreabilidade." },
      { id: "B", quality: 100, text: "Conceder apenas as permissões necessárias para a função, com autenticação adequada, registro de acesso e revisão periódica.", justification: "Aplica menor privilégio e preserva rastreabilidade." },
      { id: "C", quality: 50, text: "Dar acesso temporário amplo para facilitar o trabalho, prometendo remover depois.", justification: "Acesso amplo, mesmo temporário, expõe informações sensíveis." },
      { id: "D", quality: 0, text: "Liberar acesso total ao repositório, pois todos da empresa fazem parte do mesmo projeto.", justification: "Pertencer à organização não implica precisar de acesso total." },
      { id: "E", quality: 70, text: "Conceder acesso aos arquivos necessários, mas revisar permissões apenas quando algum problema acontecer.", justification: "Limita acesso, mas não prevê revisão preventiva." },
    ], correctOptionId: "B", explanation: "O menor privilégio, a autenticação e a revisão periódica protegem ativos críticos.",
    hint: "Controle de acesso forte concede somente o necessário e mantém rastreabilidade.",
  },
  {
    id: "portal-da-mudanca", boardPosition: 4, difficulty: "Média", house: "Portal da Mudança", theme: "ITIL: Gestão de Mudanças",
    statement: "No Portal da Mudança, a equipe descobre que as permissões do repositório principal do GTA VI estão mal configuradas. Uma mudança precisa ser feita para corrigir a falha. Porém, se a alteração for feita de forma apressada, pode bloquear desenvolvedores importantes ou causar indisponibilidade no ambiente. Qual é a melhor decisão?",
    options: [
      { id: "A", quality: 0, text: "Permitir que qualquer desenvolvedor altere permissões quando achar necessário.", justification: "Mudanças sem controle aumentam riscos e reduzem rastreabilidade." },
      { id: "B", quality: 50, text: "Fazer a mudança diretamente porque o objetivo é melhorar a segurança, documentando somente depois.", justification: "A intenção é positiva, mas a mudança continua descontrolada." },
      { id: "C", quality: 70, text: "Registrar e aprovar rapidamente a mudança, mas sem detalhar completamente o plano de retorno caso algo dê errado.", justification: "Registra e aprova, mas falta plano de retorno." },
      { id: "D", quality: 0, text: "Evitar qualquer mudança, mesmo com falha de segurança conhecida, para não gerar trabalho adicional.", justification: "Manter falha conhecida aumenta o risco." },
      { id: "E", quality: 100, text: "Registrar a mudança, avaliar riscos e impactos, obter aprovação adequada, planejar execução, comunicar envolvidos e prever plano de retorno.", justification: "Segue uma gestão de mudanças estruturada." },
    ], correctOptionId: "E", explanation: "Mudanças devem ser registradas, avaliadas, aprovadas, comunicadas e possuir plano de retorno.",
    hint: "Uma mudança segura precisa prever o que fazer se a implantação falhar.",
    bonusQuestion: { statement: "Antes de executar uma mudança, é essencial:", options: [{ id: "A", text: "Prever riscos e plano de retorno." }, { id: "B", text: "Documentar somente depois." }], correctOptionId: "A", explanation: "Planejamento e rollback reduzem o impacto de falhas." },
  },
  {
    id: "mapa-dos-riscos", boardPosition: 5, difficulty: "Média", house: "Mapa dos Riscos", theme: "COBIT: Gestão de Riscos",
    statement: "No Mapa dos Riscos, o Bruxo do Reino identifica três ameaças contra a Rockstar: mensagens falsas tentando enganar funcionários, acesso remoto sem proteção forte e ausência de monitoramento adequado dos logs. Todas parecem importantes, mas os recursos do Reino são limitados. Como a equipe deve priorizar as ações?",
    options: [
      { id: "A", quality: 100, text: "Avaliar probabilidade, impacto e urgência de cada risco, considerando os ativos mais críticos e os objetivos do negócio.", justification: "Prioriza riscos de forma estruturada." },
      { id: "B", quality: 0, text: "Ignorar os riscos enquanto não ocorrer um novo vazamento.", justification: "A gestão de riscos deve ser preventiva." },
      { id: "C", quality: 50, text: "Começar pelo risco mais fácil de resolver, mesmo que ele não seja o mais crítico.", justification: "Pode gerar melhoria rápida, mas não prioriza riscos perigosos." },
      { id: "D", quality: 70, text: "Priorizar os riscos que parecem mais graves, considerando impacto, mas sem análise estruturada de probabilidade e urgência.", justification: "Considera impacto, mas falta análise organizada." },
      { id: "E", quality: 0, text: "Escolher aleatoriamente um risco, pois todos são importantes do mesmo jeito.", justification: "Riscos exigem avaliação e priorização." },
    ], correctOptionId: "A", explanation: "Riscos devem ser priorizados por probabilidade, impacto, urgência e valor dos ativos.",
    hint: "Governança exige comparar riscos, não escolher pela facilidade nem pelo acaso.",
  },
  {
    id: "olho-da-auditoria", boardPosition: 7, difficulty: "Média", house: "Olho da Auditoria", theme: "COBIT: Auditoria e Monitoramento",
    statement: "Ao passar pelo Olho da Auditoria, o Elfo percebe acessos incomuns ao repositório do GTA VI durante a madrugada. Os acessos vieram de uma conta válida, mas em horário estranho e a partir de um local diferente do habitual. Ainda não há certeza de invasão, mas o comportamento é suspeito. Qual é a melhor resposta?",
    options: [
      { id: "A", quality: 0, text: "Desativar o monitoramento para não gerar alertas excessivos.", justification: "Desativar monitoramento reduz a capacidade de detectar ameaças." },
      { id: "B", quality: 70, text: "Verificar os logs principais e trocar algumas senhas, mas sem investigar profundamente a origem dos acessos.", justification: "É ação inicial útil, mas investigação incompleta." },
      { id: "C", quality: 100, text: "Analisar logs, verificar usuários e permissões, investigar comportamento suspeito, registrar evidências e reforçar controles de monitoramento.", justification: "Combina auditoria, investigação e rastreabilidade." },
      { id: "D", quality: 50, text: "Perguntar aos usuários se alguém acessou o sistema e aguardar novas ocorrências antes de agir.", justification: "Ouvir usuários ajuda, mas esperar é arriscado." },
      { id: "E", quality: 0, text: "Apagar os logs para evitar exposição do incidente.", justification: "Apagar logs destrói evidências." },
    ], correctOptionId: "C", explanation: "Auditoria eficaz combina logs, investigação, evidências e reforço dos controles.",
    hint: "Comportamentos suspeitos precisam de evidências preservadas e investigação.",
  },
  {
    id: "cerco-ao-gta-vi", boardPosition: 9, difficulty: "Difícil", house: "Cerco ao GTA VI", theme: "COBIT + ITIL: Resposta a Incidente Crítico",
    statement: "Na casa Cerco ao GTA VI, o Reino Rockstar sofre uma tentativa final de ataque. Há indícios de engenharia social, acesso indevido a uma conta interna, falha em um serviço importante e possível movimentação de arquivos sigilosos. A equipe precisa agir rápido, mas sem perder o controle da situação. Qual decisão combina melhor COBIT e ITIL?",
    options: [
      { id: "A", quality: 50, text: "Focar apenas em colocar o sistema no ar novamente, sem investigar profundamente a tentativa de vazamento.", justification: "Restauração é importante, mas investigação e contenção também são necessárias." },
      { id: "B", quality: 0, text: "Liberar os acessos bloqueados para não atrapalhar o desenvolvimento.", justification: "Liberar acessos durante ataque amplia o risco." },
      { id: "C", quality: 70, text: "Conter o acesso e restaurar o serviço rapidamente, mas deixar a análise de risco e a revisão dos controles para outro momento.", justification: "Contém e restaura, mas adia análise e melhoria." },
      { id: "D", quality: 100, text: "Tratar como incidente crítico, conter o acesso, preservar evidências, restaurar serviços afetados, avaliar riscos, comunicar responsáveis e revisar controles depois.", justification: "Une resposta, continuidade, governança e riscos." },
      { id: "E", quality: 0, text: "Esconder o ocorrido para evitar desgaste com o Conselho do Reino.", justification: "Ocultar incidente compromete transparência e governança." },
    ], correctOptionId: "D", explanation: "A crise exige contenção, preservação de evidências, restauração, comunicação e revisão dos controles.",
    hint: "Uma crise crítica exige recuperar o serviço sem abandonar investigação, risco e governança.", finalChallenge: true,
  },
  {
    id: "cofre-do-reino", boardPosition: 8, difficulty: "Difícil", house: "Cofre do Reino", theme: "COBIT: Governança, Orçamento e Priorização",
    statement: "No Cofre do Reino, o Conselho Rockstar possui orçamento limitado para reforçar a proteção do GTA VI. Existem várias propostas: treinar colaboradores contra phishing, implantar autenticação multifator, melhorar o monitoramento de logs e contratar uma ferramenta cara prometendo “segurança total”. O Conselho pede uma decisão que proteja os ativos mais críticos sem desperdiçar recursos. Qual é a melhor decisão?",
    options: [
      { id: "A", quality: 0, text: "Comprar a ferramenta mais cara, pois ferramentas caras sempre aumentam a segurança.", justification: "Preço alto não garante redução real de risco." },
      { id: "B", quality: 70, text: "Escolher MFA e monitoramento de logs por serem controles importantes, mas sem comparar formalmente custo, risco e benefício.", justification: "São boas medidas, mas falta avaliação formal." },
      { id: "C", quality: 100, text: "Priorizar investimentos com base em valor para o negócio, redução de riscos, proteção dos ativos críticos e uso responsável dos recursos.", justification: "Equilibra benefícios, riscos e recursos." },
      { id: "D", quality: 50, text: "Investir primeiro na solução mais barata para mostrar ação rápida, mesmo sem saber se ela reduz os principais riscos.", justification: "Prioriza preço e aparência, não impacto." },
      { id: "E", quality: 0, text: "Não investir em nada e aceitar o risco, pois o vazamento anterior já aconteceu.", justification: "Aceitar risco sem análise deixa ativos expostos." },
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
