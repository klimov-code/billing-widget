import { createEvent, createStore } from 'effector';

import { LinkedList } from './lib';

export type Entity = 'month' | 'day' | 'hour';

const node = new LinkedList<Entity>(['month', 'day', 'hour']).get(0);

export const switchClicked = createEvent();

export const $node = createStore(node).on(switchClicked, (node) => node?.next);
export const $period = createStore<Entity>('month').on($node, (_, period) => period?.data);
