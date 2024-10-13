'use client';

import { Box, Container, Stack, Typography } from '@mui/material';
import Content from './components/Content';
import { DemoComponent } from './components/Carrosel';
import * as films from '@/services/films.service';
import { PopularResponse } from '@/types/popular.type';
import { Popular } from '@/types/popular.type';

import { useEffect, useState } from 'react';

export default function Home() {

    const [filmes, setFilmes] = useState<Popular[]>([]);

    const getPopular = async () => {
        await films.getPopular()
            .then((data) => {
                setFilmes(data.results);
            })
    };

    useEffect(() => {
        getPopular();
    }, []);


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
                >
                    <Typography
                        variant="h1"
                        sx={{
                            display: 'flex',
                            flexDirection: { xs: 'column', sm: 'row' },
                            alignItems: 'center',
                            fontSize: 'clamp(3rem, 10vw, 3.5rem)',
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
                            })}
                        >
                            Info
                        </Typography>
                    </Typography>
                </Stack>
                <Box sx={{ mt: 4 }}>
                    <DemoComponent results={filmes} />
                </Box>
            </Container>
        </Content>
    );
}
