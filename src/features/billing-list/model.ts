import { createEffect, createEvent, createStore, sample } from 'effector';

import { costModel } from '@app/entities/cost';
import { periodModel } from '@app/entities/period';
import { resourceModel } from '@app/entities/resource';
import { randomTimeout } from '@app/shared/lib/randomTimeout';
import { Code, TimeFactor } from '@app/shared/types/common';

export type Entity = {
  code: Code;
  name: string;
  quantity: number;
  price: number;
  price_unit: string;
  period: periodModel.Entity;
  total: number;
};

export const billingListUpdated = createEvent<[resourceModel.Entity, costModel.Entity, periodModel.Entity]>();

const getBillingListFx = createEffect<[resourceModel.Entity, costModel.Entity, periodModel.Entity], Entity[]>(
  ([resource, cost, period]) =>
    new Promise<Entity[]>((resolve) => {
      const list = [
        {
          code: Code.domain,
          name: 'Domains',
          quantity: resource[Code.domain],
          price: cost[Code.domain],
          price_unit: 'pcs',
          period: period,
          total: cost[Code.domain] * resource[Code.domain] * TimeFactor[period],
        },
        {
          code: Code.server,
          name: 'Servers',
          quantity: resource[Code.server],
          price: cost[Code.server],
          price_unit: 'pcs',
          period: period,
          total: cost[Code.server] * resource[Code.server] * TimeFactor[period],
        },
        {
          code: Code.forwarder,
          name: 'Forwarders',
          quantity: resource[Code.forwarder],
          price: cost[Code.forwarder],
          price_unit: 'pcs',
          period: period,
          total: cost[Code.forwarder] * resource[Code.forwarder] * TimeFactor[period],
        },
      ];

      return setTimeout(() => resolve(list), randomTimeout(100, 200));
    }),
);

export const $billingList = createStore<Entity[]>([]);
export const $billingCount = $billingList.map((list) => list.length);
export const $loading = getBillingListFx.pending;

sample({
  // @ts-ignore
  clock: resourceModel.$resource,
  source: [costModel.$cost, periodModel.$period],
  fn: ([cost, period], resource) => [resource, cost, period],
  target: billingListUpdated,
});

sample({
  // @ts-ignore
  clock: periodModel.$period,
  source: [costModel.$cost, resourceModel.$resource],
  fn: ([cost, resource], period) => [resource, cost, period],
  target: billingListUpdated,
});

sample({
  clock: billingListUpdated,
  target: getBillingListFx,
});

sample({
  clock: getBillingListFx.doneData,
  target: $billingList,
});
