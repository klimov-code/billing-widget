import { Code } from '#types/common';
import { createStore } from 'effector';

export type Entity = Record<Code, number>;

export const $cost = createStore<Entity>({
  [Code.domain]: 2.3,
  [Code.server]: 1.1,
  [Code.forwarder]: 1.6,
});
