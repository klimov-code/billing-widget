import { createEffect, createEvent, createStore, sample } from 'effector';

export const trialUpdated = createEvent<boolean>();

export const $trial = createStore(false);

const trialFx = createEffect(
  () =>
    new Promise<boolean>((resolve) => {
      setTimeout(() => resolve(true), 1500);
    }),
);

$trial.on(trialUpdated, (_, trial) => trial);

sample({
  source: trialFx.doneData,
  target: $trial,
});

trialFx();
