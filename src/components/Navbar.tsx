import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

interface NavbarProps {
  onRegisterClick: () => void;
}

export function Navbar({ onRegisterClick }: NavbarProps) {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography sx={{ fontWeight: 900, color: 'white', flexGrow: 1 }} variant="h6">
          Maptea Eats
        </Typography>
        <Button color="inherit" startIcon={<AddIcon />} onClick={onRegisterClick}>
          Register Lead
        </Button>
      </Toolbar>
    </AppBar>
  );
}
