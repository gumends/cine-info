'use client';

import { Box, Card, CardContent, CardMedia, CircularProgress, Container, Divider, IconButton, Input, Stack, Typography } from '@mui/material';
import Content from '@/app/components/Content';
import * as films from '@/services/films.service';
import { Popular } from '@/types/popular.type';
import { useEffect, useState } from 'react';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { useRouter } from 'next/navigation';
import Carrosel from '@/app/components/Carrosel'

export default function Home() {

    const router = useRouter();

    const [filmes, setFilmes] = useState<Popular[]>([]);
    const [filmesPopulares, setFilmesPopulares] = useState<Popular[]>([]);
    const [pagina, setPagina] = useState(1);
    const [totalPaginas, setTotalPaginas] = useState(1);

    const getRecents = async () => {
        await films.getRecents()
            .then((data) => {
                setFilmes(data.results);
            })
    };

    const getPopulares = async () => {
        await films.buscaPopulares(pagina)
            .then((data) => {
                setFilmesPopulares(data.results);
                setTotalPaginas(data.total_pages);
            })
    };

    const paginado = async (mais: boolean) => {
        setPagina(mais ? pagina + 1 : pagina - 1);
        await getPopulares();
    };

    useEffect(() => {
        getRecents();
        getPopulares();
    }, [pagina]);


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
                    marginTop={{ xs: 15, sm: 0, md: 0 }}
                >
                    <Typography
                        variant="h1"
                        sx={{
                            display: 'flex',
                            flexDirection: { xs: 'column', sm: 'row' },
                            alignItems: 'center',
                            fontSize: 'clamp(3rem, 10vw, 3.5rem)',
                            fontWeight: 'bold',
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
                        mt: 4,
                    })}
                >
                    Filmes Em Cartaz
                </Typography>
                <Box sx={{ mt: 4, width: '100%',  }}>
                <Carrosel filmes={filmes} />
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
                            <Card
                                key={item.id}
                                onClick={() => { router.push(`/filmes/detalhes?id=${item.id}`) }}
                                sx={{
                                    display: 'flex',
                                    width: 345,
                                    height: 170,
                                    justifyContent: 'space-between',
                                    cursor: 'pointer',
                                    '&:hover': {
                                        filter: 'brightness(0.9)',
                                    },
                                    position: 'relative'
                                }}>
                                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                    <CardContent sx={{ flex: '1 0 auto' }}>
                                        <Typography
                                            component="div"
                                            variant="body2"
                                            sx={{
                                                fontSize: '12px',
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
                                            }}
                                        >
                                            {item.release_date && new Date(item.release_date).toISOString().split('T')[0].split('-').reverse().join('/')}
                                        </Typography>
                                    </CardContent>

                                </Box>
                                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                                    <CardMedia
                                        component="img"
                                        sx={{ width: 170, height: 100 }}
                                        image={item.backdrop_path ? `https://image.tmdb.org/t/p/original${item.backdrop_path}.jpg` : 'https://via.placeholder.com/150'}
                                        alt="Live from space album cover"
                                    />
                                </Box>
                                <Box sx={{ position: 'absolute', bottom: 2, left: 6 }}>
                                    <Box sx={{ position: 'relative', display: 'inline-flex' }}>
                                        <CircularProgress
                                            color={'info'}
                                            variant="determinate"
                                            value={item.vote_average * 10}
                                        />
                                        <Box
                                            sx={{
                                                top: 0,
                                                left: 0,
                                                bottom: 0,
                                                right: 0,
                                                position: 'absolute',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                            }}
                                        >
                                            <Typography
                                                variant="caption"
                                                component="div"
                                                sx={{ color: 'text.secondary' }}
                                            >{item.vote_average.toFixed(1)}
                                            </Typography>
                                        </Box>
                                    </Box>
                                </Box>
                            </Card>
                        ))
                    }
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mt: 7 }}>
                    <IconButton
                        onClick={() => { paginado(false) }}
                        sx={{
                            textAlign: 'center',
                        }}
                        disabled={pagina === 1}
                    >
                        <ArrowBackIosNewIcon />
                    </IconButton>
                    <Box sx={{ alignItems: 'center', display: 'flex', gap: 1 }}>
                        <Input
                            sx={{ textAlign: 'center' }}
                            value={pagina}
                            onChange={(e) => { setPagina(parseInt(e.target.value)) }}
                        />
                        / {totalPaginas}
                    </Box>
                    <IconButton
                        onClick={() => { paginado(true) }}
                        sx={{
                            textAlign: 'center',
                        }}
                        disabled={pagina === totalPaginas}
                    >
                        <ArrowForwardIosIcon />
                    </IconButton>
                </Box>
            </Container>
        </Content >
    );
}
