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
    const [totalPagina, setTotalPagina] = useState(1);

    const [pagina, setPagina] = useState(1);

    const handleListItemClick = (
        event: React.MouseEvent<HTMLDivElement, MouseEvent>,
        index: number,
    ) => {
        setSelectedIndex(index);
    };

    const getPopulares = async () => {
        const { searchParams } = new URL(window.location.href);

        const query = searchParams.get('q') as string;

        if (!query) router.push('/filmes');

        await Promise.all([
            filmes.getFilmePorNome(query, pagina + 1).then((response) => {
                setQntFilmes(response.total_results);
                setTotalPagina(response.total_pages);
                setFilmesBusca([...filmesBusca, ...response.results]);
            }),
            series.getSeriePorNome(query, pagina + 1).then((response) => {
                setQntSeries(response.total_results);
                setTotalPagina(response.total_pages);
                setSeriesBusca([...seriesBusca, ...response.results]);
            }),
            pessoas.getPessoas(query, pagina + 1).then((response) => {
                setQntPessoas(response.total_results);
                setTotalPagina(response.total_pages);
                setPessoasBusca([...pessoasBusca, ...response.results]);
            })
        ]);

        setPagina(pagina + 1);


    };

    const fetchData = async () => {
        const { searchParams } = new URL(window.location.href);

        const query = searchParams.get('q') as string;

        if (!query) router.push('/filmes');

        await Promise.all([
            filmes.getFilmePorNome(query as string, pagina).then((response) => {
                setQntFilmes(response.total_results);
                setFilmesBusca(response.results);
                setTotalPagina(response.total_pages);
            }),
            series.getSeriePorNome(query as string, pagina).then((response) => {
                setQntSeries(response.total_results);
                setSeriesBusca(response.results);
                setTotalPagina(response.total_pages);
            }),
            pessoas.getPessoas(query as string, pagina).then((response) => {
                setPessoasBusca(response.results);
                setQntPessoas(response.total_results);
                setTotalPagina(response.total_pages);
            })
        ]);

        setLoading(false);
    };

    useEffect(() => {
        console.log(totalPagina);
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
                                onClick={(event) => {handleListItemClick(event, 0), setPagina(1)}}
                            >
                                <ListItemText primary="Filmes" />
                                <Chip label={qntFilmes} color="warning" variant="outlined" />
                            </ListItemButton>
                            <ListItemButton
                                selected={selectedIndex === 1}
                                onClick={(event) => {handleListItemClick(event, 1), setPagina(1)}}
                            >
                                <ListItemText primary="Séries" />
                                <Chip label={qntSeries} color="warning" variant="outlined" />
                            </ListItemButton>
                            <ListItemButton
                                selected={selectedIndex === 2}
                                onClick={(event) => {handleListItemClick(event, 2), setPagina(1)}}
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
                            pessoasBusca.map((pessoa) => (
                                <Box key={pessoa.id} sx={{ width: 150, cursor: 'pointer' }} onClick={() => router.push(`/pessoa?p=${pessoa.id}`)}>
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
                    <Button disabled={pagina === totalPagina} variant='outlined' color='info' onClick={() => { getPopulares(); }}>Exibir mais</Button>
                </Box>
            </Container>
        </Content>
    );

}
