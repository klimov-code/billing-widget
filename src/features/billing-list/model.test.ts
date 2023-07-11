import { Code } from '#types/common';
import { allSettled, fork } from 'effector';
import { describe, it } from 'vitest';

import { $billingCount, $billingList, billingListUpdated, Entity } from './model';
import { timeFactor } from '@app/shared/lib/timeFactor';

describe('billing-list model', () => {
  it('updates billing list', async () => {
    const resource = {
      [Code.domain]: 1,
      [Code.server]: 2,
      [Code.forwarder]: 3,
    };
    const cost = {
      [Code.domain]: 1,
      [Code.server]: 2,
      [Code.forwarder]: 3,
    };
    const period = 'month';
    const products = Object.entries({
      [Code.domain]: 'Domains',
      [Code.server]: 'Servers',
      [Code.forwarder]: 'Forwarders',
    }) as [Code, string][];

    const result = Array.from<[Code, string], Entity>(products, ([code, name]) => ({
      code,
      name,
      quantity: resource[code],
      price: cost[code] * timeFactor[period],
      price_unit: 'pcs',
      period,
      total: cost[code] * resource[code] * timeFactor[period],
    }));

    const scope = fork();

    await allSettled(billingListUpdated, { scope, params: [resource, cost, period] });
    expect(scope.getState($billingCount)).toBe(3);
    expect(scope.getState($billingList)).toStrictEqual(result);
  });
});
