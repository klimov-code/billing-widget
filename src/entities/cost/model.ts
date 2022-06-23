import { createStore } from 'effector';

export const $cost = createStore({
  'product.domain': {
    price: 233,
    period: 'hour',
  },
  'product.server': {
    price: 111,
    period: 'hour',
  },
  'product.forwarder': {
    price: 65,
    period: 'hour',
  },
});
