import { Box, FormControlLabel, Switch, SwitchProps, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useStore } from 'effector-react';

import { $isTrial, trialUpdated } from './model';

const CustomSwitch = styled((props: SwitchProps) => <Switch disableRipple {...props} />)(({ theme }) => ({
  width: 52,
  height: 34,
  padding: 0,
  '& .MuiSwitch-switchBase': {
    padding: 0,
    margin: 2.5,
    transitionDuration: '300ms',
    '&.Mui-checked': {
      transform: 'translateX(18px)',
      color: '#fff',
      '& + .MuiSwitch-track': {
        backgroundColor: theme.palette.mode === 'dark' ? theme.palette.primary.dark : theme.palette.primary.light,
        opacity: 1,
        border: 0,
      },
      '&.Mui-disabled + .MuiSwitch-track': {
        opacity: 0.5,
      },
    },
    '&.Mui-focusVisible .MuiSwitch-thumb': {
      color: theme.palette.mode === 'dark' ? theme.palette.primary.dark : theme.palette.primary.light,
      border: '6px solid #fff',
    },
    '&.Mui-disabled .MuiSwitch-thumb': {
      color: theme.palette.mode === 'light' ? theme.palette.grey[100] : theme.palette.grey[600],
    },
    '&.Mui-disabled + .MuiSwitch-track': {
      opacity: theme.palette.mode === 'light' ? 0.7 : 0.3,
    },
  },
  '& .MuiSwitch-thumb': {
    boxSizing: 'border-box',
    width: 29,
    height: 29,
  },
  '& .MuiSwitch-track': {
    borderRadius: 34 / 2,
    backgroundColor: theme.palette.mode === 'light' ? '#E9E9EA' : '#39393D',
    opacity: 1,
    transition: theme.transitions.create(['background-color'], {
      duration: 500,
    }),
  },
}));

export const TrialSwitch = () => {
  const isTrial = useStore($isTrial);

  return (
    <Box sx={{ py: 2 }}>
      <FormControlLabel
        control={
          <CustomSwitch
            checked={isTrial}
            color="primary"
            onChange={(event) => trialUpdated(event.target.checked)}
            sx={{ '& .MuiSvgIcon-root': { fontSize: 36 } }}
          />
        }
        label={
          <Box sx={{ display: 'flex', flexDirection: 'column', userSelect: 'none' }}>
            <Typography component="p" variant="h6">
              7 days trial
            </Typography>
            <Typography variant="subtitle1">Free</Typography>
          </Box>
        }
        labelPlacement="start"
        sx={{ mx: 0, display: 'flex', justifyContent: 'space-between' }}
      />
    </Box>
  );
};
