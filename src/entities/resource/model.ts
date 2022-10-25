import { createEvent, createStore } from 'effector';

import { Code } from '#types/common';

export type Entity = Record<Code, number>;

export const domainChanged = createEvent<number>();
export const serverChanged = createEvent<number>();
export const forwarderChanged = createEvent<number>();

export const $domain = createStore(5).on(domainChanged, (_, domain) => domain);
export const $server = createStore(2).on(serverChanged, (_, server) => server);
export const $forwarder = createStore(4).on(forwarderChanged, (_, forwarder) => forwarder);

export const $resource = createStore<Entity>({
  [Code.domain]: 5,
  [Code.server]: 2,
  [Code.forwarder]: 4,
})
  .on($domain, (resource, domain) => ({ ...resource, [Code.domain]: domain }))
  .on($server, (resource, server) => ({ ...resource, [Code.server]: server }))
  .on($forwarder, (resource, forwarder) => ({ ...resource, [Code.forwarder]: forwarder }));
