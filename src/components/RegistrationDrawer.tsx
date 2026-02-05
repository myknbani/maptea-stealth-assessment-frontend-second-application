import { zodResolver } from '@hookform/resolvers/zod';
import CloseIcon from '@mui/icons-material/Close';
import {
  Box,
  Button,
  Drawer,
  FormHelperText,
  IconButton,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { isValidPhoneNumber } from 'libphonenumber-js';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';
import { ServiceTypeSwitch } from './ServiceTypeSwitch';

// TODO: Service types are hardcoded since there's no query that returns all service types
const AVAILABLE_SERVICE_TYPES = ['pick-up', 'delivery', 'payment'];

const registerSchema = z.object({
  fullName: z.string().min(1, 'Full name is required'),
  email: z.string().email('Invalid email address'),
  mobileNumber: z.string().refine((val) => isValidPhoneNumber(val), {
    message: 'Invalid phone number',
  }),
  postCode: z.string().min(4, 'Post code is required'),
  serviceTypeNames: z.array(z.string()).min(1, 'At least one service type is required'),
});

type RegisterFormData = z.infer<typeof registerSchema>;

interface RegisterDrawerProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: RegisterFormData) => void;
}

export function RegistrationDrawer({ open, onClose, onSubmit }: RegisterDrawerProps) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      fullName: '',
      email: '',
      mobileNumber: '',
      postCode: '',
      serviceTypeNames: AVAILABLE_SERVICE_TYPES,
    },
  });

  const handleFormSubmit = (data: RegisterFormData) => {
    onSubmit(data);
    onClose();
  };

  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <Box sx={{ width: 400, p: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h5">Register Lead</Typography>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>

        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <Stack spacing={3}>
            <Controller
              name="fullName"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Full Name"
                  fullWidth
                  error={!!errors.fullName}
                  helperText={errors.fullName?.message}
                />
              )}
            />

            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Email"
                  type="email"
                  fullWidth
                  error={!!errors.email}
                  helperText={errors.email?.message}
                />
              )}
            />

            <Controller
              name="mobileNumber"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Mobile Number"
                  fullWidth
                  error={!!errors.mobileNumber}
                  helperText={errors.mobileNumber?.message}
                />
              )}
            />

            <Controller
              name="postCode"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Post Code"
                  fullWidth
                  error={!!errors.postCode}
                  helperText={errors.postCode?.message}
                />
              )}
            />

            <Controller
              name="serviceTypeNames"
              control={control}
              render={({ field }) => (
                <Box>
                  <Typography variant="subtitle2" gutterBottom>
                    Service Types
                  </Typography>
                  <Stack spacing={1}>
                    {AVAILABLE_SERVICE_TYPES.map((serviceType) => (
                      <ServiceTypeSwitch
                        key={serviceType}
                        serviceType={serviceType}
                        value={field.value}
                        onChange={field.onChange}
                      />
                    ))}
                  </Stack>
                  {errors.serviceTypeNames && (
                    <FormHelperText error>{errors.serviceTypeNames.message}</FormHelperText>
                  )}
                </Box>
              )}
            />

            <Button type="submit" variant="contained" size="large" fullWidth>
              Register Lead
            </Button>
          </Stack>
        </form>
      </Box>
    </Drawer>
  );
}
