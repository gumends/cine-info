import process from 'process';

const key = process.env.NEXT_PUBLIC_API_KEY;
async function getRecents() {
    const response = await fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=${key}&language=pt-BR&limit=2`, {
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

async function buscaGenero(id: string) {
    const response = await fetch(`https://api.themoviedb.org/3/genre/${id}?api_key=${key}&language=pt-BR`, {
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
async function buscaPopulares(page: number = 1) {
    const response = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${key}&language=pt-BR&page=${page}`, {
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

export {
    getRecents,
    buscaGenero,
    buscaPopulares
}