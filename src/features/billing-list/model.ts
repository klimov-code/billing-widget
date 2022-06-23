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
    code: 'product.domain',
    name: 'Domains',
    quantity: 2,
    price: 1233,
    price_unit: 'pcs',
    period: 'hour',
  },
  {
    code: 'product.host',
    name: 'Servers',
    quantity: 3,
    price: 1111,
    price_unit: 'pcs',
    period: 'hour',
  },
  {
    code: 'product.forwarder',
    name: 'Forwarders',
    quantity: 8,
    price: 65,
    price_unit: 'pcs',
    period: 'hour',
  },
]);
export const $billingCount = $billingList.map((list) => list.length);
