import { createStore } from 'effector';

import { Code } from '@app/shared/types/common';

export type Entity = Record<Code, number>;

export const $cost = createStore<Entity>({
  'product.domain': 2.3,
  'product.server': 1.1,
  'product.forwarder': 1.6,
});
