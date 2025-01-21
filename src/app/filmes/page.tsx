'use client';

import { Box, Button, Card, CardContent, CardMedia, CircularProgress, Container, Divider, Typography } from '@mui/material';
import Content from '@/app/components/Content';
import * as films from '@/services/films.service';
import { Popular } from '@/types/popular.type';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Carrosel from '@/app/components/Carrosel'
import LoadingScreen from '../components/Loading';

export default function Home() {

    const router = useRouter();

    const [filmes, setFilmes] = useState<Popular[]>([]);
    const [filmesPopulares, setFilmesPopulares] = useState<Popular[]>([]);
    const [loading, setLoading] = useState(true);
    const [pagina, setPagina] = useState(0);

    const getRecents = async () => {
        await films.getRecents()
            .then((data) => {
                setFilmes(data.results);
            })
    };

    const getPopulares = async () => {
        const data = await films.buscaPopulares(pagina + 1);
        setPagina((prevPagina) => prevPagina + 1);
        setFilmesPopulares((prevFilmes) => [...prevFilmes, ...data.results]); 
    };

    useEffect(() => {
        getRecents();
        getPopulares();
        setTimeout(() => {
            setLoading(false);
        }, 2000);
    }, []);

    return (
        <Content>
            {loading && <LoadingScreen />}
            <Container
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
                maxWidth="lg"
            >
                <Typography
                    component="span"
                    variant="h2"
                    sx={(theme) => ({
                        fontSize: '20px',
                        color: 'success.main',
                        ...theme.applyStyles('dark', {
                            color: 'success.light',
                        }),
                        fontWeight: 'bold',
                        mt: 4,
                    })}
                >
                    Filmes Em Cartaz
                </Typography>
                <Box sx={{ mt: 4, width: '100%',  }}>
                <Carrosel filmes={filmes} tipo="filmes" />
                </Box>
            </Container>
            <Container sx={{ mt: 19 }}>
                <Typography
                    component="span"
                    variant="h2"
                    sx={(theme) => ({
                        fontSize: '20px',
                        color: 'success.main',
                        ...theme.applyStyles('dark', {
                            color: 'success.light',
                        }),
                        fontWeight: 'bold',
                        mt: 4,
                    })}
                >
                    Filmes Populares
                </Typography>
                <Divider sx={{ my: 4 }} />
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-around',
                        flexWrap: 'wrap',
                        alignItems: 'center',
                        gap: 3
                    }}
                >
                    {
                        filmesPopulares.map((item) => (
                            <Card
                                key={item.id}
                                onClick={() => { router.push(`/filmes/detalhes?id=${item.id}`) }}
                                sx={{
                                    display: 'flex',
                                    width: 345,
                                    height: 170,
                                    justifyContent: 'space-between',
                                    cursor: 'pointer',
                                    '&:hover': {
                                        filter: 'brightness(0.9)',
                                    },
                                    position: 'relative'
                                }}>
                                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                    <CardContent sx={{ flex: '1 0 auto' }}>
                                        <Typography
                                            component="div"
                                            variant="body2"
                                            sx={{
                                                fontSize: '12px',
                                            }}
                                        >
                                            {item.title}
                                        </Typography>
                                        <Typography
                                            variant="subtitle1"
                                            component="div"
                                            sx={{
                                                color: 'text.secondary',
                                                fontSize: '12px',
                                            }}
                                        >
                                            {item.release_date && new Date(item.release_date).toISOString().split('T')[0].split('-').reverse().join('/')}
                                        </Typography>
                                    </CardContent>

                                </Box>
                                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                                    <CardMedia
                                        component="img"
                                        sx={{ width: 170, height: 100 }}
                                        image={item.backdrop_path ? `https://image.tmdb.org/t/p/original${item.backdrop_path}.jpg` : 'https://via.placeholder.com/150'}
                                        alt="Live from space album cover"
                                    />
                                </Box>
                                <Box sx={{ position: 'absolute', bottom: 2, left: 6 }}>
                                    <Box sx={{ position: 'relative', display: 'inline-flex' }}>
                                        <CircularProgress
                                            color={'info'}
                                            variant="determinate"
                                            value={item.vote_average * 10}
                                        />
                                        <Box
                                            sx={{
                                                top: 0,
                                                left: 0,
                                                bottom: 0,
                                                right: 0,
                                                position: 'absolute',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                            }}
                                        >
                                            <Typography
                                                variant="caption"
                                                component="div"
                                                sx={{ color: 'text.secondary' }}
                                            >{item.vote_average.toFixed(1)}
                                            </Typography>
                                        </Box>
                                    </Box>
                                </Box>
                            </Card>
                        ))
                    }
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mt: 7 }}>
                    <Button variant="contained" onClick={() => { getPopulares() }}>
                        Ver mais
                    </Button>
                </Box>
            </Container>
        </Content >
    );
}
