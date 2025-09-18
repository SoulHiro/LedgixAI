# 💰 LedgixAI

Uma aplicação moderna de controle financeiro pessoal desenvolvida com Next.js 15, React 19 e TypeScript, oferecendo uma interface intuitiva para gerenciar suas finanças de forma eficiente.

## 📋 Sobre o Projeto

LedgixAI é uma plataforma completa de gestão financeira que permite aos usuários controlar suas receitas, despesas e investimentos de forma organizada e visual. Com um dashboard interativo e funcionalidades avançadas de análise, a aplicação oferece insights valiosos sobre seus hábitos financeiros.

## ✨ Funcionalidades Principais

### 💳 Gestão de Transações

- **Adicionar Transações**: Registre receitas, despesas e investimentos
- **Categorização Inteligente**: Organize transações por categorias (Moradia, Transporte, Alimentação, etc.)
- **Múltiplos Métodos de Pagamento**: Suporte para cartão de crédito, débito, PIX, transferência bancária e mais
- **Histórico Completo**: Visualize e gerencie todas as suas transações

### 📊 Dashboard Analítico

- **Visão Geral Financeira**: Saldo total, receitas e despesas em tempo real
- **Gráficos Interativos**: Visualização de gastos por categoria
- **Estatísticas Detalhadas**: Análise de padrões de gastos e receitas
- **Resumo Financeiro**: Insights sobre sua situação financeira atual

### 🔐 Sistema de Autenticação

- **Autenticação Segura**: Sistema robusto com Better Auth
- **Gerenciamento de Sessões**: Controle seguro de acesso
- **Perfil de Usuário**: Gestão completa da conta

### 🎨 Interface Moderna

- **Design Responsivo**: Funciona perfeitamente em desktop e mobile
- **Tema Escuro/Claro**: Alternância entre temas para melhor experiência
- **Componentes Reutilizáveis**: Interface consistente e profissional
- **Animações Suaves**: Experiência de usuário aprimorada

## 🛠️ Tecnologias Utilizadas

### Frontend

- **Next.js 15**: Framework React com App Router
- **React 19**: Biblioteca para interfaces de usuário
- **TypeScript**: Tipagem estática para maior segurança
- **Tailwind CSS**: Framework CSS utilitário
- **Radix UI**: Componentes acessíveis e customizáveis
- **Lucide React**: Ícones modernos e consistentes
- **Recharts**: Biblioteca para gráficos e visualizações

### Backend & Banco de Dados

- **PostgreSQL**: Banco de dados relacional robusto
- **Drizzle ORM**: ORM type-safe para TypeScript
- **Better Auth**: Sistema de autenticação moderno

### Ferramentas de Desenvolvimento

- **ESLint**: Linting para qualidade de código
- **Prettier**: Formatação automática de código
- **Husky**: Git hooks para automação
- **Commitizen**: Padronização de commits
- **TypeScript ESLint**: Regras específicas para TypeScript

### Bibliotecas Auxiliares

- **React Hook Form**: Gerenciamento de formulários
- **Zod**: Validação de schemas
- **React Number Format**: Formatação de valores monetários
- **Sonner**: Notificações elegantes
- **Next Themes**: Gerenciamento de temas

## 🚀 Instalação e Configuração

### Pré-requisitos

- Node.js 18+
- pnpm (gerenciador de pacotes recomendado)
- PostgreSQL

### 1. Clone o Repositório

```bash
git clone <url-do-repositorio>
cd LedgixAI
```

### 2. Instale as Dependências

```bash
pnpm install
```

### 3. Configuração do Banco de Dados

1. Crie um banco PostgreSQL
2. Configure as variáveis de ambiente (veja seção abaixo)
3. Execute as migrações:

```bash
pnpm db:push
```

### 4. Variáveis de Ambiente

Crie um arquivo `.env.local` na raiz do projeto:

```env
# Banco de Dados
DATABASE_URL="url"

# Autenticação
BETTER_AUTH_SECRET="seu-secret-key-aqui"
BETTER_AUTH_URL="http://localhost:3000"

# Next.js
NEXTAUTH_URL="http://localhost:3000"
```

### 5. Execute o Projeto

```bash
# Desenvolvimento
pnpm dev

# Produção
pnpm build
pnpm start
```

A aplicação estará disponível em `http://localhost:3000`

## 📁 Estrutura do Projeto

```
src/
├── app/                    # App Router do Next.js
│   ├── (main)/            # Rotas principais
│   │   ├── dashboard/     # Dashboard financeiro
│   │   └── transactions/  # Gestão de transações
│   ├── actions/           # Server Actions
│   ├── api/               # API Routes
│   ├── auth/              # Páginas de autenticação
│   └── types/             # Tipos TypeScript
├── components/            # Componentes React
│   ├── ui/                # Componentes de interface
│   └── _constants/        # Constantes e configurações
├── db/                    # Configuração do banco
│   ├── index.ts           # Conexão com o banco
│   └── schema.ts          # Schema das tabelas
└── lib/                   # Utilitários e configurações
    ├── auth.ts            # Configuração de autenticação
    └── utils.ts           # Funções utilitárias
```

## 🗄️ Schema do Banco de Dados

### Tabelas Principais

#### Users (Usuários)

- `id`: Identificador único
- `name`: Nome do usuário
- `email`: Email (único)
- `emailVerified`: Status de verificação
- `image`: Avatar do usuário

#### Transactions (Transações)

- `id`: UUID único
- `type`: Tipo (DEPOSIT, EXPENSE, INVESTMENT)
- `name`: Descrição da transação
- `amount`: Valor (decimal)
- `category`: Categoria da transação
- `paymentMethod`: Método de pagamento
- `date`: Data da transação
- `userId`: Referência ao usuário

#### Categorias Disponíveis

- HOUSING (Moradia)
- TRANSPORTATION (Transporte)
- FOOD (Alimentação)
- ENTERTAINMENT (Entretenimento)
- HEALTH (Saúde)
- UTILITY (Utilidades)
- SALARY (Salário)
- EDUCATION (Educação)
- OTHER (Outros)

## 🔧 Scripts Disponíveis

```bash
# Desenvolvimento
pnpm dev              # Inicia servidor de desenvolvimento

# Build e Produção
pnpm build            # Gera build de produção
pnpm start            # Inicia servidor de produção

# Qualidade de Código
pnpm lint             # Executa ESLint
pnpm commit           # Commit com Commitizen

# Banco de Dados
pnpm db:push          # Aplica mudanças no schema
pnpm db:studio        # Interface visual do banco
```

## 🤝 Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

### Padrões de Commit

Este projeto utiliza [Conventional Commits](https://www.conventionalcommits.org/):

```
feat: adiciona nova funcionalidade
fix: corrige um bug
docs: atualiza documentação
style: mudanças de formatação
refactor: refatoração de código
test: adiciona ou modifica testes
chore: tarefas de manutenção
```

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

## 🚀 Roadmap

- [ ] Integração com APIs bancárias
- [ ] Relatórios em PDF
- [ ] Metas financeiras
- [ ] Notificações push
- [ ] App mobile
- [ ] Análise de IA para insights financeiros

---

Desenvolvido com ❤️ para ajudar você a ter controle total sobre suas finanças.
