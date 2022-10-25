import { allSettled, fork } from 'effector';
import { describe, it } from 'vitest';

import { $billingList, billingListUpdated, getBillingListFx } from './model';

describe('billing-list model', () => {
  it('updates billing list', async () => {
    const scope = fork({
      handlers: new Map([[getBillingListFx, () => Array.from({ length: 3 }, (_, i) => i + 1)]]),
    });

    await allSettled(billingListUpdated, { scope });
    expect(scope.getState($billingList)).toHaveLength(3);
  });
});
