# Operação Rockstar: Protocolo Seguro

Aplicação MVP de um jogo educacional em tempo real para sala de aula.

## Objetivo

Criar um jogo onde o datashow exibe o tabuleiro, pergunta atual, alternativas, cronômetro, equipes, pontuação, confiança, medidor de vazamento e resultado. Cada líder responde no celular por uma rota própria.

## Stack usada

- Frontend: React, Vite, TypeScript, React Router, Tailwind CSS, Socket.IO Client
- Backend: Node.js, Express, Socket.IO, TypeScript
- Dados em arquivos JSON, sem banco de dados

## Instalação

No diretório raiz do projeto:

```bash
npm install
```

Isso instalará dependências nos pacotes `client` e `server`.

## Como rodar

No diretório raiz:

```bash
npm run dev
```

Isso iniciará o backend em `http://localhost:4000` e o frontend em `http://localhost:5173`.

### Tornar o frontend acessível na rede local (testar no celular)

No diretório `client` você pode iniciar o Vite com `--host` para expor o servidor na rede local:

```bash
cd /home/evy/Documentos/jogo/operacao-rockstar/client
npm run dev:host
```

Em seguida, descubra o IP da máquina (por exemplo `192.168.0.10`) e abra no celular:

- `http://192.168.0.10:5173/datashow`
- `http://192.168.0.10:5173/lider/equipe-1`

Se o frontend não conseguir alcançar o backend a partir do celular, crie um arquivo `.env` dentro de `client/` com o conteúdo:

```
VITE_BACKEND_URL=http://<IP-da-máquina>:4000
```

e reinicie o Vite.

## Rotas disponíveis

- `http://localhost:5173/datashow` - tela principal projetada
- `http://localhost:5173/lider/equipe-1`
- `http://localhost:5173/lider/equipe-2`
- `http://localhost:5173/lider/equipe-3`
- `http://localhost:5173/lider/equipe-4`
- `http://localhost:5173/lider/equipe-5`

## Como cada líder acessa

Cada líder acessa sua rota com o `teamId`:

- `equipe-1`
- `equipe-2`
- `equipe-3`
- `equipe-4`
- `equipe-5`

## Como funciona a rodada

1. No datashow, clique em `Iniciar jogo` para resetar o estado.
2. Clique em `Iniciar rodada` para abrir a pergunta atual.
3. Os líderes respondem no celular e podem usar a carta uma vez.
4. Clique em `Mostrar resultado` no datashow para calcular pontos, confiança e vazamento.
5. Clique em `Próxima rodada` para avançar.

## Pontuação

- Verde: +5 pontos
- Azul: +3 pontos
- Amarelo: +1 ponto
- Vermelho: +0 pontos

## Confiança

- Começa em 100 para cada equipe
- Verde: -0
- Azul: -5
- Amarelo: -10
- Vermelho: -20
- Sem resposta: -15

## Medidor de vazamento

- Começa em 0 e vai até 100
- Verde: +0
- Azul: +3
- Amarelo: +6
- Vermelho: +10
- Sem resposta: +8
- Carta bem-sucedida reduz 10 do vazamento desta rodada

## Cartas

Cada equipe tem uma carta única que pode ser usada uma vez por jogo. Ao usar a carta, o backend rola um dado de 1 a 6:

- número par = sucesso
- número ímpar = falha

Se a carta for bem-sucedida, ela reduz em 10 o vazamento causado pela equipe na rodada.

## Observações

O arquivo `server/src/data/questions.json` contém a estrutura e as perguntas baseadas nos temas do PDF. Caso a versão final do PDF esteja disponível, os textos das perguntas e alternativas devem ser atualizados com o conteúdo oficial.
# jogo-rockstar
