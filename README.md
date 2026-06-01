# Operação Rockstar: Protocolo Seguro

Website Vite para conduzir em sala de aula o jogo educacional definido no documento
`Operação Rockstar: Protocolo Seguro`.

O projeto não possui servidor Node próprio. A interface React pode ser hospedada como
site estático, enquanto o estado compartilhado das partidas fica no Firebase Realtime
Database.

Documentos do projeto:

- [`docs/ARQUITETURA.md`](docs/ARQUITETURA.md): arquitetura técnica e modelo de dados.
- [`docs/SPECS.md`](docs/SPECS.md): escopo, regras e requisitos.
- [`docs/DOCUMENTACAO.md`](docs/DOCUMENTACAO.md): instalação, uso e hospedagem.
- [`docs/FUNCIONAMENTO_ATUAL_DO_JOGO.md`](docs/FUNCIONAMENTO_ATUAL_DO_JOGO.md): regras atuais editáveis para revisão.

## Fluxo da partida

1. O mediador abre a página inicial no computador e cria uma sala.
2. A tela exibe um código de cinco caracteres.
3. Cinco líderes acessam a mesma página pelo celular, informam o código e entram.
4. Cada líder joga o dado. O site ordena a escolha de personagens pelo resultado.
5. Os líderes escolhem cinco dos seis personagens disponíveis.
6. O mediador lança cada pergunta, controla os 60 segundos e revela o resultado.
7. Cada líder responde pelo celular e usa seu poder especial no momento permitido.
8. Após a casa `Cerco ao GTA VI`, o ranking final é exibido.

## Regras implementadas

- 5 guildas e 6 personagens: Mago, Bruxo, Elfo, Anão, Guerreiro e Arqueiro.
- 10 casas: início, 8 desafios e encerramento.
- Alternativas possuem qualidade: `100%`, `70%`, `50%` ou `0%`.
- Pontos e vazamento variam conforme qualidade, casa e especialidade.
- Cada guilda possui vazamento acumulado em porcentagem.
- Ao atingir `100%`, ocorre uma Explosão de Vazamento e o excedente permanece.
- Poderes são únicos e contextuais para cada personagem.

## Executar localmente

```bash
npm install
npm run dev
```

Sem configuração adicional, o modo local permite testar a sincronização abrindo
várias abas no mesmo navegador.

## Sincronizar celulares com Firebase

1. Crie um projeto no [Firebase](https://console.firebase.google.com/).
2. Crie um `Realtime Database`.
3. Publique as regras de `firebase-database.rules.json`.
4. Crie `client/.env` a partir de `client/.env.example`.
5. Preencha `VITE_FIREBASE_DATABASE_URL` com a URL exibida no Firebase.
6. Gere a versão de produção com `npm run build`.

As regras incluídas são adequadas para uma demonstração em sala: salas possuem códigos
aleatórios e leitura/escrita pública. Antes de publicar para uso aberto na internet,
adicione autenticação e regras restritas por usuário.

## Hospedagem

A saída estática é criada em `client/dist`. Configure sua hospedagem para executar:

```bash
npm run build
```

e publicar:

```text
client/dist
```
