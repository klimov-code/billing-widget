import PaymentIcon from '@mui/icons-material/Payment';
import { LoadingButton } from '@mui/lab';
import { Card, CardActions, CardContent, CardHeader, Container, Divider, Typography } from '@mui/material';

import { TrialBanner } from '@app/entities/viewer';
import { BillingList } from '@app/features/billing-list';
import { PeriodSwitch } from '@app/features/period-switch';

export const App = () => {
  return (
    <Container maxWidth="xs" sx={{ height: '100vh', display: 'flex', alignItems: 'center' }}>
      <Card sx={{ width: '100%' }}>
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

          <TrialBanner />

          <PeriodSwitch />
        </CardContent>

        <CardActions>
          <LoadingButton
            variant="contained"
            color="success"
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
    </Container>
  );
};
