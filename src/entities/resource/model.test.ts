import { allSettled, fork } from 'effector';
import { describe, expect, it } from 'vitest';

import { $resource, domainChanged, forwarderChanged, serverChanged } from './model';

describe('resource model', () => {
  it('updates domains count', async () => {
    const scope = fork({
      values: new Map([[$resource, { 'product.domain': 5, 'product.server': 2, 'product.forwarder': 4 }]]),
    });

    await allSettled(domainChanged, { scope, params: 6 });
    expect(scope.getState($resource)['product.domain']).toBe(6);

    await allSettled(domainChanged, { scope, params: 2 });
    expect(scope.getState($resource)['product.domain']).toBe(2);
  });

  it('updates servers count', async () => {
    const scope = fork({
      values: new Map([[$resource, { 'product.domain': 5, 'product.server': 2, 'product.forwarder': 4 }]]),
    });

    await allSettled(serverChanged, { scope, params: 5 });
    expect(scope.getState($resource)['product.server']).toBe(5);

    await allSettled(serverChanged, { scope, params: 11 });
    expect(scope.getState($resource)['product.server']).toBe(11);
  });

  it('updates forwarders count', async () => {
    const scope = fork({
      values: new Map([[$resource, { 'product.domain': 5, 'product.server': 2, 'product.forwarder': 4 }]]),
    });

    await allSettled(forwarderChanged, { scope, params: 1 });
    expect(scope.getState($resource)['product.forwarder']).toBe(1);

    await allSettled(forwarderChanged, { scope, params: 3 });
    expect(scope.getState($resource)['product.forwarder']).toBe(3);
  });
});
