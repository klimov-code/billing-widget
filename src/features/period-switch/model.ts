import { createEvent, createStore } from 'effector';

import { LinkedList } from './lib';

type Period = 'month' | 'day' | 'hour';

const periodNode = new LinkedList<Period>(['month', 'day', 'hour']).get(0);

export const switchClicked = createEvent();

export const $periodNode = createStore(periodNode).on(switchClicked, (node) => node?.next);
export const $period = createStore<Period>('month').on($periodNode, (_, period) => period?.data);
