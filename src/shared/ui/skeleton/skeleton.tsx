import ContentLoader, { IContentLoaderProps } from 'react-content-loader';
import clsx from 'clsx';

import styles from './skeleton.module.css';

const Skeleton = ({ children }: IContentLoaderProps) => {
  return (
    <ContentLoader
      width={100}
      height={100}
      viewBox="0 0 100 100"
      style={{ width: '100%' }}
      className={clsx(styles.skeleton)}
    >
      {children}
    </ContentLoader>
  );
};

export default Skeleton;
