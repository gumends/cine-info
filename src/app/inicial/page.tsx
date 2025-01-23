'use client';

import { Box, Stack, Typography } from '@mui/material';
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
import LoadingScreen from '../components/Loading';
import { IFilme, IReleaseDatesResult } from '@/types/filmes.type';

export default function Home() {
    const [filmesPopulares, setFilmesPopulares] = useState<Popular[]>([]);
    const [seriesPopulares, setSeriesPopulares] = useState<IPopular[]>([]);
    const [filmesEmCartaz, setFilmesEmCartaz] = useState<Popular[]>([]);
    const [classificacoes, setClassificacoes] = useState<{ [id: number]: string }>({});
    const router = useRouter();
    const [loading, setLoading] = useState(true);

    const formatarData = (data: string) => {
        const [ano, mes, dia] = data.split('-');
        return `${dia}/${mes}/${ano}`;
    };

    const definirClassificacao = (certification: string) => {
        if (!certification) {
            return ['Não classificado', 'rgba(206, 110, 0, 0.3)', 'rgb(206, 110, 0)'];
        }
        if (isNaN(Number(certification))) {
            return ['L', 'rgba(0, 156, 21, 0.3)', 'rgb(0, 156, 21)'];
        }
        const idade = parseInt(certification, 10);
        if (idade < 18) {
            return [certification, 'rgba(156, 83, 0, 0.3)', 'rgb(255, 136, 0)'];
        }
        return [`${certification}+`, 'rgba(255, 0, 0, 0.3)', 'rgb(255, 0, 0)'];
    };

    const fetchData = async () => {
        setLoading(true);

        try {
            const [populares, seriesPopulares, filmesEmCartaz] = await Promise.all([
                films.buscaPopulares(),
                series.buscaPopulares(),
                films.getFilmesEmCartaz(),
            ]);

            setFilmesPopulares(populares.results);
            setSeriesPopulares(seriesPopulares.results);
            setFilmesEmCartaz(filmesEmCartaz.results);

            const classificacoesData = await Promise.all(
                populares.results.map(async (filme: IFilme) => {
                    const detalhes = await films.getFilme(filme.id);
                    const brRelease = detalhes.release_dates.results.find(
                        (release: IReleaseDatesResult) => release.iso_3166_1 === 'BR'
                    );
                    return {
                        id: filme.id,
                        classificacao: brRelease?.release_dates[0]?.certification || '',
                    };
                })
            );

            const classificacoesMap = classificacoesData.reduce((acc, item) => {
                acc[item.id] = item.classificacao;
                return acc;
            }, {} as { [id: number]: string });

            setClassificacoes(classificacoesMap);
        } catch (error) {
            console.error('Erro ao buscar os dados:', error);
        } finally {
            setTimeout(() => setLoading(false), 2000);
        }
    };
    useEffect(() => {
        fetchData();
    }, []);

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
            {loading && <LoadingScreen />}
            <Stack
                sx={{
                    position: 'relative',
                    width: '100vw',
                    overflow: 'hidden',
                    top: { xs: -70, sm: -90, md: -179 },
                    boxShadow: '1px 300px 200px rgb(0, 0, 0)',
                }}
            >
                <Stack
                    sx={{
                        position: 'relative',
                        width: '100%',
                        display: { xs: 'none', sm: 'flex', md: 'flex' },
                    }}
                >
                    {/* Imagem de fundo */}
                    <div className='slider-container' style={{ position: 'relative', width: '100%', height: '100%' }}>
                        <Slider {...settings}>
                            {filmesPopulares.map((filme) => {
                                const [label, bgColor, color] = definirClassificacao(classificacoes[filme.id] || '');
                                return (
                                    <>
                                        <Box key={filme.id} sx={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden' }}>
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
                                                pl: { sm: 5, md: 10 },
                                                display: 'flex',
                                                flexDirection: 'column',
                                                justifyContent: 'center',
                                            }}
                                        >
                                            <Box
                                                sx={{
                                                    mb: { xs: 1, sm: 2, md: 3, lg: 4 },
                                                }}
                                            >
                                                <Typography
                                                    component="h1"
                                                    variant="h1"
                                                    sx={{
                                                        fontSize: { xs: '15px', sm: '20px', md: '30px', lg: '40px' },
                                                        fontWeight: 'bold',
                                                    }}
                                                >
                                                    {filme.title}
                                                </Typography>
                                                <Box
                                                    sx={{
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                    }}
                                                >
                                                    <Typography sx={{ mr: 2, fontSize: { xs: '10px', sm: '12px', md: '15px', lg: '18px' }, color, bgcolor: bgColor, borderRadius: 1, px: 1 }}>
                                                        {label}
                                                    </Typography>
                                                    <Typography
                                                        component="p"
                                                        variant="body1"
                                                        sx={{
                                                            fontSize: { xs: '10px', sm: '12px', md: '15px', lg: '18px' },
                                                            color: 'rgba(255, 255, 255, 0.8)',
                                                            display: 'inline-block',
                                                        }}
                                                    >
                                                        {formatarData(filme.release_date)}
                                                    </Typography>
                                                </Box>
                                                <Typography
                                                    variant="body1"
                                                    sx={{
                                                        fontSize: { xs: '10px', sm: '12px', md: '15px', lg: '18px' },
                                                        mt: 2,
                                                        color: 'rgba(255, 255, 255, 0.8)',
                                                        width: '60%',
                                                        display: '-webkit-box',
                                                        WebkitLineClamp: 3,
                                                        WebkitBoxOrient: 'vertical',
                                                        overflow: 'hidden',
                                                        textOverflow: 'ellipsis',
                                                        textAlign: 'justify',
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
                                                            px: { xs: 1, sm: 2, md: 3, lg: 4 },
                                                            py: 1,
                                                            borderRadius: 1,
                                                            fontWeight: 'bold',
                                                            cursor: 'pointer',
                                                            color: 'rgba(255, 255, 255, 0.8)',
                                                            '&:hover': {
                                                                bgcolor: 'rgba(43, 16, 105, 0.79)',
                                                                color: 'rgba(255, 255, 255, 0.8)',
                                                            },
                                                            fontSize: { xs: '10px', sm: '12px', md: '14px', lg: '17px' }
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
                                );
                            })}
                        </Slider>
                    </div>
                    <Box
                        sx={{
                            position: 'absolute',
                            bottom: 0,
                            left: 0,
                            width: '100%',
                            height: '30%',
                            background: 'linear-gradient(to top, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0))',
                        }}
                    />
                </Stack>
                <Stack
                    sx={{
                        position: 'relative',
                        width: '100%',
                        height: '100%',
                        overflow: 'hidden',
                        display: { xs: 'block', sm: 'none', md: 'none', lg: 'none' },
                    }}
                >
                    <div className='slider-container' style={{ position: 'relative', width: '100%', height: '100%' }}>
                        <Slider {...settings}>
                            {filmesPopulares.map((filme) => {
                                const [label, bgColor, color] = definirClassificacao(classificacoes[filme.id] || '');
                                return (
                                    <Box
                                        key={filme.id}
                                        className="slider-item"
                                    >
                                        <Box key={filme.id} sx={{ position: 'relative', width: '100%', minHeight: 250, overflow: 'hidden' }}>
                                            <img
                                                src={
                                                    filme.backdrop_path
                                                        ? `https://image.tmdb.org/t/p/original${filme.poster_path}.jpg`
                                                        : 'https://via.placeholder.com/150'
                                                }
                                                alt="Filme Popular"
                                                style={{
                                                    width: '100%',
                                                    maxHeight: '100%',
                                                    objectFit: 'cover',
                                                }}
                                            />
                                            <Box
                                                sx={{
                                                    position: 'absolute',
                                                    bottom: 0,
                                                    left: 0,
                                                    width: '100%',
                                                    height: '50%',
                                                    background: 'linear-gradient(to top, rgb(0, 0, 0), rgba(0, 0, 0, 0.94), rgba(0, 0, 0, 0.8), rgba(255, 255, 255, 0))',
                                                    pl: { sm: 5, md: 10 },
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    justifyContent: 'center',
                                                }}
                                            >
                                                <Box
                                                    sx={{
                                                        display: 'flex',
                                                        flexDirection: 'column',
                                                        width: '100%',
                                                        height: '100%',
                                                        justifyContent: 'end',
                                                        px: 3
                                                    }}
                                                >
                                                    <Typography
                                                        component="h1"
                                                        variant="h1"
                                                        sx={{
                                                            display: '-webkit-box',
                                                            WebkitLineClamp: 1,
                                                            WebkitBoxOrient: 'vertical',
                                                            overflow: 'hidden',
                                                            textOverflow: 'ellipsis',
                                                            fontSize: 25,
                                                            fontWeight: 'bold',
                                                        }}
                                                    >
                                                        {filme.title}
                                                    </Typography>
                                                    <Box
                                                        sx={{
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                        }}
                                                    >
                                                        <Typography sx={{ mr: 2, fontSize: 15, color, bgcolor: bgColor, borderRadius: 1, px: 1 }}>
                                                            {label}
                                                        </Typography>
                                                        <Typography
                                                            component="p"
                                                            variant="body1"
                                                            sx={{
                                                                fontSize: 15,
                                                                color: 'rgba(255, 255, 255, 0.8)',
                                                                display: 'inline-block',
                                                            }}
                                                        >
                                                            {formatarData(filme.release_date)}
                                                        </Typography>
                                                    </Box>
                                                    <Typography
                                                        variant="body1"
                                                        sx={{
                                                            fontSize: 16,
                                                            mt: 2,
                                                            color: 'rgba(255, 255, 255, 0.8)',
                                                            width: '100%',
                                                            display: '-webkit-box',
                                                            WebkitLineClamp: 3,
                                                            WebkitBoxOrient: 'vertical',
                                                            overflow: 'hidden',
                                                            textOverflow: 'ellipsis',
                                                        }}
                                                    >
                                                        {filme.overview}
                                                    </Typography>
                                                    <Box
                                                        sx={{
                                                            display: 'flex',
                                                            justifyContent: 'center',
                                                            width: '100%',
                                                            alignItems: 'center',
                                                        }}
                                                    >
                                                        <Box
                                                            sx={{
                                                                gap: 2,
                                                                my: 2,
                                                                bgcolor: 'rgb(43, 16, 105)',
                                                                display: 'inline-block',
                                                                textAlign: 'center',
                                                                px: 4,
                                                                py: 1,
                                                                width: '100%',
                                                                borderRadius: 1,
                                                                fontWeight: 'bold',
                                                                cursor: 'pointer',
                                                                color: 'rgba(255, 255, 255, 0.8)',
                                                                '&:hover': {
                                                                    bgcolor: 'rgba(43, 16, 105, 0.79)',
                                                                    color: 'rgba(255, 255, 255, 0.8)',
                                                                },
                                                                fontSize: 15
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
                                        </Box>
                                    </Box>
                                )
                            })}
                        </Slider>
                    </div>
                    <Box
                        sx={{
                            position: 'absolute',
                            bottom: 0,
                            left: 0,
                            width: '100%',
                            height: '0.6%',
                            background: 'linear-gradient(to top, rgb(0, 0, 0), rgba(0, 0, 0, 1))',
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
                    mx: { xs: 5, sm: 10, md: 20 },
                    mt: { xs: 0, sm: -20, md: -35, lg: -40, xl: -50 },
                }}
            >
                <Stack sx={{ alignItems: 'left', width: '100%' }}>
                    <Typography
                        component="span"
                        variant="h2"
                        sx={{
                            fontSize: { xs: '20px', md: '30px'},
                            color: '#00FFFF',
                            fontWeight: 'bold',
                        }}
                    >
                        Filmes populares
                    </Typography>
                </Stack>
                <Stack sx={{ width: '100%', mt: 4 }}>
                    <Responsive filmes={filmesPopulares} tipo="filmes" />
                </Stack>
                <Stack sx={{ alignItems: 'left', width: '100%', mt: 4 }}>
                    <Typography
                        component="span"
                        variant="h2"
                        sx={{
                            fontSize: { xs: '20px', md: '30px'},
                            color: '#00FFFF',
                            fontWeight: 'bold',
                            mt: 4,
                        }}
                    >
                        Séries populares
                    </Typography>
                </Stack>
                <Stack sx={{ width: '100%', mt: 4 }}>
                    <Responsive filmes={seriesPopulares} tipo="tv-series" />
                </Stack>
                <Stack sx={{ alignItems: 'left', width: '100%', mt: 4 }}>
                    <Typography
                        component="span"
                        variant="h2"
                        sx={{
                            fontSize: { xs: '20px', md: '30px'},
                            color: '#00FFFF',
                            fontWeight: 'bold',
                            mt: 4,
                        }}
                    >
                        Filmes em cartaz
                    </Typography>
                </Stack>
                <Stack sx={{ width: '100%', mt: 4, pb: 9 }}>
                    <Responsive filmes={filmesEmCartaz} tipo="filmes" />
                </Stack>
            </Box>
        </Content >
    );
}
