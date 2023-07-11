import { Divider, Skeleton, Stack, Typography } from '@mui/material';
import { grey } from '@mui/material/colors';
import { useList, useStore } from 'effector-react';

import { $billingList, $loading, Entity } from './model';
import { viewerModel } from '@app/entities/viewer';
import { convertToString } from '@app/shared/lib/convertToString';

export const BillingBlank = () => {
  return (
    <Stack component="article" direction="row" justifyContent="space-between">
      <Stack justifyContent="space-between">
        <Typography component="p" textAlign="start" variant="h6" width={100}>
          <Skeleton />
        </Typography>
        <Typography textAlign="start" variant="subtitle1" width={140}>
          <Skeleton />
        </Typography>
      </Stack>
      <Stack justifyContent="space-between">
        <Typography py={0.75} textAlign="end" variant="body2" width={60}>
          <Skeleton />
        </Typography>
        <Typography py={0.25} textAlign="end" variant="body1" width={60}>
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
      <Stack alignItems="start" justifyContent="space-between">
        <Typography component="p" minWidth={140} textAlign="start" variant="h6">
          {loading ? <Skeleton /> : entity.name}
        </Typography>
        <Typography minWidth={100} textAlign="start" variant="subtitle1">
          {loading ? (
            <Skeleton />
          ) : (
            `${entity?.quantity} ${entity.price_unit} for $${convertToString(entity.price)} per ${entity.period}`
          )}
        </Typography>
      </Stack>
      <Stack alignItems="end" justifyContent="space-between">
        <Typography
          color={trial ? grey[400] : 'default'}
          minWidth={80}
          py={0.75}
          sx={{ textDecorationLine: 'line-through', textDecorationThickness: loading ? 0 : 2 }}
          textAlign="end"
          variant="body2"
        >
          {loading ? <Skeleton /> : trial ? `$${convertToString(entity.total)}` : ''}
        </Typography>

        <Typography minWidth={60} py={0.25} textAlign="end" variant="body1">
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
    <Stack divider={<Divider orientation="horizontal" />} spacing={1.5}>
      {list}
    </Stack>
  );
};
