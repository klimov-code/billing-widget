import { allSettled, fork } from 'effector';
import { describe, it } from 'vitest';

import { $billingCount, BillingInfo, billingListUpdated, getBillingListFx } from './model';

describe('billing-list model', () => {
  it('updates billing list', async () => {
    const info: BillingInfo = [
      {
        'product.domain': 1,
        'product.server': 2,
        'product.forwarder': 3,
      },
      {
        'product.domain': 2.3,
        'product.server': 1.1,
        'product.forwarder': 1.6,
      },
      'month',
    ];

    const scope = fork({
      handlers: new Map([[getBillingListFx, () => Array.from({ length: 3 }, (_, i) => i + 1)]]),
    });

    await allSettled(billingListUpdated, { scope, params: info });
    expect(scope.getState($billingCount)).toBe(3);
  });
});
