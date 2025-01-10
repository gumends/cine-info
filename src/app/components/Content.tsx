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
}

export default function MarketingPage({
  children,
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
            ...theme.applyStyles('dark', {
              backgroundImage: `
                radial-gradient(circle at 30% 20%, rgba(70, 130, 180, 0.6), transparent 50%),
                radial-gradient(circle at 70% 50%, rgba(75, 0, 130, 0.5), transparent 60%),
                radial-gradient(circle at 50% 80%, rgba(123, 104, 238, 0.4), transparent 70%)
              `,
            }),
          })}
        >
          <CssBaseline enableColorScheme />
          <Container
            sx={{
              pt: 5,
              pb: { xs: 8, sm: 12 },
            }}
          >
            <AppAppBar />
            {children}
          </Container>
        </Box>
        <Footer />
      </ThemeProvider>
    </TemplateFrame>
  );
}
