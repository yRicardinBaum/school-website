# 📚 School Website

Uma plataforma educacional moderna desenvolvida com **Next.js**, focada na organização de atividades escolares, autenticação segura e arquitetura escalável. 
Este é um antigo projeto meu, em que a minha antiga instituição de ensino exigia que cada aluno tivesse um portal em que fosse possivel analisar todas as suas atividades. 
Este é uma versão reescrita da original, corrigido alguns bugs e erros de semântica e desempenho, além de melhorias da estrutura do código e boas práticas.

---

## 🚀 Funcionalidades

- 📖 Visualização de atividades escolares  
- 🔍 Página de detalhes da atividade (`/atividade/[id]`)  
- 🔐 Sistema de autenticação desacoplado  
- 🗂️ Persistência de dados com Prisma  
- ⚡ Renderização Server-Side com App Router  
- 🧱 Arquitetura modular e escalável  

---

## 🛠️ Tecnologias Utilizadas

- **Next.js (App Router)**
- **TypeScript**
- **Prisma ORM**
- **SQLite / PostgreSQL**
- **Bun**
- **CSS moderno (TailwindCSS/ShadCN)**
- **Server Components**
- **Autenticação customizada**
- **AWS S3**
- **Sistema de autenticação**
- **Proteção de rotas**
- **Infinite Scroll Query**

---

## 📁 Estrutura do Projeto

```txt
app/            # Rotas e páginas (App Router)
components/     # Componentes reutilizáveis
auth/           # Sistema de autenticação
lib/            # Utilitários e integrações
prisma/         # Schema e conexão com banco
public/         # Assets estáticos
```


---

## 🧪 Boas Práticas Aplicadas

- **Separação clara de responsabilidades**
- **Uso de Server Components para acesso ao banco**
- **Código fortemente tipado com TypeScript**
- **Estrutura preparada para crescimento**
- **Organização inspirada em projetos reais de produção**


---

## 🧠 Objetivo do Projeto

Este projeto foi desenvolvido com foco em:
- **Aprendizado avançado de Next.js**
- **Aplicação de arquitetura profissional**
- **Simulação de um produto real**
- **Composição de portfólio técnico**


---

## ▶️ Como executar o projeto
```bash
# Fazer clone do projeto
git clone https://github.com/yRicardinBaum/school-website && cd school-website

# Instalar dependências
bun install

# Gerar o cliente do Prisma
bunx prisma generate

# Rodar migrações
bunx prisma migrate dev

# Iniciar o projeto em modo desenvolvedor
bun dev

# Fazer a build do NextJS
bun dev

# Iniciar o projeto em produção
bun start
```