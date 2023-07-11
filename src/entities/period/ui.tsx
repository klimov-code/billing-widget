import { Button, Stack, Typography } from '@mui/material';
import { useStore } from 'effector-react';

import { $period, switchClicked } from './model';

export const PeriodSwitch = () => {
  const period = useStore($period);

  return (
    <Stack alignItems="center" direction="row" spacing={0}>
      <Typography variant="body1">Cost per</Typography>
      <Button
        color="primary"
        onClick={() => switchClicked()}
        sx={{ textTransform: 'initial', fontSize: 16, textDecoration: 'underline' }}
        variant="text"
      >
        {period}
      </Button>
    </Stack>
  );
};
