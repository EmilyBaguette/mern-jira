import { useEffect } from 'react';

import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';

import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import { store } from 'store/store';

import { router } from './routes/router';

const theme = createTheme({ palette: { mode: 'light' } });

export default function App() {
  useEffect(() => {
    fetch('/api/tickets');
  }, []);

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline enableColorScheme />
        <RouterProvider router={router} />
      </ThemeProvider>
    </Provider>
  );
}
