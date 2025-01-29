'use client';

import { Box, Button, Card, CardContent, CardMedia, CircularProgress, Container, Divider, Typography } from '@mui/material';
import Content from '@/app/components/Content';
import * as films from '@/services/films.service';
import { Popular } from '@/types/popular.type';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Carrossel from '@/app/components/Carrossel'
import LoadingScreen from '../components/Loading';
import * as images from '@/assets/back.png';

export default function Home() {

    const router = useRouter();

    const [filmes, setFilmes] = useState<Popular[]>([]);
    const [filmesPopulares, setFilmesPopulares] = useState<Popular[]>([]);
    const [loading, setLoading] = useState(true);
    const [pagina, setPagina] = useState(1);

    const getRecents = async () => {
        await films.getRecents()
            .then((data) => {
                setFilmes(data.results);
            })
    };

    const getPopulares = async () => {
        setPagina(pagina + 1);
        const data = await films.buscaPopulares(pagina);
        setFilmesPopulares([...filmesPopulares, ...data.results]);
    };

    useEffect(() => {
        getPopulares();
        getRecents();
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
                    sx={{
                        fontSize: '20px',
                        color: '#00FFFF',
                        fontWeight: 'bold',
                        mt: 10,
                    }}
                >
                    Filmes Em Cartaz
                </Typography>
                <Box sx={{ mt: 4, width: '100%', px: { xs: 3, sm: 2 }}}>
                    <Carrossel filmes={filmes} tipo="filmes" />
                </Box>
            </Container>
            <Container sx={{ mt: { xs: 7, sm: 7, md: 17 } }}>
                <Typography
                    component="span"
                    variant="h2"
                    sx={(theme) => ({
                        fontSize: '20px',
                        color: '#00FFFF',
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
                                        sx={{ minWidth: 170, height: 100 }}
                                        image={item.backdrop_path ? `https://image.tmdb.org/t/p/original${item.backdrop_path}.jpg` : images.default.src}
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
                <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mt: 7, pb: 7 }}>
                    <Button variant="contained" onClick={() => { getPopulares() }}>
                        Ver mais
                    </Button>
                </Box>
            </Container>
        </Content >
    );
}
