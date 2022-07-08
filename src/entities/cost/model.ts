import { createStore } from 'effector';

import { Code } from '@app/shared/types/common';

export type Entity = Record<Code, number>;

export const $cost = createStore<Entity>({
  [Code.domain]: 2.3,
  [Code.server]: 1.1,
  [Code.forwarder]: 1.6,
});
