import { WirelessCheckout20 } from '@carbon/icons-react';
import clsx from 'clsx';

import { TrialBanner } from '@app/entities/viewer';
import { BillingList } from '@app/features/billing';
import { Button, Card } from '@app/shared/ui';

import styles from './app.module.css';

export const App = () => {
  return (
    <main className={clsx(styles.app)}>
      <Card title="Billing Widget">
        <BillingList />
        <TrialBanner />

        <Button width="fluid" startIcon={<WirelessCheckout20 className="mr-2" />}>
          Checkout
        </Button>
      </Card>
    </main>
  );
};
