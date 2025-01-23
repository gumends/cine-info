'use client';

import { Accordion, AccordionDetails, AccordionSummary, Box, Button, Card, CardContent, CardMedia, Chip, Container, Divider, Modal, Typography } from '@mui/material';
import Content from '../../components/Content';
import React, { useEffect, useState } from 'react';
import * as series from '@/services/series.service';
import { ISerie } from '@/types/series.type';
import { IElencoResponse, IElenco } from '@/types/elenco.type';
import Flicking from "@egjs/react-flicking";
import "@egjs/react-flicking/dist/flicking.css";
import "@egjs/react-flicking/dist/flicking-inline.css";
import { useRouter } from 'next/navigation';
import { IVideos, IVideosResponse } from '@/types/videos.type';
import { Stack } from '@mui/joy';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import LoadingScreen from '@/app/components/Loading';
import CarroselCuston from '@/app/components/CarroselCuston';

const Home: React.FC = () => {

    const [filme, setFilme] = useState<ISerie>();
    const [credts, setCredts] = useState<IElenco[]>([]);
    const [videos, setVideos] = useState<IVideos[]>([]);
    const [loading, setLoading] = useState(true);
    const [TipoClassificacao, setTipoClassificacao] = useState<string[]>([]);

    const router = useRouter();

    const classificacao = (certification: string) => {
        console.log(certification);
        if (certification === "" || certification == undefined) {
            setTipoClassificacao(['Não classificado', 'rgba(206, 110, 0, 0.3)', 'rgb(206, 110, 0)'])
            return
        };
        if (isNaN(parseInt(certification))) {
            setTipoClassificacao(['L', 'rgba(0, 156, 21, 0.3)', 'rgb(0, 156, 21)']);
        } else if (parseInt(certification) < 18) {
            setTipoClassificacao([certification.toString(), 'rgba(156, 83, 0, 0.3)', 'rgb(255, 136, 0)']);
        } else if (parseInt(certification) >= 18) {
            setTipoClassificacao([certification.toString() + '+', 'rgba(255, 0, 0, 0.3)', 'rgb(255, 0, 0)']);
        }
    }

    const formatarData = (data: string) => {
        if (data == '') {
            return
        }
        const partes = data.split('-');
        const dia = partes[2];
        const mes = partes[1];
        const ano = partes[0];
        return `${dia}/${mes}/${ano}`;
    }

    function formatRuntime(minutes: number) {
        if (minutes == 0) return 'Tem duração não informado';
        const hours = Math.floor(minutes / 60);
        const mins = minutes % 60;
        return `${hours}h ${mins}min`;
    }

    const fatchData = async (movieId: string) => {
        await Promise.all([
            series.getSerie(Number(movieId))
                .then((data: ISerie) => {
                    console.log(data);
                    setFilme(data);
                }),
            series.getCredts(Number(movieId))
                .then((data: IElencoResponse) => {
                    setCredts(data.cast);
                }),
            series.getVideos(Number(movieId))
                .then((data: IVideosResponse) => {
                    setVideos(data.results);
                }),
            series.getClassificacoes(Number(movieId))
                .then((data) => {
                    try {
                        const classBrasil = (data.results).filter((item: any) => item.iso_3166_1 == 'BR');
                        classificacao(classBrasil[0].rating);
                    } catch {
                        classificacao('');
                    }
                })
        ]);
        setTimeout(() => {
            setLoading(false);
        }, 2000);
    }

    useEffect(() => {
        const { searchParams } = new URL(window.location.href);
        const movieId = searchParams.get('id');

        if (!movieId) router.push('/tv-series');

        if (movieId) {
            fatchData(movieId);
        }
    }, []);

    return (
        <Content>
            {loading && <LoadingScreen />}
            <Container>
                <Stack
                    sx={{
                        width: "100%",
                        height: 500,
                        justifyContent: "space-between",
                        my: 8,
                        gap: 2,
                    }}
                    direction={{ xs: "column", sm: "row", md: "row" }}
                    alignItems={{ xs: "center", sm: "flex-start", md: "flex-start" }}
                    marginTop={{ xs: 15, sm: 0, md: 0 }}
                >
                    <Box sx={{ width: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", height: "100%" }}>
                        <Box>
                            <Box
                                sx={{
                                    display: "flex",
                                    flexDirection: "row",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                    width: "100%"
                                }}
                            >
                                <Typography variant="h4" sx={{ fontSize: 30, width: "100%", fontWeight: "bold" }} >{filme?.name}</Typography>
                            </Box>
                            <Box sx={{ mb: 2 }}>
                                <Typography variant="subtitle1" color="text.secondary">
                                    {filme?.tagline}
                                </Typography>
                            </Box>
                            <Typography variant="body1"
                                sx={{
                                    mt: 4,
                                    fontSize: 20,
                                    width: '70%',
                                    color: TipoClassificacao[2],
                                    bgcolor: TipoClassificacao[1],
                                    display: "inline",
                                    borderRadius: 1,
                                    py: 0.5,
                                    px: 1
                                }}>
                                {TipoClassificacao[0]}
                            </Typography>
                            <Typography
                                sx={{ fontSize: 17, width: '70%', color: "rgba(255, 255, 255, 0.8)", display: "inline", ml: 2 }}
                            >
                                {formatarData(filme?.first_air_date ? filme?.first_air_date : '')}
                            </Typography>
                            <Typography
                                sx={{ fontSize: 17, width: '70%', color: "rgba(255, 255, 255, 0.8)", display: "inline", ml: 2 }}
                            >
                                {filme?.number_of_seasons} Temporadas
                            </Typography>
                            <Typography
                                sx={{ fontSize: 17, width: '70%', color: "rgba(255, 255, 255, 0.8)", display: "inline", ml: 2 }}
                            >
                                {filme?.number_of_episodes} Episódios
                            </Typography>
                            <Typography variant="body1" sx={{ mt: 4, fontSize: 20, width: '70%', color: "rgba(255, 255, 255, 0.8)" }}>{filme?.overview.length == 0 ? "Sem sinopse" : filme?.overview}</Typography>
                        </Box>
                        <Box sx={{ display: "flex", mt: 4, gap: 1, alignItems: "center" }}>
                            {filme?.genres.map((genre, key) => (
                                <Box key={key} sx={{ display: "flex", border: "1px solid rgba(255, 255, 255, 0.1)", alignItems: "center", gap: 1, bgcolor: "rgba(255, 255, 255, 0.1)", borderRadius: 1, p: 1 }}>
                                    <Typography variant="body2" >
                                        {genre.name}
                                    </Typography>
                                </Box>
                            ))}
                        </Box>
                    </Box>
                    <Box>
                        <CardMedia
                            component="img"
                            sx={{ minWidth: 300, maxWidth: "100%", height: 500, border: "1px solid rgba(255, 255, 255, 0.1)", borderStartStartRadius: 10, borderStartEndRadius: 10 }}
                            image={`https://image.tmdb.org/t/p/original${filme?.poster_path}`}
                            alt={filme?.name}
                        />
                        {filme?.homepage !== "" &&
                            <Button
                                sx={{
                                    bgcolor: "rgba(0, 0, 0, 0.3)",
                                    width: "100%",
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    height: 40,
                                    color: "rgba(255, 255, 255, 0.9)",
                                    cursor: "pointer",
                                    fontSize: 17,
                                    fontWeight: "bold",
                                    borderEndStartRadius: 10,
                                    borderEndEndRadius: 10,
                                    borderStartStartRadius: 0,
                                    borderStartEndRadius: 0,
                                    border: "1px solid rgba(255, 255, 255, 0.1)",
                                    '&:hover': {
                                        bgcolor: "rgba(0, 0, 0, 0.5)",
                                    },
                                    trasition: "all 0.3s ease",
                                }}
                                onClick={() => { window.open(filme?.homepage ? filme?.homepage : "", "_blank") }}
                            >
                                Onde Assistir
                            </Button>
                        }
                    </Box>
                </Stack>

                <div
                    style={{
                        paddingBottom: "50px",
                    }}
                >
                    <Accordion sx={{ border: "1px solid rgba(255, 255, 255, 0.1)", bgcolor: "rgba(255, 255, 255, 0.05)" }}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1-content"
                            id="panel1-header"
                            sx={{
                                bgcolor: "rgba(0, 0, 0, 0.3)",
                                color: "rgba(255, 255, 255, 0.9)",
                                '&:hover': {
                                    bgcolor: "rgba(0, 0, 0, 0.5)",
                                },
                                trasition: "all 0.3s ease",
                            }}
                        >
                            <Typography component="span">Mais Informações</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Box sx={{ my: 2 }}>
                                <Stack spacing={2} sx={{ mb: 3 }}>
                                    <Typography variant="body1">
                                        <strong>Primeira data de emissão:</strong> {formatarData(filme?.first_air_date ? filme?.first_air_date : '')}
                                    </Typography>
                                    <Typography variant="body1">
                                        <strong>Última data de emissão:</strong> {formatarData(filme?.last_air_date ? filme?.last_air_date : '')}
                                    </Typography>
                                    <Typography variant="body1">
                                        <strong>Duração:</strong> {filme?.runtime === 0 ? "Não divugado" : filme?.runtime + " min"}
                                    </Typography>
                                    <Typography variant="body1">
                                        <strong>Em produção:</strong> {filme?.in_production ? "Sim" : "Nao"}
                                    </Typography>
                                    <Typography variant="body1">
                                        <strong>Avaliação:</strong> {filme?.vote_average.toFixed(2)} ({filme?.vote_count} votos)
                                    </Typography>
                                    <Typography variant="body1">
                                        <strong>País de Origem:</strong> {filme?.origin_country}
                                    </Typography>
                                    <Typography variant="body1">
                                        <strong>Produções:</strong> {filme?.production_companies.map((company, key) => (
                                            <span key={key}>{company.name}{key === filme?.production_companies.length - 1 ? "" : ", "}</span>
                                        ))}
                                    </Typography>
                                    <Typography variant="body1">
                                        <strong>Pais de produção:</strong> {filme?.production_countries.map((company, key) => (
                                            <span key={key}>{company.name}{key === filme?.production_countries.length - 1 ? "" : ", "}</span>
                                        ))}
                                    </Typography>
                                </Stack>
                            </Box>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion disabled={credts.length === 0} sx={{ border: "1px solid rgba(255, 255, 255, 0.1)", bgcolor: "rgba(255, 255, 255, 0.05)" }}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1-content"
                            id="panel1-header"
                            sx={{
                                bgcolor: "rgba(0, 0, 0, 0.3)",
                                color: "rgba(255, 255, 255, 0.9)",
                                '&:hover': {
                                    bgcolor: "rgba(0, 0, 0, 0.5)",
                                },
                                trasition: "all 0.3s ease",
                            }}
                        >
                            <Typography component="span">Elenco {credts.length === 0 ? <Chip label="Indisponivel" color="default" /> : ""}</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Box sx={{ px: 2, height: "400px" }}>
                                <CarroselCuston data={credts} />
                            </Box>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion disabled={videos.length === 0} sx={{ border: "1px solid rgba(255, 255, 255, 0.1)", bgcolor: "rgba(255, 255, 255, 0.05)" }}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1-content"
                            id="panel1-header"
                            sx={{
                                bgcolor: "rgba(0, 0, 0, 0.3)",
                                color: "rgba(255, 255, 255, 0.9)",
                                '&:hover': {
                                    bgcolor: "rgba(0, 0, 0, 0.5)",
                                },
                                trasition: "all 0.3s ease",
                            }}
                        >
                            <Typography component="span">Trailer {videos.length === 0 ? <Chip label="Indisponivel" color="default" /> : ""}</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Box
                                sx={{
                                    width: "100%",
                                    height: "500px",
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                }}
                            >
                                {
                                    videos.length === 0 ? (
                                        <Typography sx={{ fontSize: 20 }} gutterBottom variant="h5" component="div">
                                            Trailer indisponível
                                        </Typography>
                                    ) : (
                                        <CardMedia
                                            component="iframe"
                                            sx={{ width: '100%', height: "100%" }}
                                            src={`https://www.youtube.com/embed/${videos[0].key}?vq=hd1080`}
                                            allow="autoplay; encrypted-media"
                                            title="Trailer do filme"
                                        />
                                    )
                                }
                            </Box>
                        </AccordionDetails>
                    </Accordion>
                </div>
            </Container>
        </Content >
    );
}

export default Home