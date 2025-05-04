<h1 align="center">hAIking</h1>
<p align="center">Projeto de estudo para consulta de trilhas utilizando protocolo MCP.</p>



![Next JS](https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)
![Zod](https://img.shields.io/badge/zod-%233068b7.svg?style=for-the-badge&logo=zod&logoColor=white)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)

## Principais Dependências e Versões

Aqui está uma lista das principais dependências usadas neste projeto e suas respectivas versões:

*   **Next.js:** `15.2.3` - O framework React para construção de aplicações web.
*   **AI SDK (Groq):** `^1.2.1` - SDK para interagir com modelos de IA Groq.
*   **AI:** `^4.2.2` - Biblioteca geral de IA.
*   **Tailwind CSS:** `^4` - Um framework CSS utilitário-primeiro.
*   **Zod:** `^3.24.2` - Uma biblioteca de validação de esquema TypeScript-first.
*   **Typescript:** `^5` - Linguagem para verificação de tipos.
*   **Eslint:** `^9` - Linter para javascript e typescript.

## Instalação

Para configurar o projeto localmente, siga estes passos:

1.  **Clone o repositório:**

    ```bash
    git clone https://github.com/carloshenriquesa/toeisendo
    cd toeisendo
    ```

2.  **Instale as dependências:**

    ```bash
    npm install
    ```

    ou

    ```bash
    yarn install
    ```

3. **Variáveis de ambiente**
   
   Necessário criar uma conta no Groq (https://groq.com) e criar seu token.
   Criar o arquivo `.env.local` na raiz do projeto e incluir seu token com o nome da variável `NEXT_PUBLIC_GROC_API_KEY`:

   ```bash
   // .env.local
   
    NEXT_PUBLIC_GROC_API_KEY=<seu_token>
    ```

## Execução Local

Após as dependências serem instaladas, você pode executar o projeto localmente usando os seguintes comandos:

1.  **Modo de desenvolvimento:**

    ```bash
    npm run dev
    ```

    ou

    ```bash
    yarn dev
    ```

    Isso iniciará o servidor de desenvolvimento, e você poderá acessar a aplicação no seu navegador em `http://localhost:3000`.
    
3.  **Build para produção:**

    ```bash
    npm run build
    ```

    ou

    ```bash
    yarn build
    ```

    Este comando irá criar um build de produção otimizado da aplicação no diretório `.next`.

4.  **Iniciar servidor de produção:**

    ```bash
    npm run start
    ```

    ou

    ```bash
    yarn start
    ```

    Isso iniciará um servidor de produção que servirá a aplicação construída.

5. **Lint**
    ```bash
    npm run lint
    ```
    ou
    ```bash
    yarn lint
    ```
    Este comando irá executar o linter para verificar a qualidade do código.


## Licença

[![CC0](https://licensebuttons.net/p/zero/1.0/88x31.png)](https://creativecommons.org/publicdomain/zero/1.0/)

