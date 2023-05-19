import { allSettled, fork } from 'effector';
import { describe, it } from 'vitest';

import { timeFactor } from '@app/shared/lib/timeFactor';
import { Code } from '#types/common';

import { $totalCost, totalCostUpdated } from './model';

describe('total-cost model', () => {
  it('updates total cost', async () => {
    const resource = {
      [Code.domain]: 1,
      [Code.server]: 2,
      [Code.forwarder]: 3,
    };
    const cost = {
      [Code.domain]: 2,
      [Code.server]: 1,
      [Code.forwarder]: 3,
    };
    const period = 'month';

    const total =
      resource[Code.domain] * cost[Code.domain] * timeFactor[period] +
      resource[Code.server] * cost[Code.server] * timeFactor[period] +
      resource[Code.forwarder] * cost[Code.forwarder] * timeFactor[period];

    const scope = fork();

    await allSettled(totalCostUpdated, { scope, params: [resource, cost, period] });
    expect(scope.getState($totalCost)).toBe(total);
  });
});
