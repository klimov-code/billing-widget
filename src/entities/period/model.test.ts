import { allSettled, fork } from 'effector';
import { describe, expect, it } from 'vitest';

import { $period, switchClicked } from './model';

describe('period model', () => {
  it('switches the period', async () => {
    const scope = fork({
      values: new Map([[$period, 'month']]),
    });

    await allSettled(switchClicked, { scope });
    expect(scope.getState($period)).toBe('day');

    await allSettled(switchClicked, { scope });
    expect(scope.getState($period)).toBe('hour');

    await allSettled(switchClicked, { scope });
    expect(scope.getState($period)).toBe('month');
  });
});
