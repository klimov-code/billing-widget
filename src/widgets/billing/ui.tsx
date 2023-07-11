import PaymentIcon from '@mui/icons-material/Payment';
import { LoadingButton } from '@mui/lab';
import { Card, CardActions, CardContent, CardHeader, Divider, Typography } from '@mui/material';
import { useStore } from 'effector-react';

import { PeriodSwitch } from '@app/entities/period';
import { TrialSwitch } from '@app/entities/viewer';
import { BillingList, billingModel } from '@app/features/billing-list';
import { TotalCost } from '@app/features/total-cost';

export const BillingWidget = () => {
  const loading = useStore(billingModel.$loading);

  return (
    <Card>
      <CardHeader
        title={
          <Typography component="h2" variant="h4">
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
          color="primary"
          fullWidth={true}
          loading={loading}
          loadingPosition="start"
          size="large"
          startIcon={<PaymentIcon fontSize="inherit" />}
          variant="contained"
        >
          Checkout
        </LoadingButton>
      </CardActions>
    </Card>
  );
};
