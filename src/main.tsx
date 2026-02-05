import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createClient, Provider as UrqlProvider, fetchExchange, cacheExchange } from 'urql';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from './theme';
import './index.css';
import App from './App.tsx';

const client = createClient({
  url: import.meta.env.VITE_GRAPHQL_ENDPOINT,
  exchanges: [cacheExchange, fetchExchange],
  fetchOptions: {
    headers: {
      'content-type': 'application/json',
    },
  },
  requestPolicy: 'network-only',
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <UrqlProvider value={client}>
        <App />
      </UrqlProvider>
    </ThemeProvider>
  </StrictMode>,
);
