import clsx from 'clsx';

import { Button, Divider } from '@app/shared/ui';

import styles from './card.module.css';

interface Props {
  title: string;
}

const Card = ({ title, children }: React.HTMLAttributes<HTMLElement> & Props) => {
  return (
    <div className={clsx(styles.overlay)} aria-labelledby={title}>
      <div className={clsx(styles.modal)}>
        <div className={clsx(styles.header)}>
          <h2 id={title} className={clsx(styles.title)}>
            {title}
          </h2>
          <Button variant="primary" size="xs" className="py-0 px-0 text-24">
            Получить
          </Button>
        </div>
        <Divider />
        <div className={clsx(styles.body)}>{children}</div>
      </div>
    </div>
  );
};

export default Card;