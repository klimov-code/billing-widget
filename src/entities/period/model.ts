import { createEvent, createStore } from 'effector';

import { LinkedList } from './lib';

export type Entity = 'month' | /* 'week' | */ 'day' | 'hour';

const PERIODS: Array<Entity> = ['month', /* 'week', */ 'day', 'hour'];
const node = new LinkedList<Entity>(PERIODS).get(0);

export const switchClicked = createEvent();

export const $node = createStore(node).on(switchClicked, (node) => node?.next);
export const $period = createStore<Entity>(PERIODS[0]).on($node, (_, period) => period?.data);
