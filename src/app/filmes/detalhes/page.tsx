'use client';
import { Box, Card, CardContent, CardMedia, Chip, Container, Divider, Typography } from '@mui/material';
import Content from '../../components/Content';
import { useEffect, useState } from 'react';
import * as films from '@/services/films.service';
import { IFilme } from '@/types/filmes.type';
import CircleIcon from '@mui/icons-material/Circle';
import { IElencoResponse, IElenco } from '@/types/elenco.type';
import Flicking from "@egjs/react-flicking";
import "@egjs/react-flicking/dist/flicking.css";
// Or, if you have to support IE9
import "@egjs/react-flicking/dist/flicking-inline.css";
import { useRouter } from 'next/navigation';
import { IVideos, IVideosResponse } from '@/types/videos.type';
import { IService } from '@/types/services.type';
import { Stack } from '@mui/joy';

import { useExtractColors } from "react-extract-colors";

const Home: React.FC = () => {

    const [filme, setFilme] = useState<IFilme>();
    const [credts, setCredts] = useState<IElenco[]>([]);
    const [videos, setVideos] = useState<IVideos[]>([]);
    const [poster_path, setPoster_path] = useState<string>('');
    const [TipoClassificacao, setTipoClassificacao] = useState<string[]>([]);
    const router = useRouter();

    function formatRuntime(minutes: number) {
        const hours = Math.floor(minutes / 60);
        const mins = minutes % 60;
        return `${hours}h ${mins}min`;
    }

    const classificacao = (certification: string) => {
        if (isNaN(parseInt(certification))) {
            setTipoClassificacao(['L', 'rgba(0, 156, 21, 0.3)', 'rgb(0, 156, 21)']);
        } else if (parseInt(certification) < 18) {
            setTipoClassificacao([certification.toString(), 'rgba(156, 83, 0, 0.3)', 'rgb(255, 136, 0)']);
        } else if (parseInt(certification) >= 18) {
            setTipoClassificacao([certification.toString() + '+', 'rgba(255, 0, 0, 0.3)', 'rgb(255, 0, 0)']);
        }
    }

    useEffect(() => {
        const { searchParams } = new URL(window.location.href);
        const movieId = searchParams.get('id');

        if (!movieId) router.push('/filmes');

        if (movieId) {
            films.getFilme(Number(movieId))
                .then((data: IFilme) => {
                    classificacao(data?.release_dates.results.filter((data) => data.iso_3166_1 === "BR")[0]?.release_dates[0].certification);
                    setFilme(data);
                    setPoster_path(data.poster_path);
                })

            films.getCredts(Number(movieId))
                .then((data: IElencoResponse) => {
                    setCredts(data.cast);
                })

            films.getVideos(Number(movieId))
                .then((data: IVideosResponse) => {
                    setVideos(data.results);
                })

            films.getServices(Number(movieId))
                .then((data: IService) => {
                    // console.log(data);
                })
        }
    }, []);

    const image = `https://image.tmdb.org/t/p/w500/${poster_path}`

    const { colors, dominantColor, darkerColor, lighterColor, loading, error } =
        useExtractColors(image);

    useEffect(() => {
        console.log(colors, dominantColor, darkerColor, lighterColor, loading, error);
    }, [image]);


    return (
        <Content
        //rgba={colors[0] ? colors[0] : "#000000"}
        //rgbaDark={colors[1] ? colors[1] : "#000000"}
        //rgbaLight={colors[2] ? colors[2] : "#000000"}
        >
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
                            <Typography variant="h4" sx={{ fontSize: 30, width: "100%", fontWeight: "bold" }} >{filme?.title}</Typography>
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
                            sx={{fontSize: 17, width: '70%', color: "rgba(255, 255, 255, 0.8)", display: "inline", ml: 2}}
                            >
                                {filme?.release_dates.results.filter((data) => data.iso_3166_1 === "BR")[0]?.release_dates[0].release_date.split("T")[0].split("-").reverse().join("/")}
                            </Typography>
                            <Typography
                            sx={{fontSize: 17, width: '70%', color: "rgba(255, 255, 255, 0.8)", display: "inline", ml: 2}}
                            >
                                {formatRuntime(filme?.runtime as number)}
                            </Typography>
                            <Typography variant="body1" sx={{ mt: 4, fontSize: 20, width: '70%', color: "rgba(255, 255, 255, 0.8)" }}>{filme?.overview}</Typography>
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
                            sx={{ minWidth: 300, maxWidth: "100%", height: 500, border: "1px solid rgba(255, 255, 255, 0.1)", borderRadius: 1 }}
                            image={`https://image.tmdb.org/t/p/original${filme?.poster_path}`}
                            alt={filme?.title}
                        />

                    </Box>
                </Stack>
                <Typography sx={{ fontSize: 20 }} gutterBottom variant="h5" component="div">
                    Elenco
                </Typography>
                <Divider />
                <Box sx={{ maxWidth: "100%", display: "flex", overflowX: "auto", gap: 2, height: "350px", mt: 5 }}>
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
                <Typography sx={{ fontSize: 20, mt: 4 }} gutterBottom variant="h5" component="div">
                    Trailers
                </Typography>
                <Divider />
                <Box
                    sx={{
                        minWidth: "100%",
                        height: { xs: 300, sm: 400, md: 500 },
                        display: "flex",
                        overflowX: "auto",
                        gap: 2,
                        mt: 5,
                        overflow: "auto"
                    }}>
                    <Flicking
                        align="prev"
                        circular={true}
                    >
                        {videos.map((video, key) => (
                            <Card key={key} sx={{ width: "100%", height: "100%" }}>
                                <CardMedia
                                    component="iframe"
                                    sx={{ width: '100%', height: "100%" }}
                                    src={`https://www.youtube.com/embed/${video.key}?vq=hd1080`}
                                    allow="autoplay; encrypted-media"
                                    title="Trailer do filme"
                                />
                            </Card>
                        ))}
                    </Flicking>
                </Box>
            </Container>
        </Content>
    );
}

export default Home