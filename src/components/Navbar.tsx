import { AppBar, Toolbar, Typography } from '@mui/material';

export function Navbar() {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography sx={{ fontWeight: 900, color: 'white' }} variant="h6">
          Maptea Eats
        </Typography>
      </Toolbar>
    </AppBar>
  );
}
