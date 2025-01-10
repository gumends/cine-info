'use client';

import { Box, CardMedia, Container, Stack, Tab, Tabs, Typography, CircularProgress } from '@mui/material';
import Content from '@/app/components/Content';
import * as films from '@/services/films.service';
import * as series from '@/services/series.service';
import { Popular } from '@/types/popular.type';
import { IPopular } from '@/types/popular-tv.type';
import React, { useEffect, useState } from 'react';
import Responsive from '@/app/components/CarroselSimples';
import { motion } from 'framer-motion';

function MediaCard({ item }: { item: Popular | IPopular; type: 'filme' | 'serie' | 'anime' }) {
    return (
        <Box
            sx={{
                width: '100%',
                height: '100%',
                position: 'relative',
                borderRadius: 2,
                overflow: 'hidden',
                boxShadow: '0 4px 10px rgba(0, 0, 0, 0.3)',
                transition: 'transform 0.3s ease-in-out',
                '&:hover': { transform: 'scale(0.99)' },
            }}
        >
            <CardMedia
                component="img"
                image={
                    item.backdrop_path
                        ? `https://image.tmdb.org/t/p/original${item.backdrop_path}.jpg`
                        : 'https://via.placeholder.com/150'
                }
                sx={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    cursor: 'pointer',
                    borderRadius: 2,
                }}
            />
            <Typography
                variant="h4"
                sx={{
                    position: 'absolute',
                    bottom: 16,
                    left: 16,
                    color: 'white',
                    backgroundColor: 'rgba(0, 0, 0, 0.6)',
                    padding: '8px 12px',
                    borderRadius: 2,
                    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.8)',
                }}
            >
                {(item as Popular).title || (item as IPopular).name}
            </Typography>
        </Box>
    );
}

export default function Home() {
    const [filmesPopulares, setFilmesPopulares] = useState<Popular[]>([]);
    const [seriesPopulares, setSeriesPopulares] = useState<IPopular[]>([]);
    const [animesPopulares, setAnimesPopulares] = useState<IPopular[]>([]);
    const [loading, setLoading] = useState(true);
    const [value, setValue] = useState('filmes');

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };

    const fetchData = async () => {
        setLoading(true);
        await Promise.all([
            films.buscaPopulares().then((data) => setFilmesPopulares(data.results)),
            series.buscaPopulares().then((data) => setSeriesPopulares(data.results)),
            series.getAnimes().then((data) => setAnimesPopulares(data.results)),
        ]);
        setLoading(false);
    };

    useEffect(() => {
        fetchData();
    }, []);

    if (loading) {
        return (
            <Content>
                <Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                    <CircularProgress color="primary" />
                </Container>
            </Content>
        );
    }

    return (
        <Content
        >
            <Container
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
                maxWidth="lg"
            >
                <Stack
                    spacing={2}
                    sx={{ alignItems: 'center', width: { xs: '100%', sm: '70%' }, marginY: 30 }}
                    component={motion.div}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1 }}
                >
                    <Typography
                        variant="h1"
                        component={motion.h1}
                        initial={{ y: -50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 1, delay: 0.5 }}
                        sx={{
                            display: 'flex',
                            flexDirection: { xs: 'column', sm: 'row' },
                            alignItems: 'center',
                            fontSize: 'clamp(3rem, 10vw, 3.5rem)',
                            fontWeight: 'bold',
                            color: 'text.primary',
                        }}
                    >
                        Cine
                        <Typography
                            component={motion.span}
                            variant="h1"
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 1, delay: 1 }}
                            sx={{
                                fontSize: 'inherit',
                                color: '#00FFFF',
                                fontWeight: 'bold',
                                textShadow: '2px 2px 5px rgba(0, 0, 0, 0.5)',
                            }}
                        >
                            Info
                        </Typography>
                    </Typography>
                </Stack>
                <Stack sx={{ alignItems: 'center', width: '100%', mt: 4 }}>
                    <Typography
                        component="span"
                        variant="h2"
                        sx={{
                            fontSize: '30px',
                            color: '#00FFFF',
                            fontWeight: 'bold',
                            mt: 4,
                        }}
                    >
                        Popularidade atual
                    </Typography>
                </Stack>
                <Stack sx={{width: '150%', mt: 4 }}>
                    <Tabs
                        value={value}
                        onChange={handleChange}
                        indicatorColor="secondary"
                        aria-label="tabs exemplo"
                        sx={{my: 2, backgroundColor: 'rgba(0, 0, 0, 0.5)', width: '100%', height: '70px', borderRadius: 2, display: 'flex', justifyContent: 'center', alignItems: 'center'}}
                    >
                        <Tab value="filmes" label="Filme" sx={{ color: '#00FFFF', ml: 2, fontSize: '20px' }} />
                        <Tab value="series" label="Série" sx={{ color: '#00FFFF', ml: 2, fontSize: '20px' }} />
                        <Tab value="animes" label="Anime" sx={{ color: '#00FFFF', ml: 2, fontSize: '20px' }} />
                    </Tabs>
                    <Box sx={{
                        height: '100%',
                        width: '100%',
                        isplay: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderEndEndRadius: 13,
                        borderEndStartRadius: 13,
                    }}>
                        {value === 'filmes' && filmesPopulares.slice(0, 1).map((filme) => (
                            <MediaCard key={filme.id} item={filme} type="filme"/>
                        ))}
                        {value === 'series' && seriesPopulares.slice(0, 1).map((serie) => (
                            <MediaCard key={serie.id} item={serie} type="serie" />
                        ))}
                        {value === 'animes' && animesPopulares.slice(0, 1).map((anime) => (
                            <MediaCard key={anime.id} item={anime} type="anime" />
                        ))}
                    </Box>

                </Stack>
                <Stack sx={{ alignItems: 'left', width: '100%', mt: 4 }}>
                    <Typography
                        component="span"
                        variant="h2"
                        sx={{
                            fontSize: '20px',
                            color: '#00FFFF',
                            fontWeight: 'bold',
                            mt: 4,
                        }}
                    >
                        Filmes populares
                    </Typography>
                </Stack>
                <Stack sx={{ width: '100%', mt: 4 }}>
                    <Responsive filmes={filmesPopulares} />
                </Stack>
                <Stack sx={{ alignItems: 'left', width: '100%', mt: 4 }}>
                    <Typography
                        component="span"
                        variant="h2"
                        sx={{
                            fontSize: '20px',
                            color: '#00FFFF',
                            fontWeight: 'bold',
                            mt: 4,
                        }}
                    >
                        Series populares
                    </Typography>
                </Stack>
                <Stack sx={{ width: '100%', mt: 4 }}>
                    <Responsive filmes={seriesPopulares} />
                </Stack>
                <Stack sx={{ alignItems: 'left', width: '100%', mt: 4 }}>
                    <Typography
                        component="span"
                        variant="h2"
                        sx={{
                            fontSize: '20px',
                            color: '#00FFFF',
                            fontWeight: 'bold',
                            mt: 4,
                        }}
                    >
                        Animes populares
                    </Typography>
                </Stack>
                <Stack sx={{ width: '100%', mt: 4 }}>
                    <Responsive filmes={animesPopulares} />
                </Stack>
            </Container>
        </Content>
    );
}
