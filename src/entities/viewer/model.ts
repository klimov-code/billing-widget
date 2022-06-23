import { createEvent, restore } from 'effector';

export type Trial = boolean;

export const trialUpdated = createEvent<Trial>();

export const $isTrial = restore(trialUpdated, false);
