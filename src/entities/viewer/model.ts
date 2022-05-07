import { createEvent, restore } from 'effector';

export const trialUpdated = createEvent<boolean>();

export const $isTrial = restore(trialUpdated, false);
