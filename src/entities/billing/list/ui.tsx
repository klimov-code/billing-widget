import { useId } from 'react';
import { Divider, Skeleton, Stack, Typography } from '@mui/material';
import { grey } from '@mui/material/colors';
import { useStore } from 'effector-react';

import { viewerModel } from '@app/entities/viewer';

import { convert } from './lib';
import { $billingList, TBillingEntity } from './model';

export const BillingBlank = () => {
  return (
    <Stack component="article" direction="row" justifyContent="space-between">
      <Stack justifyContent="space-between">
        <Typography variant="h6" component="p" width={100} textAlign="start">
          <Skeleton />
        </Typography>
        <Typography variant="subtitle1" width={140} textAlign="start">
          <Skeleton />
        </Typography>
      </Stack>
      <Stack justifyContent="space-between">
        <Typography variant="body2" width={60} textAlign="end" py={0.75}>
          <Skeleton />
        </Typography>
        <Typography variant="body1" width={60} textAlign="end" py={0.25}>
          <Skeleton />
        </Typography>
      </Stack>
    </Stack>
  );
};

export const BillingEntity = ({
  loading = false,
  name,
  quantity,
  price,
  price_unit,
  period,
}: TBillingEntity & { loading?: boolean }) => {
  const isTrial = useStore(viewerModel.$isTrial);

  return (
    <Stack component="article" direction="row" justifyContent="space-between">
      <Stack justifyContent="space-between" alignItems="start">
        <Typography variant="h6" component="p" minWidth={140} textAlign="start">
          {loading ? <Skeleton /> : name}
        </Typography>
        <Typography variant="subtitle1" minWidth={100} textAlign="start">
          {loading ? <Skeleton /> : `${quantity} ${price_unit} for $${convert(price)} per ${period}`}
        </Typography>
      </Stack>
      <Stack justifyContent="space-between" alignItems="end">
        <Typography
          variant="body2"
          minWidth={80}
          textAlign="end"
          py={0.75}
          color={isTrial ? grey[400] : 'default'}
          sx={{ textDecorationLine: 'line-through', textDecorationThickness: 2 }}
        >
          {loading ? <Skeleton /> : isTrial ? `$${convert(price * quantity)}` : ''}
        </Typography>

        <Typography variant="body1" minWidth={60} textAlign="end" py={0.25}>
          {loading ? <Skeleton /> : isTrial ? '= $0' : `= $${convert(price * quantity)}`}
        </Typography>
      </Stack>
    </Stack>
  );
};

export const BillingList = () => {
  const list = useStore($billingList);

  return (
    <Stack spacing={1.5} divider={<Divider orientation="horizontal" />}>
      {list.length ? list.map((entity) => <BillingEntity {...entity} key={useId()} />) : <BillingBlank />}
    </Stack>
  );
};
