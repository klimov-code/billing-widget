import { Divider, Skeleton, Stack, Typography } from '@mui/material';
import { grey } from '@mui/material/colors';
import { useList, useStore } from 'effector-react';

import { viewerModel } from '@app/entities/viewer';
import { convertToString } from '@app/shared/lib/convertToString';

import { $billingList, $loading, Entity } from './model';

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

export const BillingEntity = (entity: Entity) => {
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
            `${entity?.quantity} ${entity.price_unit} for $${convertToString(entity.price)} per ${entity.period}`
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
          {loading ? <Skeleton /> : trial ? `$${convertToString(entity.total)}` : ''}
        </Typography>

        <Typography variant="body1" minWidth={60} textAlign="end" py={0.25}>
          {loading ? <Skeleton /> : trial ? '= $0' : `= $${convertToString(entity.total)}`}
        </Typography>
      </Stack>
    </Stack>
  );
};

export const BillingList = () => {
  const list = useList($billingList, {
    fn: (entity, index) => <BillingEntity key={index} {...entity} />,
    getKey: (entity) => entity.code,
    placeholder: <BillingBlank />,
  });

  return (
    <Stack spacing={1.5} divider={<Divider orientation="horizontal" />}>
      {list}
    </Stack>
  );
};
