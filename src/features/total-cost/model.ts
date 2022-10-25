import { createEffect, createEvent, createStore, sample } from 'effector';

import { costModel } from '@app/entities/cost';
import { periodModel } from '@app/entities/period';
import { resourceModel } from '@app/entities/resource';
import { randomTimeout } from '@app/shared/lib/randomTimeout';
import { Code, TimeFactor } from '#types/common';

export type Entity = number;

export const totalCostUpdated = createEvent<[resourceModel.Entity, costModel.Entity, periodModel.Entity]>();

const getTotalCostFx = createEffect<[resourceModel.Entity, costModel.Entity, periodModel.Entity], Entity>(
  ([resource, cost, period]) =>
    new Promise<Entity>((resolve) => {
      const total =
        resource[Code.domain] * cost[Code.domain] * TimeFactor[period] +
        resource[Code.server] * cost[Code.server] * TimeFactor[period] +
        resource[Code.forwarder] * cost[Code.forwarder] * TimeFactor[period];

      return setTimeout(() => resolve(total), randomTimeout(300, 600));
    }),
);

export const $totalCost = createStore(0);
export const $loading = getTotalCostFx.pending;

sample({
  clock: resourceModel.$resource,
  source: [costModel.$cost, periodModel.$period],
  fn: ([cost, period], resource) =>
    [resource, cost, period] as [resourceModel.Entity, costModel.Entity, periodModel.Entity],
  target: totalCostUpdated,
});

sample({
  clock: periodModel.$period,
  source: [costModel.$cost, resourceModel.$resource],
  fn: ([cost, resource], period) =>
    [resource, cost, period] as [resourceModel.Entity, costModel.Entity, periodModel.Entity],
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
