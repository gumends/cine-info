import * as React from 'react';
import {
  createTheme,
  ThemeProvider,
  PaletteMode,
} from '@mui/material/styles';
import Box from '@mui/material/Box';
import ToggleColorMode from './components/ToggleColorMode';
import getMPTheme from './theme/getMPTheme';

interface TemplateFrameProps {
  showCustomTheme: boolean;
  toggleCustomTheme: (theme: boolean) => void;
  mode: PaletteMode;
  toggleColorMode: () => void;
  children: React.ReactNode;
}

export default function TemplateFrame({
  mode,
  toggleColorMode,
  children,
}: TemplateFrameProps) {
  const MPTheme = createTheme(getMPTheme(mode));

  return (
    <ThemeProvider theme={MPTheme}>
          <ToggleColorMode
            data-screenshot="toggle-mode"
            mode={mode}
            toggleColorMode={toggleColorMode}
          />
        <Box sx={{ flex: '1 1', overflow: 'auto' }}>{children}</Box>
    </ThemeProvider>
  );
}
