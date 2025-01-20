'use client';
import { Box, Card, CardContent, CardMedia, Container, Divider, Modal, Typography } from '@mui/material';
import Content from '../../components/Content';
import React, { useEffect, useState } from 'react';
import * as series from '@/services/series.service';
import { ISerie } from '@/types/series.type';
import { IElencoResponse, IElenco } from '@/types/elenco.type';
import Flicking from "@egjs/react-flicking";
import "@egjs/react-flicking/dist/flicking.css";
// Or, if you have to support IE9
import "@egjs/react-flicking/dist/flicking-inline.css";
import { useRouter } from 'next/navigation';
import { IVideos, IVideosResponse } from '@/types/videos.type';
import { Stack } from '@mui/joy';

import LoadingScreen from '@/app/components/Loading';

const Home: React.FC = () => {

    const [filme, setFilme] = useState<ISerie>();
    const [credts, setCredts] = useState<IElenco[]>([]);
    const [videos, setVideos] = useState<IVideos[]>([]);
    const [loading, setLoading] = useState(true);
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const router = useRouter();

    const fatchData = async (movieId: string) => {
        await Promise.all([
            series.getSerie(Number(movieId))
                .then((data: ISerie) => {
                    console.log(data);
                    // classificacao(data?.release_dates.results.filter((data) => data.iso_3166_1 === "BR")[0]?.release_dates[0].certification);
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
            <Container >
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
                            <Typography variant="h4" sx={{ fontSize: 30, width: "100%", fontWeight: "bold" }} >{filme?.name}</Typography>
                            <Typography
                                sx={{ fontSize: 17, width: '70%', color: "rgba(255, 255, 255, 0.8)", display: "inline", ml: 2 }}
                            >
                                {/* {filme?.release_dates.results.filter((data) => data.iso_3166_1 === "BR")[0]?.release_dates[0].release_date.split("T")[0].split("-").reverse().join("/")} */}
                            </Typography>
                            <Typography
                                sx={{ fontSize: 17, width: '70%', color: "rgba(255, 255, 255, 0.8)", display: "inline", ml: 2 }}
                            >
                                tempo
                            </Typography>
                            <Typography variant="body1" sx={{ mt: 4, fontSize: 20, width: '70%', color: "rgba(255, 255, 255, 0.8)" }}>{filme?.overview}</Typography>
                        </Box>
                        {filme?.homepage !== "" && <Typography
                            sx={{
                                bgcolor: "rgba(3, 154, 241, 0.4)",
                                px: 1.5,
                                py: 1,
                                borderRadius: 1,
                                display: "inline",
                                width: "fit-content",
                                cursor: "pointer",
                                fontSize: 17,
                                fontWeight: "bold",
                                color: "rgba(255, 255, 255, 0.8)",
                                '&:hover': {
                                    bgcolor: "rgba(3, 154, 241, 0.6)",
                                    color: "rgba(255, 255, 255, 0.9)"
                                }
                            }}
                            onClick={() => { window.open(filme?.homepage ? filme?.homepage : "", "_blank") }}
                        >
                            Ver no cinema
                        </Typography>}
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
                        <Box
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
                                border: "1px solid rgba(255, 255, 255, 0.1)",
                                '&:hover': {
                                    bgcolor: "rgba(0, 0, 0, 0.5)",
                                },
                                trasition: "all 0.3s ease",
                            }}
                            onClick={handleOpen}
                        >
                            Assistir Trailer
                        </Box>
                    </Box>
                </Stack>
                <Typography sx={{ fontSize: 20 }} gutterBottom variant="h5" component="div">
                    Mais informações
                </Typography>
                <Divider />
                <Box sx={{ maxWidth: "100%", display: "flex", overflowX: "auto", gap: 2, height: "350px", mt: 5, mb: 5 }}>
                    <Typography>{filme?.name}</Typography>
                </Box>
                <Typography sx={{ fontSize: 20 }} gutterBottom variant="h5" component="div">
                    Elenco
                </Typography>
                <Divider />
                <Box sx={{ maxWidth: "100%", display: "flex", overflowX: "auto", gap: 2, height: "350px", mt: 5, mb: 5 }}>
                    <Flicking
                        align="prev"
                        circular={false}
                    >
                        {credts.map((elenco, key) => (
                            <Card key={key} sx={{ minWidth: 275, mx: 1 }}>
                                <CardMedia
                                    sx={{ height: 240 }}
                                    image={`https://image.tmdb.org/t/p/w500${elenco.profile_path}`}
                                    title={elenco.name}
                                />
                                <CardContent>
                                    <Typography sx={{ fontSize: 20, mt: 1 }} gutterBottom variant="h5" component="div">
                                        {elenco.name}
                                    </Typography>
                                    <Typography sx={{ fontSize: 12 }} gutterBottom variant="body2" component="div">
                                        {elenco.character}
                                    </Typography>
                                </CardContent>
                            </Card>
                        ))}
                    </Flicking>
                </Box>
            </Container>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: { xs: 1300, sm: 400, md: 1500 },
                        height: { xs: 600, sm: 600, md: 800 },
                        bgcolor: 'background.paper',
                        boxShadow: 24,
                    }}
                >
                    {
                        videos.length === 0 ? (
                            <Typography sx={{ fontSize: 20 }} gutterBottom variant="h5" component="div">
                                Trailer indisponível
                            </Typography>
                        ) : (
                            <Card sx={{ width: "100%", height: "100%" }}>
                                <CardMedia
                                    component="iframe"
                                    sx={{ width: '100%', height: "100%" }}
                                    src={`https://www.youtube.com/embed/${videos[0].key}?vq=hd1080`}
                                    allow="autoplay; encrypted-media"
                                    title="Trailer do filme"
                                />
                            </Card>
                        )
                    }
                </Box>
            </Modal>
        </Content>
    );
}

export default Home