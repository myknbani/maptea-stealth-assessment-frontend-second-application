import { CircularProgress, Alert, Box } from '@mui/material';
import { Navbar } from './components/Navbar';
import { LeadsTable } from './components/LeadsTable';
import { useLeads } from './hooks/useLeads';

function App() {
  const { data, fetching, error } = useLeads();

  return (
    <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />

      <Box sx={{ flex: 1, overflow: 'hidden' }}>
        {fetching && (
          <Box display="flex" justifyContent="center" alignItems="center" height="100%">
            <CircularProgress />
          </Box>
        )}

        {error && (
          <Box sx={{ p: 3 }}>
            <Alert severity="error">Error: {error.message}</Alert>
          </Box>
        )}

        {data && <LeadsTable leads={data.leads.records} />}
      </Box>
    </Box>
  );
}

export default App;
