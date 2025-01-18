'use client';

import { Box, Container, Stack, Typography, CircularProgress } from '@mui/material';
import Content from '@/app/components/Content';
import * as films from '@/services/films.service';
import * as series from '@/services/series.service';
import { Popular } from '@/types/popular.type';
import { IPopular } from '@/types/popular-tv.type';
import React, { useEffect, useState } from 'react';
import Responsive from '@/app/components/CarroselSimples';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useRouter } from 'next/navigation';

export default function Home() {
    const [filmesPopulares, setFilmesPopulares] = useState<Popular[]>([]);
    const [seriesPopulares, setSeriesPopulares] = useState<IPopular[]>([]);
    const [filmesEmCartaz, setFilmesEmCartaz] = useState<Popular[]>([]);

    const router = useRouter();

    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
        setLoading(true);
        await Promise.all([
            films.buscaPopulares().then((data) => setFilmesPopulares(data.results)),
            series.buscaPopulares().then((data) => setSeriesPopulares(data.results)),
            films.getFilmesEmCartaz().then((data) => setFilmesEmCartaz(data.results))
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

    const settings = {
        fade: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        waitForAnimate: false,
        autoplay: true,
        autoplaySpeed: 10000,
        cssEase: "linear",
    };

    return (
        <Content>
            <Stack
                sx={{
                    position: 'relative',
                    width: '100vw',
                    height: '100vh',
                    overflow: 'hidden',
                    top: -179
                }}
            >
                <Stack
                    sx={{
                        position: 'relative',
                        width: '100%',
                        height: '100vh', // Define a altura total da tela
                        overflow: 'hidden',
                    }}
                >
                    {/* Imagem de fundo */}
                    <div className='slider-container' style={{ position: 'relative', width: '100%', height: '100%' }}>
                        <Slider {...settings}>
                            {filmesPopulares.map((filme) => (
                                <>
                                    <Box key={filme.id} sx={{ position: 'relative', width: '100%', height: '100%' }}>
                                        <img
                                            src={
                                                filme.backdrop_path
                                                    ? `https://image.tmdb.org/t/p/original${filme.backdrop_path}.jpg`
                                                    : 'https://via.placeholder.com/150'
                                            }
                                            alt="Filme Popular"
                                            style={{
                                                width: '100%',
                                                height: '100%',
                                                objectFit: 'cover',
                                            }}
                                        />
                                    </Box>
                                    <Box
                                        sx={{
                                            position: 'absolute',
                                            top: 0,
                                            left: 0,
                                            width: '50%',
                                            height: '100%',
                                            background: 'linear-gradient(to right, rgb(0, 0, 0), rgba(0, 0, 0, 0.94), rgba(0, 0, 0, 0.8), rgba(255, 255, 255, 0))',
                                            pl: 10,
                                            mt: -10,
                                            display: 'flex',
                                            flexDirection: 'column',
                                            justifyContent: 'center',
                                        }}
                                    >
                                        <Box>
                                            <Typography
                                                component="h1"
                                                variant="h1"
                                                sx={{
                                                    fontSize: '40px',
                                                    fontWeight: 'bold',
                                                }}
                                            >
                                                {filme.title}
                                            </Typography>
                                            <Box>
                                                <Typography
                                                    component="p"
                                                    variant="body1"
                                                    sx={{
                                                        fontSize: '16px',
                                                        color: filme.adult ? 'rgba(255, 0, 0, 0.8)' : 'rgba(17, 207, 0, 0.8)',
                                                        bgcolor: filme.adult ? 'rgba(255, 0, 0, 0.8)' : 'rgba(9, 104, 0, 0.8)',
                                                        display: 'inline-block',
                                                        px: 1,
                                                        mr: 1,
                                                        mt: 1
                                                    }}
                                                >
                                                    {filme.adult ? '18+' : 'L'}
                                                </Typography>
                                                <Typography
                                                    component="p"
                                                    variant="body1"
                                                    sx={{
                                                        fontSize: '16px',
                                                        color: 'rgba(255, 255, 255, 0.8)',
                                                        bgcolor: 'rgba(0, 0, 0, 0.8)',
                                                        display: 'inline-block',
                                                        px: 1,
                                                    }}
                                                >
                                                    {filme.release_date.toString().substring(0, 4)}
                                                </Typography>
                                            </Box>
                                            <Typography
                                                variant="body1"
                                                sx={{
                                                    fontSize: '20px',
                                                    mt: 2,
                                                    color: 'rgba(255, 255, 255, 0.8)',
                                                    width: '60%',
                                                }}
                                            >
                                                {filme.overview}
                                            </Typography>
                                            <Box
                                                sx={{
                                                    display: 'flex',
                                                    justifyContent: 'center',
                                                    width: '50%',
                                                }}
                                            >
                                                <Box
                                                    sx={{
                                                        gap: 2,
                                                        mt: 2,
                                                        bgcolor: 'rgb(43, 16, 105)',
                                                        display: 'inline-block',
                                                        px: 5,
                                                        py: 1,
                                                        borderRadius: 1,
                                                        fontWeight: 'bold',
                                                        cursor: 'pointer',
                                                        color: 'rgba(255, 255, 255, 0.8)',
                                                        '&:hover': {
                                                            bgcolor: 'rgba(43, 16, 105, 0.79)',
                                                            color: 'rgba(255, 255, 255, 0.8)',
                                                        },
                                                        fontSize: '17px',
                                                    }}
                                                    onClick={() => {
                                                        router.push(`/filmes/detalhes?id=${filme.id}`);
                                                    }}
                                                >
                                                    Mais informações
                                                </Box>
                                            </Box>
                                        </Box>
                                    </Box>
                                </>
                            ))}
                        </Slider>
                    </div>
                    <Box
                        sx={{
                            position: 'absolute',
                            bottom: 0,
                            left: 0,
                            width: '100%',
                            height: '30%', // Tamanho do gradiente (ajustável)
                            background: 'linear-gradient(to top, rgba(0, 0, 0, 0.7), transparent)',
                        }}
                    />
                </Stack>
            </Stack>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    position: 'relative',
                    mx: 20,
                    mt: -50
                }}
            >
                <Stack sx={{ alignItems: 'left', width: '100%' }}>
                    <Typography
                        component="span"
                        variant="h2"
                        sx={{
                            fontSize: '30px',
                            color: '#00FFFF',
                            fontWeight: 'bold',
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
                            fontSize: '30px',
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

            </Box>
            <Box sx={{
                width: '100%',
                mt: 4,
                height: '100%',
                background: 'linear-gradient(to bottom, transparent, rgba(0, 0, 0, 0.8), rgb(0, 0, 0))',
                mb: 3,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                position: 'relative',
                px: 20
            }}>
                <Stack sx={{ alignItems: 'left', width: '100%', mt: 4 }}>
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
                        Filmes em cartaz
                    </Typography>
                </Stack>
                <Stack sx={{ width: '100%', mt: 4 }}>
                    <Responsive filmes={filmesEmCartaz} />
                </Stack>
            </Box>
        </Content >
    );
}
