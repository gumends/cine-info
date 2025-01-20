'use client';
import React, { Suspense } from 'react';
import { PaletteMode, ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import AppAppBar from './AppAppBar';
import Footer from './Footer';
import getMPTheme from '../theme/getMPTheme';
import TemplateFrame from '../TemplateFrame';
import { Box } from '@mui/material';

interface IMarketingPageProps {
  children: React.ReactNode;
  showMenu?: boolean;
}

export default function MarketingPage({
  children,
  showMenu = true,
}: IMarketingPageProps) {
  const [mode] = React.useState<PaletteMode>('dark');
  const [showCustomTheme, setShowCustomTheme] = React.useState(true);
  const MPTheme = createTheme(getMPTheme(mode));
  const defaultTheme = createTheme({ palette: { mode } });

  React.useEffect(() => {
    const savedMode = localStorage.getItem('themeMode') as PaletteMode | null;
    if (savedMode) {
    }
  }, []);

  const toggleColorMode = () => {
    const newMode = mode === 'dark' ? 'light' : 'dark';
    localStorage.setItem('themeMode', newMode);
  };

  const toggleCustomTheme = () => {
    setShowCustomTheme((prev) => !prev);
  };

  return (
    <Suspense>
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
            sx={{
              width: '100%',
              minHeight: '100vh',
              backgroundRepeat: 'no-repeat',
              backgroundAttachment: 'fixed',
              backgroundImage: `
      radial-gradient(circle at 30% 20%, rgba(70, 130, 180, 0.6), transparent 50%),
      radial-gradient(circle at 70% 50%, rgba(75, 0, 130, 0.5), transparent 60%),
      radial-gradient(circle at 50% 80%, rgba(123, 104, 238, 0.4), transparent 70%)
    `,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            <CssBaseline enableColorScheme />
            {/* AppAppBar sempre no topo */}
            <Box
              sx={{
                position: 'relative', // Fixo no topo
                top: 20,
                left: 0,
                width: '100%',
                zIndex: (theme) => theme.zIndex.drawer + 1, // Prioridade alta no zIndex
              }}
            >
              {
                showMenu && (
                  <AppAppBar />
                )
              }
            </Box>
            {/* Conteúdo abaixo do AppAppBar */}
            <Box
              sx={{
                paddingTop: '64px', // Espaço para o AppAppBar (ajuste conforme sua altura)
                zIndex: 1,
              }}
            >
              {children}
            </Box>
          </Box>
          <Footer />
        </ThemeProvider>
      </TemplateFrame>
    </ Suspense>
  );
}
