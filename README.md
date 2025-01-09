# CineInfo

Bem-vindo ao **CineInfo**! Um site dedicado a fornecer informações sobre filmes e séries de forma simples e intuitiva. Utilizamos a API TMDB (The Movie Database) para obter as informações mais recentes sobre filmes e séries, como descrições, lançamentos, gêneros e muito mais.

Este projeto foi desenvolvido com [Next.js](https://nextjs.org), proporcionando uma excelente experiência para o desenvolvimento de sites rápidos e escaláveis.

Acesse o site ao vivo: [CineInfo](https://cineinfo-info.vercel.app/inicial)

## Funcionalidades

- Pesquise por filmes e séries, visualize detalhes, classificações e sinopses.
- Obtenha informações atualizadas sobre os filmes e séries mais populares, lançamentos e destaques.
- Utilização da API TMDB para obter dados sobre filmes e séries.

## Tecnologias

- **[Next.js](https://nextjs.org)**: Framework React para renderização do lado do servidor e otimização de desempenho.
- **[TMDB API](https://www.themoviedb.org/documentation/api)**: API que fornece dados sobre filmes, séries, e muito mais.
- **[Next Font](https://nextjs.org/docs/app/building-your-application/optimizing/fonts)**: Usado para otimizar a tipografia e carregar fontes de forma eficiente.
- **[Geist UI](https://vercel.com/font)**: A tipografia escolhida para um design limpo e moderno.

## Como começar

### Pré-requisitos

Antes de começar, você precisa ter o Node.js instalado. Caso não tenha, você pode [baixar e instalar](https://nodejs.org).

### Rodando o projeto localmente

1. Clone o repositório para sua máquina:

    ```bash
    git clone https://github.com/seu-usuario/cineinfo.git
    cd cineinfo
    ```

2. Instale as dependências do projeto:

    ```bash
    npm install
    # ou
    yarn
    # ou
    pnpm install
    ```

3. Inicie o servidor de desenvolvimento:

    ```bash
    npm run dev
    # ou
    yarn dev
    # ou
    pnpm dev
    # ou
    bun dev
    ```

4. Acesse o site em [http://localhost:3000](http://localhost:3000) no seu navegador.

## Estrutura do Projeto

- `app/page.tsx`: Página principal onde os dados dos filmes e séries são exibidos.
- `lib/tmdb.ts`: Funções auxiliares para interagir com a API TMDB.
- `components/`: Componentes reutilizáveis para o design do site.
- `public/`: Arquivos públicos, como imagens e ícones.

## Recursos úteis

- [Documentação do Next.js](https://nextjs.org/docs) - Saiba mais sobre as funcionalidades e APIs do Next.js.
- [Documentação da API TMDB](https://www.themoviedb.org/documentation/api) - Para entender como funciona a API TMDB e como utilizá-la.
- [Tutorial Interativo Next.js](https://nextjs.org/learn) - Para aprender a construir aplicações com Next.js.

## Contribuições

Contribuições são bem-vindas! Se você quiser ajudar a melhorar o CineInfo, siga os seguintes passos:

1. Faça um fork do repositório.
2. Crie uma nova branch para suas alterações (`git checkout -b feature/nome-da-funcionalidade`).
3. Comite suas alterações (`git commit -am 'Adiciona nova funcionalidade'`).
4. Envie para o repositório remoto (`git push origin feature/nome-da-funcionalidade`).
5. Abra um Pull Request.
