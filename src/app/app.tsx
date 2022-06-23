import PaymentIcon from '@mui/icons-material/Payment';
import { LoadingButton } from '@mui/lab';
import { Card, CardActions, CardContent, CardHeader, Container, Divider, Typography } from '@mui/material';

import { PeriodSwitch } from '@app/entities/period';
import { ResourceList } from '@app/entities/resource';
import { TrialSwitch } from '@app/entities/viewer';
import { BillingList } from '@app/features/billing-list';

export const App = () => {
  return (
    <Container maxWidth="md" sx={{ height: '100vh', display: 'flex', alignItems: 'start', gap: 4 }}>
      <Card sx={{ width: '50%' }}>
        <CardHeader
          title={
            <Typography variant="h4" component="h2">
              Billing Widget
            </Typography>
          }
        />
        <CardContent>
          <BillingList />

          <Divider sx={{ paddingTop: 1.5 }} />

          <TrialSwitch />

          <PeriodSwitch />
        </CardContent>

        <CardActions>
          <LoadingButton
            variant="contained"
            color="primary"
            fullWidth={true}
            size="large"
            loading={false}
            loadingPosition="start"
            startIcon={<PaymentIcon fontSize="inherit" />}
          >
            Checkout
          </LoadingButton>
        </CardActions>
      </Card>
      <Card sx={{ width: '50%' }}>
        <CardContent>
          <ResourceList />
        </CardContent>
      </Card>
    </Container>
  );
};
