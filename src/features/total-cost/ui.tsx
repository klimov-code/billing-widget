import { Skeleton, Typography } from '@mui/material';
import { useStore } from 'effector-react';

import { $loading, $totalCost } from './model';
import { viewerModel } from '@app/entities/viewer';
import { convertToString } from '@app/shared/lib/convertToString';

export const TotalCost = () => {
  const trial = useStore(viewerModel.$isTrial);
  const loading = useStore($loading);
  const totalCost = useStore($totalCost);

  return (
    <Typography component="p" minWidth={140} textAlign="start" variant="h4">
      {loading ? <Skeleton /> : trial ? '$0' : `$${convertToString(totalCost)}`}
    </Typography>
  );
};
