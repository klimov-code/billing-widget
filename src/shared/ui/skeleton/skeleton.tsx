import ContentLoader, { IContentLoaderProps } from 'react-content-loader';
import clsx from 'clsx';

import styles from './skeleton.module.css';

const Skeleton = ({ children, height, width }: IContentLoaderProps) => {
  return (
    <ContentLoader height={height} width={width} viewBox="0 0 100 100" className={clsx(styles.skeleton)}>
      {children}
    </ContentLoader>
  );
};

export default Skeleton;
