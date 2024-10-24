'use client';
import { Box, CardMedia, Typography } from '@mui/material';
import Content from '../components/Content';
import { Inter } from 'next/font/google';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import * as films from '@/services/films.service';
import { IFilme } from '@/types/filmes.type';
const inter = Inter({ subsets: ['latin'] })
import CircleIcon from '@mui/icons-material/Circle';
import { IElenco } from '@/types/elenco.type';

export default function Home() {

    const [filme, setFilme] = useState<IFilme>();

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
                .then((data: IElenco) => {
                    console.log(data);
                })
        }
    }, []);

    return (
        <Content>
            <Box sx={{ width: "100%", display: "flex", justifyContent: "space-between", my: 2, gap: 2 }}>
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
                        sx={{ width: 751, height: 400 }}
                        image={`https://image.tmdb.org/t/p/original${filme?.backdrop_path}.jpg`}
                        alt={filme?.title}
                    />
                </Box>
            </Box>
        </Content>
    );
}
