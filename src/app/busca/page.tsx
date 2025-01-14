'use client';

import { Box, Container, Stack, Typography, CircularProgress, Chip, CardMedia, Button } from '@mui/material';
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
import { useRouter, useSearchParams } from 'next/navigation';
import { Popular } from '@/types/popular.type';
import { IPessoa } from '@/types/pessoa.type';

export default function Home() {
    const [loading, setLoading] = useState(true);

    const router = useRouter();

    const [selectedIndex, setSelectedIndex] = useState(0);

    const [filmesBusca, setFilmesBusca] = useState<Popular[]>([]);
    const [seriesBusca, setSeriesBusca] = useState<IPopular[]>([]);
    const [pessoasBusca, setPessoasBusca] = useState<IPessoa[]>([]);
    const [qntPessoas, setQntPessoas] = useState(0);
    const [qntFilmes, setQntFilmes] = useState(0);
    const [qntSeries, setQntSeries] = useState(0);

    const [pagina, setPagina] = useState(0);

    const searchParams = useSearchParams();

    const handleListItemClick = (
        event: React.MouseEvent<HTMLDivElement, MouseEvent>,
        index: number,
    ) => {
        setSelectedIndex(index);
    };

    const getPopulares = async () => {
        const query = searchParams.get('q') as string;
        if (!query) return;

        setPagina((prevPagina) => prevPagina + 1);

        const [maisFilmes, maisSeries] = await Promise.all([
            filmes.getFilmePorNome(query, pagina + 1),
            series.getSeriePorNome(query, pagina + 1),
        ]);

        setFilmesBusca((prev) => [...prev, ...maisFilmes.results]);
        setSeriesBusca((prev) => [...prev, ...maisSeries.results]);
    };

    const fetchData = async () => {
        const query = searchParams.get('q');
        if (!query) {
            console.error("Parâmetro 'q' está ausente");
            setLoading(false);
            return;
        }

        await Promise.all([
            filmes.getFilmePorNome(query).then((response) => {
                setQntFilmes(response.total_results);
                setFilmesBusca(response.results);
            }),
            series.getSeriePorNome(query).then((response) => {
                setQntSeries(response.total_results);
                setSeriesBusca(response.results);
            }),
            pessoas.getPessoas(query).then((response) => {
                console.log(response.results);
                
                setPessoasBusca(response.results);
                setQntPessoas(response.total_results);
            })
        ]);

        setLoading(false);
    };

    useEffect(() => {
        fetchData();
    }, [searchParams]);

    if (loading) {
        return (
            <Content>
                <Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                    <CircularProgress color="primary" />
                </Container>
            </Content>
        );
    }

    return (
        <Content>
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
                        flexDirection: 'row',
                        alignItems: 'flex-start',
                        justifyContent: 'space-between',
                        width: '100%',
                        gap: 4,
                    }}
                >
                    <Box
                        sx={{
                            width: 300,
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
                        <List component="nav" aria-label="main mailbox folders" sx={{ mt: 2 }}>
                            <ListItemButton
                                selected={selectedIndex === 0}
                                onClick={(event) => handleListItemClick(event, 0)}
                            >
                                <ListItemText primary="Filmes" />
                                <Chip label={qntFilmes} color="warning" variant="outlined" />
                            </ListItemButton>
                            <ListItemButton
                                selected={selectedIndex === 1}
                                onClick={(event) => handleListItemClick(event, 1)}
                            >
                                <ListItemText primary="Séries" />
                                <Chip label={qntSeries} color="warning" variant="outlined" />
                            </ListItemButton>
                            <ListItemButton
                                selected={selectedIndex === 2}
                                onClick={(event) => handleListItemClick(event, 2)}
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
                            justifyContent: 'flex-start',
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
                                                : 'https://via.placeholder.com/150'
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
                                <Box key={series.id} sx={{ width: 150, cursor: 'pointer' }}>
                                    <CardMedia
                                        component="img"
                                        image={
                                            series.poster_path
                                                ? `https://image.tmdb.org/t/p/original${series.poster_path}`
                                                : 'https://via.placeholder.com/150'
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
                            pessoasBusca.map((pessoa)=> (
                                <Box key={pessoa.id} sx={{ width: 150, cursor: 'pointer' }}  onClick={() => router.push(`/pessoa?p=${pessoa.id}`)}>
                                    <CardMedia
                                        component="img"
                                        image={
                                            pessoa.profile_path
                                                ? `https://image.tmdb.org/t/p/original${pessoa.profile_path}`
                                                : 'https://placehold.co/150'
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
                    <Button variant='outlined' color='info' onClick={() => { getPopulares();}}>Exibir mais</Button>
                </Box>
            </Container>
        </Content>
    );

}
