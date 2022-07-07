import { Divider, Skeleton, Stack, Typography } from '@mui/material';
import { grey } from '@mui/material/colors';
import { useList, useStore } from 'effector-react';

import { viewerModel } from '@app/entities/viewer';

import { convert } from './lib';
import { $billingCount, $billingList, $loading, TBillingEntity } from './model';

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

export const BillingEntity = (entity: TBillingEntity) => {
  const trial = useStore(viewerModel.$isTrial);
  const loading = useStore($loading);

  return (
    <Stack component="article" direction="row" justifyContent="space-between">
      <Stack justifyContent="space-between" alignItems="start">
        <Typography variant="h6" component="p" minWidth={140} textAlign="start">
          {loading ? <Skeleton /> : entity.name}
        </Typography>
        <Typography variant="subtitle1" minWidth={100} textAlign="start">
          {loading ? (
            <Skeleton />
          ) : (
            `${entity?.quantity} ${entity.price_unit} for $${convert(entity.price)} per ${entity.period}`
          )}
        </Typography>
      </Stack>
      <Stack justifyContent="space-between" alignItems="end">
        <Typography
          variant="body2"
          minWidth={80}
          textAlign="end"
          py={0.75}
          color={trial ? grey[400] : 'default'}
          sx={{ textDecorationLine: 'line-through', textDecorationThickness: loading ? 0 : 2 }}
        >
          {loading ? <Skeleton /> : trial ? `$${convert(entity.price * entity.quantity)}` : ''}
        </Typography>

        <Typography variant="body1" minWidth={60} textAlign="end" py={0.25}>
          {loading ? <Skeleton /> : trial ? '= $0' : `= $${convert(entity.price * entity.quantity)}`}
        </Typography>
      </Stack>
    </Stack>
  );
};

export const BillingList = () => {
  const count = useStore($billingCount);
  const list = useStore($billingList);

  // eslint-disable-next-line
  console.log(list);
  return (
    <Stack spacing={1.5} divider={<Divider orientation="horizontal" />}>
      {count > 0 ? list.map((entity, index) => <BillingEntity key={index} {...entity} />) : <BillingBlank />}
    </Stack>
  );
};
