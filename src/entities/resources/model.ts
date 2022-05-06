import { createEvent, createStore, sample } from 'effector';

interface Resource {
  code: string;
  quantity: number;
  unit?: string;
}

export const resourceChanged = createEvent<Resource>();

const $domainCount = createStore(5);
const $serverCount = createStore(6);
export const $resources = createStore<Resource[]>([]);
export const $resourcesMeta = createStore(
  new Map<string, Resource>([
    ['domain', { code: 'domain', quantity: 3, unit: 'шт.' }],
    ['server', { code: 'domain', quantity: 2, unit: 'шт.' }],
  ]),
);

$resourcesMeta.on(resourceChanged, (resources, { code, quantity, unit }) => {
  resources.set(code, { code, quantity, unit });

  return new Map(resources);
});
$resources.on($resourcesMeta, (_, meta) => [...meta.values()]);

sample({
  source: $domainCount,
  fn: (count) => {
    return { code: 'domain', quantity: count };
  },
  target: resourceChanged,
});

sample({
  source: $serverCount,
  fn: (count) => {
    return { code: 'server', quantity: count };
  },
  target: resourceChanged,
});
