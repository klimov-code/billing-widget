import { Money32 } from '@carbon/icons-react';
import clsx from 'clsx';
import { useStore } from 'effector-react';

import { Checkbox } from '@app/shared/ui';

import { $trial, trialUpdated } from '../model';

import styles from './trial-banner.module.css';

export const TrialBanner = () => {
  const trial = useStore($trial);

  return (
    <div className={clsx(styles.banner)}>
      <Money32 />
      <Checkbox checked={trial} label="trial" checkSize="l" onChange={(event) => trialUpdated(event.target.checked)} />
      <span>Протестировать 1 день</span>
      <span>Бесплатно</span>
    </div>
  );
};
