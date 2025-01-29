'use client';

import { Box, Button, Card, CardContent, CardMedia, CircularProgress, Container, Divider, Typography } from '@mui/material';
import Content from '@/app/components/Content';
import Carrossel from '@/app/components/Carrossel'
import * as series from '@/services/series.service';
import { IPopular } from '@/types/popular-tv.type';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import LoadingScreen from '../components/Loading';
import * as images from '@/assets/back.png';
export default function Home() {

    const router = useRouter();

    const [seriesRecentes, setSeriesRecentes] = useState<IPopular[]>([]);
    const [seriesPopulares, setSeriesPopulares] = useState<IPopular[]>([]);
    const [loading, setLoading] = useState(true);
    const [pagina, setPagina] = useState(1);

    const getPopulares = async () => {
        const data = await series.buscaPopulares(pagina + 1);
        setPagina((prevPagina) => prevPagina + 1);
        setSeriesPopulares((prevFilmes) => [...prevFilmes, ...data.results]);
    };

    const fatchData = async () => {
        await Promise.all([
            series.getRecents()
                .then((data) => {
                    setSeriesRecentes(data.results);
                }),
            getPopulares()
        ]);
        setTimeout(() => {
            setLoading(false);
        }, 2000);
    }

    useEffect(() => {
        fatchData();
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
                        color: '#00FFFF',
                        fontWeight: 'bold',
                        mt: 10,
                    })}
                >
                    Séries Recentes
                </Typography>
                <Box sx={{ mt: 4, width: '100%', px: { xs: 3, sm: 2 } }}>
                    {seriesRecentes.length > 0 ? <Carrossel filmes={seriesRecentes} tipo='tv-series' /> : null}
                </Box>
            </Container>
            <Container sx={{ mt: 19 }}>
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
                    Séries Populares
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
                        seriesPopulares.map((item) => (
                            <Card
                                key={item.id}
                                onClick={() => { router.push(`/tv-series/detalhes?id=${item.id}`) }}
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
                                            {item.name}
                                        </Typography>
                                        <Typography
                                            variant="subtitle1"
                                            component="div"
                                            sx={{
                                                color: 'text.secondary',
                                                fontSize: '12px',
                                            }}
                                        >

                                        </Typography>
                                    </CardContent>

                                </Box>
                                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                                    <CardMedia
                                        component="img"
                                        sx={{ width: 170, height: 100 }}
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
                <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mt: 7 }}>
                    <Button variant="contained" onClick={() => { getPopulares() }}>
                        Ver mais
                    </Button>
                </Box>
            </Container>
        </Content >
    );
}
