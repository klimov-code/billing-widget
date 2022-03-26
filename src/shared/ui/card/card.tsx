import { forwardRef } from 'react';
import clsx from 'clsx';

import { Button, Divider } from '@app/shared/ui';

import styles from './card.module.css';

type Ref = HTMLDivElement;

interface Props {
  title: string;
}

const Card = forwardRef<Ref, React.HTMLAttributes<HTMLDivElement> & Props>(function Card({ title, children }, ref) {
  return (
    <div ref={ref} className={clsx(styles.card)}>
      <div className={clsx(styles.header)}>
        <h2 id={title} className={clsx(styles.title)}>
          {title}
        </h2>
        <Button variant="primary" size="xs">
          Закрыть
        </Button>
      </div>
      <Divider />
      <div className={clsx(styles.body)}>{children}</div>
    </div>
  );
});

export default Card;
