import { allSettled, fork } from 'effector';
import { describe, it } from 'vitest';

import { $totalCost, TotalCostInfo, totalCostUpdated } from './model';

describe('billing-list model', () => {
  it('updates billing list', async () => {
    const info: TotalCostInfo = [
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

    const scope = fork();

    await allSettled(totalCostUpdated, { scope, params: info });
    expect(scope.getState($totalCost)).toBe(3);
  });
});
