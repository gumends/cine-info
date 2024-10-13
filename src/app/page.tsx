'use client';

import { Box, Card, CardContent, CardMedia, Container, Divider, IconButton, Stack, Typography } from '@mui/material';
import Content from './components/Content';
import { DemoComponent } from './components/Carrosel';
import * as films from '@/services/films.service';
import { PopularResponse } from '@/types/popular.type';
import { Popular } from '@/types/popular.type';
import { Inter } from 'next/font/google';
import { useEffect, useState } from 'react';
import { useTheme } from '@emotion/react';

const inter = Inter({ subsets: ['latin'] })

export default function Home() {

    const [filmes, setFilmes] = useState<Popular[]>([]);
    const [filmesPopulares, setFilmesPopulares] = useState<Popular[]>([]);

    const getRecents = async () => {
        await films.getRecents()
            .then((data) => {
                setFilmes(data.results);
            })
    };

    const getPopulares = async () => {
        await films.buscaPopulares(1)
            .then((data) => {
                setFilmesPopulares(data.results);
            })
    };

    useEffect(() => {
        getRecents();
        getPopulares();
    }, []);


    return (
        <Content>
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
                    useFlexGap
                    sx={{ alignItems: 'center', width: { xs: '100%', sm: '70%' } }}
                >
                    <Typography
                        variant="h1"
                        sx={{
                            display: 'flex',
                            flexDirection: { xs: 'column', sm: 'row' },
                            alignItems: 'center',
                            fontSize: 'clamp(3rem, 10vw, 3.5rem)',
                            fontWeight: 'bold',
                            ...inter.style,
                        }}
                    >
                        Cine
                        <Typography
                            component="span"
                            variant="h1"
                            sx={(theme) => ({
                                fontSize: 'inherit',
                                color: 'success.main',
                                ...theme.applyStyles('dark', {
                                    color: 'success.light',
                                }),
                                fontWeight: 'bold',
                                ...inter.style,
                            })}
                        >
                            Info
                        </Typography>
                    </Typography>
                </Stack>
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
                        ...inter.style,
                        mt: 4,
                    })}
                >
                    Filmes Em Cartaz
                </Typography>
                <Box sx={{ mt: 4 }}>
                    <DemoComponent results={filmes} />
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
                        ...inter.style,
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
                            <Card sx={{ display: 'flex', width: 345, justifyContent: 'space-between' }}>
                                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                    <CardContent sx={{ flex: '1 0 auto' }}>
                                        <Typography
                                            component="div"
                                            variant="body2"
                                            sx={{
                                                fontSize: '12px',
                                                ...inter.style,
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
                                                ...inter.style,
                                             }}
                                        >
                                            {new Date(item.release_date).toISOString().split('T')[0].split('-').reverse().join('/')}
                                        </Typography>
                                    </CardContent>
                                </Box>
                                <CardMedia
                                    component="img"
                                    sx={{ width: 151 }}
                                    image={`https://image.tmdb.org/t/p/original${item.backdrop_path}.jpg`}
                                    alt="Live from space album cover"
                                />
                            </Card>
                        ))
                    }

                </Box>
            </Container>
        </Content>
    );
}
