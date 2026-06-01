# Documentação - Operação Rockstar: Protocolo Seguro

## 1. Finalidade

Este guia explica como instalar, configurar, executar, hospedar e aplicar o jogo
em sala de aula.

Documentos complementares:

- [`ARQUITETURA.md`](ARQUITETURA.md): decisões técnicas, módulos e dados.
- [`SPECS.md`](SPECS.md): escopo, regras e requisitos.

## 2. Pré-requisitos

- Node.js compatível com Vite 5.
- npm.
- Projeto Firebase com Realtime Database para uso em celulares diferentes.

## 3. Instalação

Na raiz do projeto:

```bash
npm install
```

## 4. Execução local

```bash
npm run dev
```

Sem configurar Firebase, o sistema usa `localStorage`. Esse modo serve para
testar o jogo abrindo várias abas no mesmo navegador.

Para expor o Vite na rede local:

```bash
npm run dev:host
```

O modo local sem Firebase não sincroniza dispositivos diferentes.

## 5. Configuração do Firebase

### 5.1. Criar o Realtime Database

1. Acesse o [console do Firebase](https://console.firebase.google.com/).
2. Crie ou selecione um projeto.
3. Ative o `Realtime Database`.
4. Copie a URL do banco.

### 5.2. Configurar as regras

Publique o conteúdo de `firebase-database.rules.json` no Realtime Database.

As regras atuais liberam leitura e escrita pública. Elas são destinadas somente
a demonstrações controladas.

### 5.3. Criar o arquivo de ambiente

Crie `client/.env` a partir de `client/.env.example`:

```env
VITE_FIREBASE_DATABASE_URL=https://SEU-PROJETO-default-rtdb.firebaseio.com
```

Depois, reinicie o Vite ou execute novamente o build.

## 6. Aplicação em sala de aula

### 6.1. Mestre

1. Abra a página inicial no computador conectado ao projetor.
2. Clique em `Criar sala como mestre`.
3. Compartilhe o código exibido.
4. Aguarde cinco líderes entrarem e jogarem o dado.
5. Quando todos jogarem o dado, clique em `Iniciar escolha dos personagens`.
6. Aguarde as cinco escolhas.
7. Clique em `Lançar pergunta`.
8. Após a discussão, clique em `Revelar resultado`.
9. Aguarde eventuais poderes posteriores ao resultado.
10. Clique em `Próxima casa`.
11. Repita até o ranking final.

### 6.2. Líder da guilda

1. Abra a página inicial no celular.
2. Informe o código e seu nome.
3. Clique em `Entrar na operação`.
4. Jogue o dado.
5. Empates serão ordenados alfabeticamente.
6. Escolha o personagem no seu turno.
7. Responda uma alternativa quando a pergunta estiver aberta.
8. Use o poder especial no momento em que o botão estiver disponível.

## 7. Scripts e hospedagem

### 7.1. Scripts

| Comando | Finalidade |
| --- | --- |
| `npm run dev` | Inicia Vite localmente |
| `npm run dev:host` | Expõe Vite na rede local |
| `npm run build` | Executa TypeScript e gera `client/dist` |
| `npm run preview` | Visualiza localmente o build |

### 7.2. Build

```bash
npm run build
```

Saída:

```text
client/dist
```

### 7.3. Configuração da hospedagem

| Configuração | Valor |
| --- | --- |
| Comando de instalação | `npm install` |
| Comando de build | `npm run build` |
| Diretório publicado | `client/dist` |
| Variável necessária para celulares | `VITE_FIREBASE_DATABASE_URL` |

As rotas usam `HashRouter`, portanto a hospedagem não precisa de rewrite de SPA.

## 8. Segurança e limitações

### 8.1. Limitações atuais

- O frontend publicado contém regras e respostas corretas.
- O código da sala é identificador público, não senha.
- A rota do jogador contém o `teamId`.
- A rota do mestre não exige autenticação.
- As regras Firebase permitem leitura e escrita pública.
- Salas antigas não são excluídas automaticamente.
- A sincronização remota usa polling REST, não listeners do SDK Firebase.
- O modo local não funciona entre dispositivos diferentes.

### 8.2. Recomendado antes de publicação aberta

1. Adicionar Firebase Authentication.
2. Separar permissões de mestre e líder.
3. Restringir escrita do líder à própria guilda.
4. Impedir alterações diretas em pontuação e fase.
5. Mover cálculos autoritativos para Cloud Functions ou backend confiável.
6. Configurar expiração automática das salas.
7. Remover respostas corretas do bundle público.

## 9. Validação

### 9.1. Build obrigatório

```bash
npm run build
```

O comando executa a checagem TypeScript e gera o site estático.

### 9.2. Checklist manual

1. Criar sala.
2. Entrar com cinco líderes.
3. Validar ordenação alfabética em empate.
4. Escolher personagens em ordem.
5. Validar resposta correta e incorreta.
6. Validar bloqueio após 60 segundos.
7. Usar poder anterior à resposta.
8. Usar poder posterior ao resultado.
9. Avançar pelas oito rodadas.
10. Conferir ranking final.
11. Testar sincronização entre computador e celulares com Firebase.

## 10. Solução de problemas

### O celular não acompanha a partida

Confirme se `VITE_FIREBASE_DATABASE_URL` foi configurada antes do build. Sem ela,
o sistema entra no modo local.

### O rodapé mostra `local para desenvolvimento`

O arquivo `client/.env` não foi carregado ou a variável está ausente. Reinicie o
Vite ou gere um novo build depois de configurá-la.

### Uma resposta não foi aceita

Verifique se a pergunta ainda está ativa, se os 60 segundos não acabaram e se a
guilda ainda não respondeu.

### O mestre não consegue iniciar a seleção

É necessário ter cinco líderes e todas as rolagens preenchidas.

### O poder não aparece

Cada poder só aparece no momento aplicável, conforme as regras de
[`SPECS.md`](SPECS.md#64-poderes).
