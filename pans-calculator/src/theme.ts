import { createTheme, Direction } from '@mui/material/styles';

const direction: Direction = 'rtl';

const theme = createTheme({
  direction,
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
  typography: {
    fontFamily: '"Roboto","Arial","sans-serif"',
  },
});

export default theme;
