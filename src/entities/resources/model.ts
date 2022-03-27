import { createEvent, createStore, sample } from 'effector';
import { debounce } from 'patronum';

interface Resource {
  code: string;
  quantity: number;
  unit?: string;
}

export const resourceChanged = createEvent<Resource>();

const $domains = createStore(5);
const $servers = createStore(6);
export const $resources = createStore<Resource[]>([]);
export const $resourcesMeta = createStore(new Map<string, Resource>());

$resourcesMeta.on(resourceChanged, (resources, { code, quantity, unit }) => {
  resources.set(code, { code, quantity, unit });

  return new Map(resources);
});
$resources.on($resourcesMeta, (_, meta) => [...meta.values()]);

sample({
  source: debounce({
    source: $domains,
    timeout: 200,
  }),
  fn: (domains) => {
    return { code: 'domain', quantity: domains };
  },
  target: resourceChanged,
});

sample({
  source: debounce({
    source: $servers,
    timeout: 200,
  }),
  fn: (servers) => {
    return { code: 'server', quantity: servers };
  },
  target: resourceChanged,
});
