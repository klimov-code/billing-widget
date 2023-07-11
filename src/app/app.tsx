import { Container } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';

import { AdminWidget } from '@app/widgets/admin';
import { BillingWidget } from '@app/widgets/billing';

export const App = () => {
  return (
    <Container maxWidth="sm">
      <Grid container justifyContent="space-around" spacing={4}>
        <Grid sm={8}>
          <BillingWidget />
        </Grid>

        <Grid sm={8}>
          <AdminWidget />
        </Grid>
      </Grid>
    </Container>
  );
};
