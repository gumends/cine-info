import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import * as films from '@/services/films.service';
import { IFilme } from '@/types/filmes.type';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { Typography } from '@mui/material';

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

  const [search, setSearch] = useState('');
  const [filmes, setFilmes] = useState<IFilme[]>([]);

  useEffect(() => {
    films.getFilmePorNome(search)
      .then((data: IFilme[]) => setFilmes(data));
  }, [search])
  return (
    <AppBar
      position="fixed"
      sx={{ boxShadow: 0, bgcolor: 'transparent', backgroundImage: 'none', mt: 10 }}
    >
      <Container maxWidth="lg">
        <StyledToolbar variant="dense" disableGutters>
          <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', px: 0, justifyContent: 'space-between' }}>
            <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
              <Button variant="text" color="info" size="small" onClick={() => { router.push('/filmes') }}>
                Filmes
              </Button>
              <Button variant="text" color="info" size="small">
                Series
              </Button>
              <Button variant="text" color="info" size="small">
                TV serieris
              </Button>
            </Box>
            <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
              <Autocomplete
                id="country-select-demo"
                sx={{ width: 500 }}
                options={filmes}
                autoHighlight
                getOptionLabel={(option) => option.title}
                renderOption={(props, option) => {
                  const { key, ...optionProps } = props;
                  return (
                    <Box
                      key={key}
                      component="li"
                      sx={{ '& > img': { mr: 2, flexShrink: 0 } }}
                      {...optionProps}
                    >
                      <img
                        loading="lazy"
                        width="70"
                        srcSet={`https://image.tmdb.org/t/p/original${option.poster_path}.jpg`}
                        src={`https://image.tmdb.org/t/p/original${option.poster_path}.jpg`}
                        alt=""
                      />
                      <Box>
                        <Typography>{option.title}</Typography>
                        <Typography>{option.release_date}</Typography>
                      </Box>
                    </Box>
                  );
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                )}
              />
            </Box>
          </Box>
        </StyledToolbar>
      </Container>
    </AppBar>
  );
}
