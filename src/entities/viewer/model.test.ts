import { allSettled, fork } from 'effector';
import { describe, expect, it } from 'vitest';

import { $isTrial, trialUpdated } from './model';

describe('viewer model', () => {
  it('changes trial state', async () => {
    const scope = fork({ values: new Map([[$isTrial, false]]) });

    allSettled(trialUpdated, { scope, params: true });
    expect(scope.getState($isTrial)).toBe(true);

    await allSettled(trialUpdated, { scope, params: false });
    expect(scope.getState($isTrial)).toBe(false);
  });
});
