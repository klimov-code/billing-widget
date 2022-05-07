import { Button, Stack, Typography } from '@mui/material';

export { periodSwitched } from './model';

export const PeriodSwitch = () => {
  return (
    <Stack direction="row" spacing={0} alignItems="center">
      <Typography variant="body1">Cost per</Typography>
      <Button
        variant="text"
        color="primary"
        sx={{ textTransform: 'initial', fontSize: 16, textDecoration: 'underline' }}
      >
        month
      </Button>
    </Stack>
  );
};
