import { createEvent, createStore } from 'effector';

enum Code {
  domain = 'product.domain',
  server = 'product.server',
  forwarder = 'product.forwarder',
}

type ResourceEntity = Record<Code, number>;

export const domainChanged = createEvent<number>();
export const serverChanged = createEvent<number>();
export const forwarderChanged = createEvent<number>();

export const $domain = createStore(5).on(domainChanged, (_, domain) => domain);
export const $server = createStore(2).on(serverChanged, (_, server) => server);
export const $forwarder = createStore(4).on(forwarderChanged, (_, forwarder) => forwarder);

export const $resource = createStore<ResourceEntity>({
  'product.domain': 5,
  'product.server': 2,
  'product.forwarder': 4,
})
  .on(domainChanged, (resource, domain) => ({ ...resource, [Code.domain]: domain }))
  .on(serverChanged, (resource, server) => ({ ...resource, [Code.server]: server }))
  .on(forwarderChanged, (resource, forwarder) => ({ ...resource, [Code.forwarder]: forwarder }));
