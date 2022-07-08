import { Skeleton, Typography } from '@mui/material';
import { useStore } from 'effector-react';

import { convertToString } from '@app/shared/lib/convertToString';

import { $loading, $totalCost } from './model';

export const TotalCost = () => {
  const loading = useStore($loading);
  const totalCost = useStore($totalCost);

  return (
    <Typography variant="h4" component="p" minWidth={140} textAlign="start">
      {loading ? <Skeleton /> : `$${convertToString(totalCost)}`}
    </Typography>
  );
};
