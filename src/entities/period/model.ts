import { createEvent, createStore } from 'effector';

import { LinkedList } from './lib';

type Period = 'month' | 'day' | 'hour';

const node = new LinkedList<Period>(['month', 'day', 'hour']).get(0);

export const switchClicked = createEvent();

export const $node = createStore(node).on(switchClicked, (node) => node?.next);
export const $period = createStore<Period>('month').on($node, (_, period) => period?.data);
