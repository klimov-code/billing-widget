import { Skeleton } from '@app/shared/ui';

export const BillingItem = () => {
  return (
    <div>
      <div>
        <Skeleton height={32}>
          <rect />
        </Skeleton>
        <div className="old-price"></div>
        <div>
          <div></div>
        </div>
      </div>
    </div>
  );
};

export const BillingList = () => {
  return <BillingItem />;
};
