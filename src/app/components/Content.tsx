'use client';
import * as React from 'react';
import { PaletteMode, ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import AppAppBar from './AppAppBar';
import Footer from './Footer';
import getMPTheme from '../theme/getMPTheme';
import TemplateFrame from '../TemplateFrame';
import { Box, Container, Stack, Typography } from '@mui/material';

export default function MarketingPage({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mode, setMode] = React.useState<PaletteMode>('light');
  const [showCustomTheme, setShowCustomTheme] = React.useState(true);
  const MPTheme = createTheme(getMPTheme(mode));
  const defaultTheme = createTheme({ palette: { mode } });

  React.useEffect(() => {
    const savedMode = localStorage.getItem('themeMode') as PaletteMode | null;
    if (savedMode) {
      setMode(savedMode);
    } else {
      const systemPrefersDark = window.matchMedia(
        '(prefers-color-scheme: dark)',
      ).matches;
      setMode(systemPrefersDark ? 'dark' : 'light');
    }
  }, []);

  const toggleColorMode = () => {
    const newMode = mode === 'dark' ? 'light' : 'dark';
    setMode(newMode);
    localStorage.setItem('themeMode', newMode);
  };

  const toggleCustomTheme = () => {
    setShowCustomTheme((prev) => !prev);
  };

  return (
    <TemplateFrame
      toggleCustomTheme={toggleCustomTheme}
      showCustomTheme={showCustomTheme}
      mode={mode}
      toggleColorMode={toggleColorMode}
    >
      <ThemeProvider
        theme={showCustomTheme ? MPTheme : defaultTheme}
      >
        <Box
          id="hero"
          sx={(theme) => ({
            width: '100%',
            backgroundRepeat: 'no-repeat',
            backgroundImage:
              'radial-gradient(ellipse 80% 50% at 50% -20%, hsl(116 100% 90%), transparent)',
            ...theme.applyStyles('dark', {
              backgroundImage:
                'radial-gradient(ellipse 80% 50% at 50% -20%, hsl(117 100% 16%), transparent)',
            }),

          })}
        >
          <CssBaseline enableColorScheme />
          <AppAppBar />
          <Container
          sx={{
            pt: { xs: 4, sm: 20 },
            pb: { xs: 8, sm: 12 },
          }}
          >
            {children}
          </Container>
        </Box>
        <Footer />
      </ThemeProvider>
    </TemplateFrame>
  );
}
