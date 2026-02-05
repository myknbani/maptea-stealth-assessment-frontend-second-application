import { useState } from 'react';
import { CircularProgress, Alert, Box, Snackbar } from '@mui/material';
import { Navbar } from './components/Navbar';
import { LeadsTable } from './components/LeadsTable';
import { RegistrationDrawer } from './components/RegistrationDrawer';
import { useLeads } from './hooks/useLeads';
import { useRegisterLead } from './hooks/useRegisterLead';
import { useSnackbar } from './hooks/useSnackbar';
import type { MutationRegisterArgs } from './generated/graphql';

function App() {
  const { data, fetching, error } = useLeads();
  const { registerLead } = useRegisterLead();
  const { snackbar, showSuccess, showError, close } = useSnackbar();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleRegisterSubmit = async (formData: MutationRegisterArgs['newLeadData']) => {
    const result = await registerLead(formData);
    if (result.error) {
      showError(result.error.message);
    } else {
      showSuccess('Lead registered:', formData.fullName);
    }
  };

  return (
    <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar onRegisterClick={() => setDrawerOpen(true)} />
      <RegistrationDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        onSubmit={handleRegisterSubmit}
      />
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={close}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.leadName ? (
            <>
              {snackbar.message} <strong>{snackbar.leadName}</strong>
            </>
          ) : (
            snackbar.message
          )}
        </Alert>
      </Snackbar>

      <Box sx={{ flex: 1, overflow: 'hidden' }}>
        {fetching && !data && (
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
