import { createEvent, restore } from 'effector';

export const trialUpdated = createEvent<boolean>();

export const $trial = restore(trialUpdated, false);
