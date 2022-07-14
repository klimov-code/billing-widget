import PaymentIcon from '@mui/icons-material/Payment';
import { LoadingButton } from '@mui/lab';
import { Card, CardActions, CardContent, CardHeader, Divider, Typography } from '@mui/material';

import { PeriodSwitch } from '@app/entities/period';
import { TrialSwitch } from '@app/entities/viewer';
import { BillingList } from '@app/features/billing-list';
import { TotalCost } from '@app/features/total-cost';

export const BillingWidget = () => (
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

      <TotalCost />
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
);
