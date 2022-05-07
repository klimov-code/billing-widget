import { Box, Checkbox, FormControlLabel, Typography } from '@mui/material';
import { useStore } from 'effector-react';

import { $isTrial, trialUpdated } from './model';

export const TrialBanner = () => {
  const isTrial = useStore($isTrial);

  return (
    <Box sx={{ py: 2 }}>
      <FormControlLabel
        sx={{ marginLeft: 0, display: 'flex', justifyContent: 'space-between' }}
        control={
          <Checkbox
            sx={{ '& .MuiSvgIcon-root': { fontSize: 32 } }}
            color="success"
            checked={isTrial}
            onChange={(event) => trialUpdated(event.target.checked)}
          />
        }
        label={
          <Box sx={{ display: 'flex', flexDirection: 'column', userSelect: 'none' }}>
            <Typography variant="h6" component="p">
              7 days trial
            </Typography>
            <Typography variant="subtitle1">Free</Typography>
          </Box>
        }
        labelPlacement="start"
      />
    </Box>
  );
};
