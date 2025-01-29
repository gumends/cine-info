import process from 'process';

const key = process.env.NEXT_PUBLIC_API_KEY;
async function getPessoas(nome: string, page: number) {
    const response = await fetch(`https://api.themoviedb.org/3/search/person?query=${nome}&api_key=${key}&language=pt-BR&page=${page}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    });
    if (!response.ok) {
        throw new Error(response.statusText);
    }
    return response.json();
}

async function getPessoa(id: string) {
    const response = await fetch(`https://api.themoviedb.org/3/person/${id}?api_key=${key}&language=pt-BR`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    });
    if (!response.ok) {
        throw new Error(response.statusText);
    }
    return response.json();
}

async function getPessoaFilmes(id: string) {
    const response = await fetch(`https://api.themoviedb.org/3/person/${id}/movie_credits?api_key=${key}&language=pt-BR`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    });
    if (!response.ok) {
        throw new Error(response.statusText);
    }
    return response.json();
}

async function getPessoaTv(id: string) {
    const response = await fetch(`https://api.themoviedb.org/3/person/${id}/tv_credits?api_key=${key}&language=pt-BR`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    });
    if (!response.ok) {
        throw new Error(response.statusText);
    }
    return response.json();
}

    
export { getPessoa, getPessoas, getPessoaFilmes, getPessoaTv };