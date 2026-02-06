# FLDSAPP - Estrutura do Projeto

## Overview
Projeto React + Vite com autenticação e modal para recuperação de senha.

---

## Estrutura de Pastas

```
FLDSAPP/
├── src/
│   ├── components/
│   │   ├── Loginpage.jsx            ✓ Página de login com email e senha
│   │   ├── DashboardsPage.jsx       ✓ Página principal com dashboards
│   │   └── center/
│   │       ├── Modal.jsx            ⏳ (a criar)
│   │       └── Modais/
│   │           └── Modalsenha.jsx   ⏳ (a criar)
│   ├── hooks/
│   │   ├── useLogin.js              ⏳ (a criar)
│   │   └── useModal.js              ⏳ (a criar)
│   ├── assets/
│   ├── App.jsx
│   ├── App.css
│   ├── main.jsx
│   └── index.css
├── public/
│   └── florinids.png                (imagem do login)
├── index.html
├── package.json
├── vite.config.js
├── eslint.config.js
└── README.md
```

---

## Componentes

### ✓ Loginpage.jsx
- **Localização:** `src/components/Loginpage.jsx`
- **Status:** Criado
- **Descrição:** Página de login com formulário de email e senha
- **Features:**
  - Campo de email
  - Campo de senha
  - Botão de submissão
  - Link para recuperar senha (abre modal)
  - Exibição de erros
  - Indicador de loading
- **Props:** Nenhuma
- **State:**
  - `email` - email do utilizador
  - `password` - senha do utilizador

### ✓ DashboardsPage.jsx
- **Localização:** `src/components/DashboardsPage.jsx`
- **Status:** Criado
- **Descrição:** Página principal com 3 tipos de dashboards após login
- **Features:**
  - Dashboards Genérico (amarelo) - com múltiplas opções (Vendas, Compras, Clientes, Fornecedores, Artigos&Stocks, Rentabilidade)
  - Dashboards Modular (verde) - para futuros módulos
  - Dashboards Tailored (azul) - para customizações
- **Props:** Nenhuma
- **State:**
  - `activeGenerico` - dashboard ativo na seção genérica
  - `activeModular` - dashboard ativo na seção modular
  - `activeTailored` - dashboard ativo na seção tailored

### ⏳ Modal.jsx
- **Localização:** `src/components/center/Modal.jsx`
- **Status:** ✓ Criado
- **Descrição:** Componente modal genérico reutilizável

### ⏳ Modalsenha.jsx
- **Localização:** `src/components/center/Modais/Modalsenha.jsx`
- **Status:** ✓ Criado
- **Descrição:** Modal para recuperação de senha

---

## Hooks

### ✓ useLogin.js
- **Localização:** `src/hooks/useLogin.js`
- **Status:** ✓ Criado
- **Descrição:** Hook para gerenciar autenticação
- **Retorna:**
  - `login(email, password)` - função para fazer login
  - `loading` - boolean indicando carregamento
  - `error` - mensagem de erro

### ✓ useModal.js
- **Localização:** `src/hooks/useModal.js`
- **Status:** ✓ Criado
- **Descrição:** Hook para gerenciar estado do modal
- **Retorna:**
  - `isOpen` - boolean indicando se modal está aberto
  - `openModal()` - função para abrir
  - `closeModal()` - função para fechar

---

## Configuração

- **Framework:** React
- **Build Tool:** Vite
- **Styling:** Tailwind CSS
- **Linter:** ESLint

---

## Próximos Passos

1. Testar o login com validações básicas
2. Implementar roteamento (Loginpage → DashboardsPage)
3. Conectar API real para autenticação
4. Adicionar persistência de sessão (localStorage/sessionStorage)
5. Criar componentes SplashScreen ou Dashboard de vendas

