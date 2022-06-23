import { Button, Stack, Typography } from '@mui/material';
import { useStore } from 'effector-react';

import { $period, switchClicked } from './model';

export const PeriodSwitch = () => {
  const period = useStore($period);

  return (
    <Stack direction="row" spacing={0} alignItems="center">
      <Typography variant="body1">Cost per</Typography>
      <Button
        variant="text"
        color="primary"
        sx={{ textTransform: 'initial', fontSize: 16, textDecoration: 'underline' }}
        onClick={() => switchClicked()}
      >
        {period}
      </Button>
    </Stack>
  );
};
