import { forwardRef } from 'react';
import clsx from 'clsx';

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
      </div>
      <div className={clsx(styles.body)}>{children}</div>
    </div>
  );
});

export default Card;
