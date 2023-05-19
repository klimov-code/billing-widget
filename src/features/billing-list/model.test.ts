import { allSettled, fork } from 'effector';
import { describe, it } from 'vitest';

import { timeFactor } from '@app/shared/lib/timeFactor';
import { Code } from '#types/common';

import { $billingCount, $billingList, BillingInfo, billingListUpdated, Entity } from './model';

describe('billing-list model', () => {
  it('updates billing list', async () => {
    const info: BillingInfo = [
      {
        'product.domain': 1,
        'product.server': 2,
        'product.forwarder': 3,
      },
      {
        'product.domain': 1,
        'product.server': 2,
        'product.forwarder': 3,
      },
      'month',
    ];

    const resource = info[0];
    const cost = info[1];
    const period = info[2];
    const products = ['product.domain', 'product.server', 'product.forwarder'] as Code[];
    const result = Array.from<Code, Entity>(products, (code) => ({
      code,
      name: 'Domains',
      quantity: resource[code],
      price: cost[code] * timeFactor[period],
      price_unit: 'pcs',
      period,
      total: cost[code] * resource[code] * timeFactor[period],
    }));

    const scope = fork();

    await allSettled(billingListUpdated, { scope, params: info });
    expect(scope.getState($billingCount)).toBe(3);
    expect(scope.getState($billingList)).toStrictEqual(result);
  });
});
