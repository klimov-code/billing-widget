import { Container } from '@mui/material';

import { AdminWidget } from '@app/widgets/admin';
import { BillingWidget } from '@app/widgets/billing';

export const App = () => {
  return (
    <Container maxWidth="md" sx={{ height: '100vh', display: 'flex', alignItems: 'start', gap: 4 }}>
      <BillingWidget />

      <AdminWidget />
    </Container>
  );
};
