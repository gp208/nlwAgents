# Let Me Ask

Plataforma de perguntas e respostas para transmissões ao vivo, combinada com agente de IA que transcreve áudio, gera vetores semânticos para análise de similaridade
e gera respostas baseadas no contexto.

> Construção de aplicações full-stack, conguração de back-end com Node.js e Fastify, uso de Docker e
 PostgreSQL com Drizzle ORM, desenvolvimento de front-end com React, Vite e Tailwind CSS, gerenciamento de rotas
 com React Router DOM, consumo de APIs com React Query, criação de hooks personalizados, gravação e upload de
 áudio no navegador e integração com Inteligência Artificial para transcrição, geração de embeddings e criação de
 respostas inteligentes com a API do Gemini.

Desenvolvido no evento <b>NLW Agents - Avançado</b> (7&ndash;13/07/2025) da [Rocketseat](https://github.com/rocketseat)

## Configuração
Requisitos:
* Docker
* Node.js (versão com suporte a `--experimental-strip-types`)

1. Abrir um terminal e clonar o repositório:
```bash
git clone https://github.com/gp208/nlwAgents
cd nlwAgents/server
```
2. Configurar o banco de dados:
```bash
docker-compose up -d
```
3. Configurar variáveis de ambiente. Criar um arquivo `.env` em `/server`:
```bash
PORT=3333
DATABASE_URL='postgresql://docker:docker@localhost:5432/agents'
GEMINI_API_KEY='(chave API)'
```
A chave da API Gemini é criada no Google AI Studio.

4. Instalar dependências:
```bash
npm install
```
5. Aplicar migrações do banco de dados
```bash
npx drizzle-kit migrate
```
6. (Opcional) Inserir dados de exemplo no banco:
```bash
npm run db:seed
```
7. Iniciar o servidor. Desenvolvimento:
```bash
npm run dev
```
Ou produção:
```bash
npm start
```
8. Abrir outro terminal e acessar o diretório do front-end:
```bash
cd nlwAgents/web
```
9. Instalar dependências:
```bash
npm install
```
10. Executar o servidor de desenvolvimento:
```bash
npm run dev
```
11. Acessar a aplicação em `http://localhost:5173`
