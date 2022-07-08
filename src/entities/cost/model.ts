import { createStore } from 'effector';

import { Code } from '@app/shared/types/common';

export type Entity = Record<Code, number>;

export const $cost = createStore<Entity>({
  'product.domain': 23,
  'product.server': 11,
  'product.forwarder': 16,
});
