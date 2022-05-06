import { useId } from 'react';
import { Box, Divider, Skeleton, Stack, Typography } from '@mui/material';

export const BillingEntity = ({ loading = false }) => {
  return (
    <Box component="article" sx={{ display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h6" component="p">
          {loading ? <Skeleton /> : 'title'}
        </Typography>
        <Typography variant="body1">{loading ? <Skeleton /> : 'old price'}</Typography>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="subtitle1">{loading ? <Skeleton /> : 'subtitle'}</Typography>
        <Typography variant="body2">{loading ? <Skeleton /> : 'new price'}</Typography>
      </Box>
    </Box>
  );
};

export const BillingList = () => {
  const list = Array.from({ length: 5 });

  return (
    <Stack spacing={1.5} divider={<Divider orientation="horizontal" />}>
      {list.map(() => (
        <BillingEntity key={useId()} />
      ))}
    </Stack>
  );
};
