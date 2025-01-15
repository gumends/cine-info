import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import { useRouter } from 'next/navigation';
import Box from '@mui/material/Box';
import { IconButton, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useSearchParams } from 'next/navigation';

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  flexShrink: 0,
  borderRadius: `calc(${theme.shape.borderRadius}px + 8px)`,
  backdropFilter: 'blur(24px)',
  border: '1px solid',
  borderColor: theme.palette.divider,
  backgroundColor: alpha(theme.palette.background.default, 0.4),
  boxShadow: theme.shadows[1],
  padding: '8px 12px',
}));

export default function AppAppBar() {
  const router = useRouter();

  const searchParams = useSearchParams(); 

  const [busca, setBusca] = React.useState('');

  React.useEffect(() => {
    setBusca(searchParams.get('q') as string);
  }, []);

  return (
    <Container maxWidth="lg" sx={{ mb: 6 }}>
      <StyledToolbar variant="dense" disableGutters>
        <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', px: 0, justifyContent: 'space-around', height: '50px' }}>
          <Box sx={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: { xs: 'center', sm: 'flex-start' } }}>
          <Button variant="text" color="info" size="medium" onClick={() => { router.push('/inicial') }}>
              Inicial
            </Button>
            <Button variant="text" color="info" size="medium" onClick={() => { router.push('/filmes') }}>
              Filmes
            </Button>
            <Button variant="text" color="info" size="medium" onClick={() => { router.push('/tv-series') }}>
              Series
            </Button>
          </Box>
          <Box sx={{ width: '100%', display: 'flex', justifyContent: 'end' }}>
            <TextField 
            variant="outlined" 
            value={busca} 
            onChange={(e) => setBusca(e.target.value)} placeholder='Busca' 
            sx={{ mt: 0, width: 500 }} 
            onKeyDown={(e) => { if (e.key === 'Enter') { router.push(`/busca?q=${busca.replace(' ', '%20')}`) } }}
            />
            <IconButton color="success" onClick={() => { router.push(`/busca?q=${busca.replace(' ', '%20')}`) }} sx={{ ml: 1 }}>
              <SearchIcon />
            </IconButton>
          </Box>
        </Box>
      </StyledToolbar>
    </Container>
  );
}
