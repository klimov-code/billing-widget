import { createEvent, sample } from 'effector';

import { costModel } from '@app/entities/cost';
import { periodModel } from '@app/entities/period';
import { resourceModel } from '@app/entities/resource';
import { billingModel } from '@app/features/billing-list';

export const appMounted = createEvent();

sample({
  // @ts-ignore
  clock: appMounted,
  source: [resourceModel.$resource, costModel.$cost, periodModel.$period],
  target: billingModel.billingListUpdated,
});
