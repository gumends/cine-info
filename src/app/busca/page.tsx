'use client';

import { Box, Container, Stack, Typography, Chip, CardMedia, Button } from '@mui/material';
import Content from '@/app/components/Content';
import React, { useEffect, useState } from 'react';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import * as filmes from '@/services/films.service';
import * as series from '@/services/series.service';
import * as pessoas from '@/services/pessoa.service';
import { IPopular } from '@/types/popular-tv.type';
import { useRouter } from 'next/navigation';
import { Popular } from '@/types/popular.type';
import { IPessoa } from '@/types/pessoa.type';
import LoadingScreen from '../components/Loading';
import * as images from '@/assets/Screenshot 2025-01-23 at 23-11-57 404 Image Placeholder.png';

export default function Home() {
    const [loading, setLoading] = useState(true);

    const router = useRouter();

    const [selectedIndex, setSelectedIndex] = useState(0);

    const [filmesBusca, setFilmesBusca] = useState<Popular[]>([]);
    const [seriesBusca, setSeriesBusca] = useState<IPopular[]>([]);
    const [pessoasBusca, setPessoasBusca] = useState<IPessoa[]>([]);
    const [qntPessoas, setQntPessoas] = useState(1);
    const [qntFilmes, setQntFilmes] = useState(1);
    const [qntSeries, setQntSeries] = useState(1);

    const [pagina, setPagina] = useState(1);

    const handleListItemClick = (
        event: React.MouseEvent<HTMLDivElement, MouseEvent>,
        index: number,
    ) => {
        setSelectedIndex(index);
        setPagina(1); // Resetar a página ao trocar de categoria
    };

    const getPopulares = async () => {
        const { searchParams } = new URL(window.location.href);

        const query = searchParams.get('q') as string;

        if (!query) router.push('/filmes');

        const nextPage = pagina + 1; // Calcular próxima página

        await Promise.all([
            filmes.getFilmePorNome(query, nextPage).then((response) => {
                setQntFilmes(response.total_results);
                setFilmesBusca((prev) => [...prev, ...response.results]);
            }),
            series.getSeriePorNome(query, nextPage).then((response) => {
                setQntSeries(response.total_results);
                setSeriesBusca((prev) => [...prev, ...response.results]);
            }),
            pessoas.getPessoas(query, nextPage).then((response) => {
                setQntPessoas(response.total_results);
                setPessoasBusca((prev) => [...prev, ...response.results]);
            })
        ]);

        setPagina(nextPage); // Atualizar a página apenas uma vez
    };

    const fetchData = async () => {
        const { searchParams } = new URL(window.location.href);

        const query = searchParams.get('q') as string;

        if (!query) router.push('/filmes');

        await Promise.all([
            filmes.getFilmePorNome(query as string, pagina).then((response) => {
                setQntFilmes(response.total_results);
                setFilmesBusca(response.results);
            }),
            series.getSeriePorNome(query as string, pagina).then((response) => {
                setQntSeries(response.total_results);
                setSeriesBusca(response.results);
            }),
            pessoas.getPessoas(query as string, pagina).then((response) => {
                setPessoasBusca(response.results);
                setQntPessoas(response.total_results);
            })
        ]);
        setLoading(false);
    };

    useEffect(() => {
        fetchData();
    }, [selectedIndex]);

    return (
        <Content>
            {loading && <LoadingScreen />}
            <Container
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    py: 4,
                }}
                maxWidth="lg"
            >
                <Stack
                    sx={{
                        display: 'flex',
                        flexDirection: { xs: 'column', sm: 'column', md: 'row' },
                        alignItems: 'flex-start',
                        justifyContent: 'space-between',
                        width: '100%',
                        gap: 4,
                    }}
                >
                    <Box
                        sx={{
                            width: { xs: '100%', sm: '100%', md: 300 },
                            bgcolor: 'background.paper',
                            borderRadius: '10px',
                            p: 2,
                            boxShadow: 1,
                        }}
                    >
                        <Typography
                            variant="h6"
                            sx={{
                                color: 'text.primary',
                                textAlign: 'center',
                                mb: 2,
                            }}
                        >
                            Buscas Relacionadas
                        </Typography>
                        <Divider />
                        <List component="nav" aria-label="main mailbox folders" sx={{ mt: 2, display: { xs: 'flex', sm: 'flex', md: 'block'}, flexDirection: 'row' }}>
                            <ListItemButton
                                selected={selectedIndex === 0}
                                onClick={(event) => handleListItemClick(event, 0)}
                                sx={{ display: "flex", flexDirection: "column" }}
                            >
                                <ListItemText primary="Filmes" />
                                <Chip label={qntFilmes} color="warning" variant="outlined" />
                            </ListItemButton>
                            <ListItemButton
                                selected={selectedIndex === 1}
                                onClick={(event) => handleListItemClick(event, 1)}
                                sx={{ display: "flex", flexDirection: "column" }}
                            >
                                <ListItemText primary="Séries" />
                                <Chip label={qntSeries} color="warning" variant="outlined" />
                            </ListItemButton>
                            <ListItemButton
                                selected={selectedIndex === 2}
                                onClick={(event) => handleListItemClick(event, 2)}
                                sx={{ display: "flex", flexDirection: "column" }}
                            >
                                <ListItemText primary="Pessoas" />
                                <Chip label={qntPessoas} color="warning" variant="outlined" />
                            </ListItemButton>
                        </List>
                    </Box>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            flexWrap: 'wrap',
                            justifyContent: 'center',
                            gap: 2,
                            width: '100%',
                        }}
                    >
                        {selectedIndex === 0 &&
                            filmesBusca.map((filme) => (
                                <Box key={filme.id} sx={{ width: 150, cursor: 'pointer' }} onClick={() => router.push(`/filmes/detalhes?id=${filme.id}`)}>
                                    <CardMedia
                                        component="img"
                                        image={
                                            filme.poster_path
                                                ? `https://image.tmdb.org/t/p/original${filme.poster_path}`
                                                : images.default.src
                                        }
                                        alt={filme.title || 'Poster do filme'}
                                        sx={{
                                            width: '100%',
                                            height: 225,
                                            objectFit: 'cover',
                                            borderTopLeftRadius: 10,
                                            borderTopRightRadius: 10,
                                        }}
                                    />
                                    <Typography
                                        variant="body2"
                                        sx={{
                                            color: 'text.primary',
                                            textAlign: 'center',
                                            backgroundColor: 'background.paper',
                                            borderBottomLeftRadius: 10,
                                            borderBottomRightRadius: 10,
                                            p: 1,
                                            fontSize: 14,
                                            whiteSpace: 'nowrap',
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis',
                                        }}
                                    >
                                        {filme.title}
                                    </Typography>
                                </Box>
                            ))}
                        {selectedIndex === 1 &&
                            seriesBusca.map((series) => (
                                <Box key={series.id} sx={{ width: 150, cursor: 'pointer' }} onClick={() => router.push(`/tv-series/detalhes?id=${series.id}`)}>
                                    <CardMedia
                                        component="img"
                                        image={
                                            series.poster_path
                                                ? `https://image.tmdb.org/t/p/original${series.poster_path}`
                                                : images.default.src
                                        }
                                        alt={series.name || 'Poster da série'}
                                        sx={{
                                            width: '100%',
                                            height: 225,
                                            objectFit: 'cover',
                                            borderTopLeftRadius: 10,
                                            borderTopRightRadius: 10,
                                        }}
                                    />
                                    <Typography
                                        variant="body2"
                                        sx={{
                                            color: 'text.primary',
                                            textAlign: 'center',
                                            backgroundColor: 'background.paper',
                                            borderBottomLeftRadius: 10,
                                            borderBottomRightRadius: 10,
                                            p: 1,
                                            fontSize: 14,
                                            whiteSpace: 'nowrap',
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis',
                                        }}
                                    >
                                        {series.name}
                                    </Typography>
                                </Box>
                            ))}
                        {selectedIndex === 2 &&
                            pessoasBusca.map((pessoa) => (
                                <Box key={pessoa.id} sx={{ width: 150, cursor: 'pointer' }} onClick={() => router.push(`/pessoa?p=${pessoa.id}`)}>
                                    <CardMedia
                                        component="img"
                                        image={
                                            pessoa.profile_path
                                                ? `https://image.tmdb.org/t/p/original${pessoa.profile_path}`
                                                : images.default.src
                                        }
                                        alt={pessoa.name || 'Poster da série'}
                                        sx={{
                                            width: '100%',
                                            height: 225,
                                            objectFit: 'cover',
                                            borderTopLeftRadius: 10,
                                            borderTopRightRadius: 10,
                                        }}
                                    />
                                    <Typography
                                        variant="body2"
                                        sx={{
                                            color: 'text.primary',
                                            textAlign: 'center',
                                            backgroundColor: 'background.paper',
                                            borderBottomLeftRadius: 10,
                                            borderBottomRightRadius: 10,
                                            p: 1,
                                            fontSize: 14,
                                            whiteSpace: 'nowrap',
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis',
                                        }}
                                    >
                                        {pessoa.name}
                                    </Typography>
                                </Box>
                            ))}
                    </Box>
                </Stack>
                <Box sx={{ display: 'flex', justifyContent: 'right', width: '100%', mr: 6, mt: 2 }}>
                    <Button variant='outlined' color='info' onClick={() => { getPopulares(); }}>Exibir mais</Button>
                </Box>
            </Container>
        </Content>
    );
}
