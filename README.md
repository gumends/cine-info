CineInfo
Bem-vindo ao CineInfo! Um site dedicado a fornecer informações sobre filmes de forma simples e intuitiva. Utilizamos a API TMDB (The Movie Database) para obter as informações mais recentes sobre filmes, como descrições, lançamentos, gêneros e muito mais.

Este projeto foi desenvolvido com Next.js, proporcionando uma excelente experiência para o desenvolvimento de sites rápidos e escaláveis.

Funcionalidades
Pesquise por filmes, visualize detalhes, classificações e sinopses.
Obtenha informações atualizadas sobre os filmes mais populares e lançamentos em destaque.
Utilização da API TMDB para obter dados sobre filmes.
Tecnologias
Next.js: Framework React para renderização do lado do servidor e otimização de desempenho.
TMDB API: API que fornece dados sobre filmes, séries, e muito mais.
Next Font: Usado para otimizar a tipografia e carregar fontes de forma eficiente.
Geist UI: A tipografia escolhida para um design limpo e moderno.
Como começar
Pré-requisitos
Antes de começar, você precisa ter o Node.js instalado. Caso não tenha, você pode baixar e instalar.

Rodando o projeto localmente
Clone o repositório para sua máquina:

bash
Copiar código
git clone https://github.com/seu-usuario/cineinfo.git
cd cineinfo
Instale as dependências do projeto:

bash
Copiar código
npm install
# ou
yarn
# ou
pnpm install
Inicie o servidor de desenvolvimento:

bash
Copiar código
npm run dev
# ou
yarn dev
# ou
pnpm dev
# ou
bun dev
Acesse o site em http://localhost:3000 no seu navegador.

Estrutura do Projeto
app/page.tsx: Página principal onde os dados dos filmes são exibidos.
lib/tmdb.ts: Funções auxiliares para interagir com a API TMDB.
components/: Componentes reutilizáveis para o design do site.
public/: Arquivos públicos, como imagens e ícones.
Recursos úteis
Documentação do Next.js - Saiba mais sobre as funcionalidades e APIs do Next.js.
Documentação da API TMDB - Para entender como funciona a API TMDB e como utilizá-la.
Tutorial Interativo Next.js - Para aprender a construir aplicações com Next.js.
Contribuições
Contribuições são bem-vindas! Se você quiser ajudar a melhorar o CineInfo, siga os seguintes passos:

Faça um fork do repositório.
Crie uma nova branch para suas alterações (git checkout -b feature/nome-da-funcionalidade).
Comite suas alterações (git commit -am 'Adiciona nova funcionalidade').
Envie para o repositório remoto (git push origin feature/nome-da-funcionalidade).
Abra um Pull Request.
