import { IFilme } from '@/types/filmes.type';
import { IElencoResponse } from '@/types/elenco.type';
import { IVideosResponse } from '@/types/videos.type';
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
async function getFilme(id: number): Promise<IFilme> {
    const response = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${key}&language=pt-BR`, {
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

async function getVideos(id: number): Promise<IVideosResponse> {
    const response = await fetch(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=${key}&language=pt-BR`, {
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

async function getCredts(id: number): Promise<IElencoResponse> {
    const response = await fetch(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=${key}&language=pt-BR`, {
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

async function getFilmePorNome(nomeDoFilme: string) {
    const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${key}&query=${encodeURIComponent(nomeDoFilme)}&language=pt-BR`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    });

    if (!response.ok) {
        throw new Error(response.statusText);
    }
    const data = await response.json();
    return data.results;
}

async function getServices(id: number) {
    const response = await fetch(`https://api.themoviedb.org/3/movie/${id}/watch/providers?api_key=${key}&region=BR`, {
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
    buscaPopulares,
    getFilme,
    getCredts,
    getVideos,
    getFilmePorNome,
    getServices
}