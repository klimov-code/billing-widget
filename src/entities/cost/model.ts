import { createStore } from 'effector';

import { Code } from '@app/shared/types/common';

export type Entity = Record<Code, number>;

export const $cost = createStore<Entity>({
  'product.domain': 233,
  'product.server': 111,
  'product.forwarder': 65,
});
