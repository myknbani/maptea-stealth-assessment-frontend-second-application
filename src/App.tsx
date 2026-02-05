import { useEffect } from 'react';
import { useQuery } from 'urql';
import { graphql } from './generated';
import type { GetLeadsQuery } from './generated/graphql';
import { CircularProgress, Alert, Box } from '@mui/material';
import { Navbar } from './components/Navbar';
import { LeadsTable } from './components/LeadsTable';

const GetLeadsDocument = graphql(`
  query GetLeads($paginationOptions: ListLeadsInput!) {
    leads(listLeadsInput: $paginationOptions) {
      pageInfo {
        itemsPerPage
        currentPage
        totalItemsCount
        hasNextPage
        hasPreviousPage
        offset
      }
      records {
        id
        fullName
        email
        mobileNumber
        postCode
        serviceTypes {
          name
        }
        createdAt
      }
    }
  }
`);

function App() {
  const [result, reexecuteQuery] = useQuery<GetLeadsQuery>({
    query: GetLeadsDocument,
    variables: {
      paginationOptions: {
        currentPage: 1,
        itemsPerPage: 10,
      },
    },
    requestPolicy: 'network-only',
  });

  useEffect(() => {
    const interval = setInterval(() => {
      reexecuteQuery({ requestPolicy: 'network-only' });
    }, 10000);
    return () => clearInterval(interval);
  }, [reexecuteQuery]);

  const { data, fetching, error } = result;

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
