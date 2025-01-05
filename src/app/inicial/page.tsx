'use client';

import { Box, Button, Card, CardContent, CardMedia, CircularProgress, Container, Divider, Stack, Tab, Tabs, Typography } from '@mui/material';
import Content from '@/app/components/Content';
import * as films from '@/services/films.service';
import { Popular } from '@/types/popular.type';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Carrosel from '@/app/components/Carrosel'

export default function Home() {

    const router = useRouter();

    const [filmes, setFilmes] = useState<Popular[]>([]);
    const [filmesPopulares, setFilmesPopulares] = useState<Popular[]>([]);
    const [pagina, setPagina] = useState(0);

    const [value, setValue] = React.useState('one');

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };

    const getRecents = async () => {
        await films.getRecents()
            .then((data) => {
                setFilmes(data.results);
            })
    };

    useEffect(() => {
        getRecents();
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
                <Stack sx={{ alignItems: 'left', width: '100%', mt: 4}}>
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
                        Popularidade atual
                    </Typography>
                </Stack>
                <Stack sx={{ alignItems: 'left', width: '100%', p: 2, border: 1, borderColor: 'GrayText', borderRadius: 2, mt: 4}}>
                    <Tabs
                        value={value}
                        onChange={handleChange}
                        sx={{ color: 'red', borderBottom: 2, borderColor: 'divider', mx: -2 }}
                    >
                        <Tab value="filmes" label="Filmes" sx={{ color: 'success.main', ml: 2 }} />
                        <Tab value="series" label="Series" sx={{ color: 'success.main', ml: 2 }} />
                    </Tabs>
                    <Box sx={{ height: 200 }}>
                    </Box>
                </Stack>
                
            </Container>
        </Content >
    );
}
