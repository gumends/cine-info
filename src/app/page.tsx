'use client'

import { Container, Stack, Typography } from '@mui/material'
import Content from './components/Content'

export default function home() {
    return (
        <Content>
            <Container
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Stack
                    spacing={2}
                    useFlexGap
                    sx={{ alignItems: 'center', width: { xs: '100%', sm: '70%' }, }}
                >
                    <Typography
                        variant="h1"
                        sx={{
                            display: 'flex',
                            flexDirection: { xs: 'column', sm: 'row' },
                            alignItems: 'center',
                            fontSize: 'clamp(3rem, 10vw, 3.5rem)'
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
            </Container>
        </Content>
    )
}