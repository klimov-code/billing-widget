import { Container } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';

import { AdminWidget } from '@app/widgets/admin';
import { BillingWidget } from '@app/widgets/billing';

export const App = () => {
  return (
    <Container maxWidth="sm">
      <Grid container spacing={4} justifyContent="space-around">
        <Grid sm={9}>
          <BillingWidget />
        </Grid>

        <Grid sm={9}>
          <AdminWidget />
        </Grid>
      </Grid>
    </Container>
  );
};
