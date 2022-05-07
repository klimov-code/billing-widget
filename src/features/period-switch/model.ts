import { createEvent, restore } from 'effector';

type Period = 'month' | 'day' | 'hour';

export const periodSwitched = createEvent<Period>();

export const $period = restore<Period>(periodSwitched, 'month');
