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
import { IFilme, IReleaseDates } from '@/types/filmes.type';

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
                        (release: any) => release.iso_3166_1 === 'BR'
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
                    height: '100vh',
                    overflow: 'hidden',
                    top: -179,
                    boxShadow: '1px 300px 200px rgb(0, 0, 0)',
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
                            {filmesPopulares.map((filme, index) => {
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
                                                <Box
                                                sx={{
                                                    display: 'flex',
                                                    alignItems: 'center',}}
                                                >
                                                    <Typography sx={{ mr: 2,fontSize: 20, color, bgcolor: bgColor, borderRadius: 1, px: 1 }}>
                                                        {label}
                                                    </Typography>
                                                    <Typography
                                                        component="p"
                                                        variant="body1"
                                                        sx={{
                                                            fontSize: '19px',
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
                            height: '30%', // Tamanho do gradiente (ajustável)
                            background: 'linear-gradient(to top, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0))',
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
                    <Responsive filmes={filmesPopulares} tipo="filmes" />
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
                        Séries populares
                    </Typography>
                </Stack>
                <Stack sx={{ width: '100%', mt: 4 }}>
                    <Responsive filmes={seriesPopulares} tipo="tv-series" />
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
                    <Responsive filmes={filmesEmCartaz} tipo="filmes" />
                </Stack>
            </Box>
        </Content >
    );
}
