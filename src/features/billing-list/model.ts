import { Code } from '#types/common';
import { createEffect, createEvent, createStore, sample } from 'effector';

import { costModel } from '@app/entities/cost';
import { periodModel } from '@app/entities/period';
import { resourceModel } from '@app/entities/resource';
import { randomTimeout } from '@app/shared/lib/randomTimeout';
import { timeFactor } from '@app/shared/lib/timeFactor';

export type Entity = {
  code: Code;
  name: string;
  period: periodModel.Entity;
  price: number;
  price_unit: string;
  quantity: number;
  total: number;
};

export type BillingInfo = [resourceModel.Entity, costModel.Entity, periodModel.Entity];

export const billingListUpdated = createEvent<BillingInfo>();

export const getBillingListFx = createEffect<BillingInfo, Entity[]>(
  ([resource, cost, period]) =>
    new Promise<Entity[]>((resolve) => {
      const list = [
        {
          code: Code.domain,
          name: 'Domains',
          period: period,
          price: cost[Code.domain] * timeFactor[period],
          price_unit: 'pcs',
          quantity: resource[Code.domain],
          total: cost[Code.domain] * resource[Code.domain] * timeFactor[period],
        },
        {
          code: Code.server,
          name: 'Servers',
          period: period,
          price: cost[Code.server] * timeFactor[period],
          price_unit: 'pcs',
          quantity: resource[Code.server],
          total: cost[Code.server] * resource[Code.server] * timeFactor[period],
        },
        {
          code: Code.forwarder,
          name: 'Forwarders',
          period: period,
          price: cost[Code.forwarder] * timeFactor[period],
          price_unit: 'pcs',
          quantity: resource[Code.forwarder],
          total: cost[Code.forwarder] * resource[Code.forwarder] * timeFactor[period],
        },
      ];

      return setTimeout(() => resolve(list), randomTimeout(300, 600));
    }),
);

export const $billingList = createStore<Entity[]>([]);
export const $billingCount = $billingList.map((list) => list.length);
export const $loading = getBillingListFx.pending;

sample({
  clock: resourceModel.$resource,
  source: [costModel.$cost, periodModel.$period],
  fn: ([cost, period], resource) => [resource, cost, period] as BillingInfo,
  target: billingListUpdated,
});

sample({
  clock: periodModel.$period,
  source: [costModel.$cost, resourceModel.$resource],
  fn: ([cost, resource], period) => [resource, cost, period] as BillingInfo,
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
