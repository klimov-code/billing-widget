import PaymentIcon from '@mui/icons-material/Payment';
import { LoadingButton } from '@mui/lab';
import { Card, CardContent, CardHeader, Container, Divider, Typography } from '@mui/material';

import { TrialBanner } from '@app/entities/viewer';
import { BillingList } from '@app/features/billing';

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

          <LoadingButton
            variant="contained"
            color="success"
            fullWidth
            size="large"
            loading={false}
            loadingPosition="start"
            startIcon={<PaymentIcon fontSize="inherit" className="mr-2" />}
          >
            Checkout
          </LoadingButton>
        </CardContent>
      </Card>
    </Container>
  );
};
