import { forwardRef } from 'react';
import clsx from 'clsx';

import styles from './divider.module.css';

type Ref = HTMLElement;

interface Props {
  orientation?: 'horizontal' | 'vertical';
  component?: React.ElementType;
}

const Divider = forwardRef<Ref, React.HTMLAttributes<HTMLElement> & Props>(function Divider(
  { className, component: Component = 'hr', orientation = 'horizontal', ...rest },
  ref,
) {
  return <Component ref={ref} className={clsx(styles.divider, styles[orientation], className)} {...rest} />;
});

export default Divider;
