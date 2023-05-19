import { createEffect, createEvent, createStore, sample } from 'effector';

import { costModel } from '@app/entities/cost';
import { periodModel } from '@app/entities/period';
import { resourceModel } from '@app/entities/resource';
import { randomTimeout } from '@app/shared/lib/randomTimeout';
import { timeFactor } from '@app/shared/lib/timeFactor';
import { Code } from '#types/common';

export type Entity = number;
export type TotalCostInfo = [resourceModel.Entity, costModel.Entity, periodModel.Entity];

export const totalCostUpdated = createEvent<TotalCostInfo>();

const getTotalCostFx = createEffect<TotalCostInfo, Entity>(
  ([resource, cost, period]) =>
    new Promise<Entity>((resolve) => {
      const total =
        resource[Code.domain] * cost[Code.domain] * timeFactor[period] +
        resource[Code.server] * cost[Code.server] * timeFactor[period] +
        resource[Code.forwarder] * cost[Code.forwarder] * timeFactor[period];

      return setTimeout(() => resolve(total), randomTimeout(300, 600));
    }),
);

export const $totalCost = createStore(0);
export const $loading = getTotalCostFx.pending;

sample({
  clock: resourceModel.$resource,
  source: [costModel.$cost, periodModel.$period],
  fn: ([cost, period], resource) => [resource, cost, period] as TotalCostInfo,
  target: totalCostUpdated,
});

sample({
  clock: periodModel.$period,
  source: [costModel.$cost, resourceModel.$resource],
  fn: ([cost, resource], period) => [resource, cost, period] as TotalCostInfo,
  target: totalCostUpdated,
});

sample({
  clock: totalCostUpdated,
  target: getTotalCostFx,
});

sample({
  clock: getTotalCostFx.doneData,
  target: $totalCost,
});
