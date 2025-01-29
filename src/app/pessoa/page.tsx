'use client';

import { Accordion, AccordionDetails, AccordionSummary, Box, Button, CardMedia, Container } from '@mui/material';
import Content from '@/app/components/Content';
import React, { useEffect, useRef, useState } from 'react';
import * as pessoas from '@/services/pessoa.service';
import { useRouter } from 'next/navigation';
import { IPessoa, IPessoaFilme } from '@/types/pessoa.type';
import LoadingScreen from '../components/Loading';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import * as image from '@/assets/Screenshot 2025-01-23 at 23-11-57 404 Image Placeholder.png';
import CarrosselPessoa from '../components/CarrosselPessoa';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export default function Home() {
    const [loading, setLoading] = useState(true);
    const [pessoasBusca, setPessoasBusca] = useState<IPessoa>();
    const router = useRouter();
    const [expanded, setExpanded] = useState(false);
    const [exceedsTwoLines, setExceedsTwoLines] = useState(false);
    const textRef = useRef<HTMLDivElement>(null);
    const biografia = pessoasBusca?.biography;
    const [trabalhosFilmes, setTrabalhosFilmes] = useState<IPessoaFilme>();
    const [trabalhosSeries, setTrabalhosSeries] = useState<IPessoaFilme>();

    useEffect(() => {
        if (textRef.current) {
            const lineHeight = parseFloat(getComputedStyle(textRef.current).lineHeight);
            const maxHeight = lineHeight * 5;
            setExceedsTwoLines(textRef.current.scrollHeight > maxHeight);
        }
    }, [biografia]);

    const calcularIdade = (dataNascimento: string) => {
        if (dataNascimento == '') {
            return "Não informado"
        }
        const nascimento = new Date(dataNascimento);
        const hoje = new Date();

        let idade = hoje.getFullYear() - nascimento.getFullYear();
        const mesAtual = hoje.getMonth();
        const mesNascimento = nascimento.getMonth();
        const diaAtual = hoje.getDate();
        const diaNascimento = nascimento.getDate();

        // Ajusta a idade se o aniversário ainda não ocorreu no ano atual
        if (mesAtual < mesNascimento || (mesAtual === mesNascimento && diaAtual < diaNascimento)) {
            idade--;
        }

        return idade;
    };

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

    const fetchData = async () => {
        const { searchParams } = new URL(window.location.href);
        const query = searchParams.get('p');

        if (!query) router.push('/inicial');

        await Promise.all([
            pessoas.getPessoa(query as string).then((response) => {
                setPessoasBusca(response);
            }),
            pessoas.getPessoaFilmes(query as string).then((response) => {
                setTrabalhosFilmes(response);
            }),
            pessoas.getPessoaTv(query as string).then((response) => {
                setTrabalhosSeries(response);
            })
        ]);

        setLoading(false);
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <Content>
            {loading && <LoadingScreen />}
            <Container sx={{ mt: 10 }}>
                <Box>
                    <Card sx={{ display: { xs: 'block', sm: 'block', md: 'flex' }, bgcolor: 'rgba(255, 255, 255, 0.1)' }}>
                        <Box sx={{ width: "100%", display: { xs: "flex", sm: "flex", md: "none" }, justifyContent: "center" }}>
                            <CardMedia
                                component="img"
                                sx={{ width: 300, height: 400 }}
                                image={pessoasBusca?.profile_path ? `https://image.tmdb.org/t/p/w500${pessoasBusca?.profile_path}` : image.default.src}
                                alt="Live from space album cover"
                            />
                        </Box>
                        <CardMedia
                            component="img"
                            sx={{ width: 300, height: 400, display: { xs: "none", sm: "none", md: "flex" } }}
                            image={pessoasBusca?.profile_path ? `https://image.tmdb.org/t/p/w500${pessoasBusca?.profile_path}` : image.default.src}
                            alt="Live from space album cover"
                        />
                        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                            <CardContent sx={{ flex: '1 0 auto' }}>
                                <Typography sx={{ textAlign: { xs: "center", sm: "center", md: "left" } }} component="div" variant="h4">
                                    {pessoasBusca?.name}
                                </Typography>
                                <Typography
                                    variant="h6"
                                    color="rgba(255, 255, 255, 0.7)"
                                    component="div"
                                >
                                    Biografia
                                </Typography>
                                <Typography
                                    ref={textRef}
                                    variant="subtitle1"
                                    component="div"
                                    sx={{
                                        color: 'text.secondary',
                                        display: '-webkit-box',
                                        WebkitLineClamp: expanded ? undefined : 5,
                                        WebkitBoxOrient: 'vertical',
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                        fontSize: '16px',
                                    }}
                                >
                                    {pessoasBusca?.biography || 'Nenhuma biografia encontrada'}
                                </Typography>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        justifyContent: 'flex-end',
                                    }}
                                >
                                    {exceedsTwoLines && (
                                        <Button size="small" sx={{ color: 'rgba(255, 255, 255, 0.7)', "&:hover": { color: "rgba(255, 255, 255, 0.7)}" } }} onClick={() => setExpanded(!expanded)}>
                                            {expanded ? "Mostrar menos" : "Mostrar mais"}
                                        </Button>
                                    )}
                                </Box>
                                <Box
                                    sx={{
                                        display: 'flex'
                                    }}
                                >
                                    <Typography
                                        variant="h6"
                                        color="rgba(255, 255, 255, 0.7)"
                                        component="div"
                                        marginTop={1}
                                        sx={{ fontSize: { xs: "15px", sm: "15px", md: "17px" } }}
                                    >
                                        Nascimento: {formatarData(pessoasBusca?.birthday || '')} -
                                        {!pessoasBusca?.deathday && " Idade : " + calcularIdade(pessoasBusca?.birthday || '')}
                                    </Typography>
                                    {
                                        pessoasBusca?.deathday &&
                                        <Typography
                                            variant="h6"
                                            color="rgba(255, 255, 255, 0.7)"
                                            component="div"
                                            marginTop={1}
                                            marginLeft={1}
                                            sx={{ fontSize: { xs: "15px", sm: "15px", md: "17px" } }}
                                        >
                                            {"Óbito: " + formatarData(pessoasBusca?.deathday || '')}
                                        </Typography>
                                    }
                                </Box>
                                <Typography
                                    variant="h6"
                                    color="rgba(255, 255, 255, 0.7)"
                                    component="div"
                                    marginTop={1}
                                    sx={{ fontSize: { xs: "15px", sm: "15px", md: "17px"} }}
                                >
                                    Genero: {pessoasBusca?.gender == 1 ? 'Feminino' : 'Masculino'}
                                </Typography>
                                <Typography
                                    variant="h6"
                                    color="rgba(255, 255, 255, 0.7)"
                                    component="div"
                                    marginTop={1}
                                    sx={{ fontSize: { xs: "15px", sm: "15px", md: "17px"} }}
                                >
                                    Tambem conhecido como: {pessoasBusca?.also_known_as && Array.isArray(pessoasBusca.also_known_as) ? pessoasBusca.also_known_as.map((item: string, index: number) => index === pessoasBusca.also_known_as.length - 1 ? item : item + ", ") : "Nomes não encontrados"}
                                </Typography>
                            </CardContent>
                        </Box>
                    </Card>
                    <Typography
                        variant="h4"
                        component="div"
                        sx={{ color: "rgba(255, 255, 255, 0.7)", pt: 4, pb: 1 }}
                        textAlign={"center"}
                    >
                        Trabalhos de atuações
                    </Typography>
                    <div
                        style={{
                            padding: "30px 0 50px 0",
                        }}
                    >
                        <Accordion
                            sx={{ border: "1px solid rgba(255, 255, 255, 0.1)", bgcolor: "rgba(255, 255, 255, 0.05)" }}
                            disabled={trabalhosFilmes?.cast.length === 0}
                        >
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
                                <Typography component="span">Filmes</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Box sx={{ px: 2, height: "400px" }}>
                                    <CarrosselPessoa tipo="filmes" data={trabalhosFilmes?.cast || []} />
                                </Box>
                            </AccordionDetails>
                        </Accordion>
                        <Accordion
                            sx={{ border: "1px solid rgba(255, 255, 255, 0.1)", bgcolor: "rgba(255, 255, 255, 0.05)" }}
                            disabled={trabalhosSeries?.cast.length === 0}
                        >
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
                                <Typography component="span">Séries</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Box sx={{ px: 2, height: "400px" }}>
                                    <CarrosselPessoa tipo='tv-series' data={trabalhosSeries?.cast || []} />
                                </Box>
                            </AccordionDetails>
                        </Accordion>
                    </div>
                </Box>
            </Container>
        </Content>
    );
}
