import process from 'process';

const key = process.env.NEXT_PUBLIC_API_KEY;
async function getPopular() {
    const response = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${key}&language=pt-BR`, {
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
    getPopular
}