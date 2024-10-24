'use client';
import { Box, Card, CardContent, CardMedia, Divider, Typography } from '@mui/material';
import Content from '../components/Content';
import { Inter } from 'next/font/google';
import { useEffect, useState } from 'react';
import * as films from '@/services/films.service';
import { IFilme } from '@/types/filmes.type';
const inter = Inter({ subsets: ['latin'] })
import CircleIcon from '@mui/icons-material/Circle';
import { IElencoResponse, IElenco } from '@/types/elenco.type';

export default function Home() {

    const [filme, setFilme] = useState<IFilme>();
    const [credts, setCredts] = useState<IElenco[]>([]);

    useEffect(() => {
        const { searchParams } = new URL(window.location.href);
        const movieId = searchParams.get('id');

        if (movieId) {
            films.getFilme(Number(movieId))
                .then((data: IFilme) => {
                    console.log(data);
                    setFilme(data);
                })

            films.getCredts(Number(movieId))
                .then((data: IElencoResponse) => {
                    console.log(data);
                    setCredts(data.cast);
                })
        }
    }, []);

    return (
        <Content>
            <Box sx={{ width: "100%", display: "flex", justifyContent: "space-between", my: 8, gap: 2 }}>
                <Box>
                    <Typography variant="h4" fontFamily={inter.style.fontFamily}>{filme?.title}</Typography>
                    <Typography variant="body1" fontFamily={inter.style.fontFamily} sx={{ mt: 4, width: "70%" }}>{filme?.overview}</Typography>
                    <Box sx={{ display: "flex", mt: 4, gap: 1, alignItems: "center" }}>
                        {filme?.genres.map((genre, key) => (
                            <Box key={key} sx={{ display: "flex", alignItems: "center", gap: 1 }}><CircleIcon sx={{ width: 8, height: 8 }} /> <Typography variant="body2" fontFamily={inter.style.fontFamily}>{genre.name}</Typography></Box>
                        ))}
                    </Box>

                </Box>
                <Box>
                    <CardMedia
                        component="img"
                        sx={{ minWidth: 351, height: 500 }}
                        image={`https://image.tmdb.org/t/p/original${filme?.poster_path}.jpg`}
                        alt={filme?.title}
                    />
                </Box>
            </Box>
            <Typography sx={{ fontSize: 20 }} fontFamily={inter.style.fontFamily} gutterBottom variant="h5" component="div">
                Elenco
            </Typography>
            <Divider />
            <Box sx={{ maxWidth: "100%", display: "flex", overflowX: "auto", gap: 2, height: "350px", mt: 5 }}>
                {credts.map((elenco, key) => (
                    <Card key={key} sx={{ minWidth: 240 }}>
                        <CardMedia
                            sx={{ height: 240 }}
                            image={`https://image.tmdb.org/t/p/w500${elenco.profile_path}`}
                            title={elenco.name}
                        />
                        <CardContent>
                            <Typography sx={{ fontSize: 20, mt: 1 }} fontFamily={inter.style.fontFamily} gutterBottom variant="h5" component="div">
                                {elenco.name}
                            </Typography>
                            <Typography sx={{ fontSize: 12 }} fontFamily={inter.style.fontFamily} gutterBottom variant="body2" component="div">
                                {elenco.character}
                            </Typography>
                        </CardContent>
                    </Card>
                ))}
            </Box>
        </Content>
    );
}
