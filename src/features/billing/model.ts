import { createEvent, createStore } from 'effector';

export const billingListUpdated = createEvent();

export const $billingList = createStore([]);
