import { createEvent, createStore } from 'effector';

export type TBillingEntity = {
  code: string;
  name: string;
  quantity: number;
  price: number;
  price_unit: string;
  period: string;
};

export const billingListUpdated = createEvent();

export const $billingList = createStore<TBillingEntity[]>([
  {
    code: 'gslb.domain',
    name: 'Domains',
    quantity: 2,
    price: 1233,
    price_unit: 'pcs',
    period: 'hour',
  },
  {
    code: 'gslb.host',
    name: 'Servers',
    quantity: 3,
    price: 1111,
    price_unit: 'pcs',
    period: 'hour',
  },
  {
    code: 'gslb.forwarder',
    name: 'Forwarders',
    quantity: 8,
    price: 1565,
    price_unit: 'pcs',
    period: 'hour',
  },
]);
