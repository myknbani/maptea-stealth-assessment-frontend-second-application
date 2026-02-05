import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { format } from 'date-fns';
import type { GetLeadsQuery } from '../generated/graphql';

type Lead = GetLeadsQuery['leads']['records'][number];

const hasService = (lead: Lead, serviceName: string) => {
  return lead.serviceTypes.some((service) => service.name === serviceName);
};

interface LeadsTableProps {
  leads: Lead[];
}

export function LeadsTable({ leads }: LeadsTableProps) {
  return (
    <TableContainer component={Paper} sx={{ height: '100%' }}>
      <Table stickyHeader>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Full Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Mobile</TableCell>
            <TableCell>Post Code</TableCell>
            <TableCell align="center">Delivery</TableCell>
            <TableCell align="center">Pick-up</TableCell>
            <TableCell align="center">Payment</TableCell>
            <TableCell>Registered</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {leads.map((lead) => (
            <TableRow key={lead.id}>
              <TableCell>{lead.id}</TableCell>
              <TableCell>{lead.fullName}</TableCell>
              <TableCell>{lead.email}</TableCell>
              <TableCell>{lead.mobileNumber}</TableCell>
              <TableCell>{lead.postCode}</TableCell>
              <TableCell align="center">
                {hasService(lead, 'delivery') ? (
                  <CheckIcon color="success" />
                ) : (
                  <CloseIcon color="error" />
                )}
              </TableCell>
              <TableCell align="center">
                {hasService(lead, 'pick-up') ? (
                  <CheckIcon color="success" />
                ) : (
                  <CloseIcon color="error" />
                )}
              </TableCell>
              <TableCell align="center">
                {hasService(lead, 'payment') ? (
                  <CheckIcon color="success" />
                ) : (
                  <CloseIcon color="error" />
                )}
              </TableCell>
              <TableCell>{format(new Date(lead.createdAt), "MMM dd ''yy")}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
