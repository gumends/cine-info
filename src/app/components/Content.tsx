'use client';
import * as React from 'react';
import { PaletteMode, ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import AppAppBar from './AppAppBar';
import Footer from './Footer';
import getMPTheme from '../theme/getMPTheme';
import TemplateFrame from '../TemplateFrame';
import { Box, Container } from '@mui/material';

interface IMarketingPageProps {
  children: React.ReactNode;
  rgba?: string; // Define a propriedade "rgba" aqui
}

export default function MarketingPage({
  children,
  rgba, // Desestruturar a propriedade "rgba"
}: IMarketingPageProps) {
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
              `radial-gradient(ellipse 80% 50% at 50% -20%, ${rgba}, transparent)`, // Cor em RGBA
            ...theme.applyStyles('dark', {
              backgroundImage:
                `radial-gradient(ellipse 80% 50% at 50% -20%, ${rgba}, transparent)`, // Cor em RGBA para o modo escuro
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
