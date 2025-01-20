'use client';

import { Box, CardMedia } from '@mui/material';
import Content from '@/app/components/Content';
import React, { useEffect, useState } from 'react';
import * as pessoas from '@/services/pessoa.service';
import { useRouter } from 'next/navigation';
import { IPessoa } from '@/types/pessoa.type';
import LoadingScreen from '../components/Loading';

export default function Home() {
    const [loading, setLoading] = useState(true);
    const [pessoasBusca, setPessoasBusca] = useState<IPessoa>();
    const router = useRouter();

    const fetchData = async () => {
        const { searchParams } = new URL(window.location.href);
        const query = searchParams.get('p');

        if (!query) router.push('/filmes');

        await Promise.all([
            pessoas.getPessoa(query as string).then((response) => {
                setPessoasBusca(response.results);
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
            <Box>
                {pessoasBusca && (
                    <CardMedia>
                        <img src={`https://image.tmdb.org/t/p/w500/${pessoasBusca?.profile_path}`} alt={pessoasBusca?.name} />
                    </CardMedia>
                )}
            </Box>
        </Content>
    );
}
