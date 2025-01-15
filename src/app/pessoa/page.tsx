'use client';

import { Box, Container, CircularProgress, CardMedia } from '@mui/material';
import Content from '@/app/components/Content';
import React, { useEffect, useState } from 'react';
import * as pessoas from '@/services/pessoa.service';
import { useSearchParams } from 'next/navigation';
import { IPessoa } from '@/types/pessoa.type';

export default function Home() {
    const [loading, setLoading] = useState(true);
    const [pessoasBusca, setPessoasBusca] = useState<IPessoa>();

    const searchParams = useSearchParams();


    const fetchData = async () => {
        const query = searchParams.get('p');
        if (!query) {
            console.error("Parâmetro 'p' está ausente");
            setLoading(false);
            return;
        }

        await Promise.all([
            pessoas.getPessoa(query).then((response) => {
                console.log(response.results);
                
                setPessoasBusca(response.results);
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
            <Box>
                <CardMedia>
                    <img src={`https://image.tmdb.org/t/p/w500/${pessoasBusca?.profile_path}`} alt={pessoasBusca?.name} />
                </CardMedia>
            </Box>
        </Content>
    );

}
