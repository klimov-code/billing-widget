import { createEvent, createStore } from 'effector';

import { LinkedList } from './lib';

export type Entity = 'day' | /* 'week' | */ 'hour' | 'month';

const periods: Array<Entity> = ['month', /* 'week', */ 'day', 'hour'];
const node = new LinkedList<Entity>(periods).get(0);

export const switchClicked = createEvent();

const $node = createStore(node).on(switchClicked, (node) => node?.next);
export const $period = createStore<Entity>(periods[0]).on($node, (_, period) => period?.data);
