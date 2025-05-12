# Gerenciador de Marcadores 🌿

Esta aplicação foi desenvolvida com o objetivo de ser um **gerenciador de marcadores em áreas geográficas**, auxiliando no **monitoramento e manejo de lavouras**. Com ela, o usuário pode:

- Selecionar e demarcar áreas específicas no mapa;
- Adicionar marcadores dentro dessas áreas;
- Deletar um ou vários marcadores conforme a necessidade.

Essa funcionalidade permite identificar pontos críticos onde alguma ação precisa ser tomada na lavoura.

---

## ⚙️ Estrutura e Tecnologias

### Separação de Responsabilidades

A estrutura do projeto segue o princípio de **separação de responsabilidades**, onde o JSX (estrutura visual) dos componentes é separado da lógica de funcionamento, facilitando a **manutenção e escalabilidade**.

### Testes

- **Testes unitários** com [Vitest](https://vitest.dev/) e [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/);
- **Testes de ponta a ponta (E2E)** com [Playwright](https://playwright.dev/), garantindo maior **segurança e estabilidade** no desenvolvimento de novas funcionalidades;
- Documento de [**BDD (Behavior-Driven Development)**](https://github.com/chrystiansantos/point-manager/Behavior-Driven-Development.md) descrevendo os comportamentos esperados, permitindo a escrita de cenários de teste próximos à experiência real do usuário.

### Tecnologias Utilizadas

- **Interface** construída com [Tailwind CSS](https://tailwindcss.com/), garantindo alta **produtividade e consistência visual**.
- Para renderização do mapa, utilizamos a biblioteca [`@react-google-maps/api`](https://www.npmjs.com/package/@react-google-maps/api), totalmente compatível com React, moderna, leve e com suporte a recursos avançados de mapas.
- O **gerenciamento de estado** é feito com [Zustand](https://zustand-demo.pmnd.rs/), proporcionando uma abordagem simples e eficiente.
- Como ainda não há uma API pronta para consumo, optamos por utilizar o [MSW (Mock Service Worker)](https://mswjs.io/) para simular requisições HTTP, permitindo o desenvolvimento e testes independentes do backend.

---

## 📦 Como Rodar o Projeto

### Requisitos

- **Node.js**.
- **Yarn** ou **npm** para gerenciar pacotes.

### Instalação

1. Clone este repositório:

   ```bash
   git clone https://github.com/chrystiansantos/point-manager
   ```

2. Navegue até o diretório do projeto:

   ```bash
   cd point-manager
   ```

3. Instale as dependências:

   - Usando o npm:

   ```bash
   npm install
   ```

   - Usando o Yarn:

   ```bash
   yarn install
   ```

4. Duplique o arquivo .env-example e renomeie-o para .env. Em seguida, preencha as variáveis de ambiente conforme necessário.

5. Para rodar o projeto no ambiente de desenvolvimento:

   - Usando o npm:

   ```bash
   npm run dev
   ```

   - Usando o Yarn:

   ```bash
   yarn dev
   ```

6. Para executar os teste unitarios:

- Usando o npm:

  ```bash
  npm run test
  ```

  - Usando o Yarn:

  ```bash
  yarn test
  ```

7. Para executar os teste end to end:

- Usando o npm:

  ```bash
   npx playwright test --ui
  ```

  - Usando o Yarn:

  ```bash
  yarn playwright test --ui
  ```

A aplicação estará disponível em [http://localhost:3000](http://localhost:3000).

https://github.com/user-attachments/assets/e2934d20-e9ed-47d2-9b37-0bfbce1847c4
