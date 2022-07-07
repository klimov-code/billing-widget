import { createEffect, createEvent, createStore, sample } from 'effector';

import { costModel } from '@app/entities/cost';
import { periodModel } from '@app/entities/period';
import { resourceModel } from '@app/entities/resource';
import { Code } from '@app/shared/types/common';

import { random } from './lib';

export type TBillingEntity = {
  code: Code;
  name: string;
  quantity: number;
  price: number;
  price_unit: string;
  period: periodModel.Entity;
};

export const billingListUpdated = createEvent<[resourceModel.Entity, costModel.Entity, periodModel.Entity]>();

const getBillingListFx = createEffect<[resourceModel.Entity, costModel.Entity, periodModel.Entity], TBillingEntity[]>(
  ([resource, cost, period]) => {
    return new Promise<TBillingEntity[]>((resolve) => {
      const list = [
        {
          code: Code.domain,
          name: 'Domains',
          quantity: resource[Code.domain],
          price: cost[Code.domain],
          price_unit: 'pcs',
          period: period,
        },
        {
          code: Code.server,
          name: 'Servers',
          quantity: resource[Code.server],
          price: cost[Code.server],
          price_unit: 'pcs',
          period: period,
        },
        {
          code: Code.forwarder,
          name: 'Forwarders',
          quantity: resource[Code.forwarder],
          price: cost[Code.forwarder],
          price_unit: 'pcs',
          period: period,
        },
      ];

      return setTimeout(() => resolve(list), random(100, 200));
    });
  },
);

export const $billingList = createStore<TBillingEntity[]>([]);
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
