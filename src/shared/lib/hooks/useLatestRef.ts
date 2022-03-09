import { useRef } from 'react';

import { useEnhancedEffect } from './useEnhancedEffect';

const useLatestRef = <T>(value: T) => {
  const ref = useRef<T>(value);

  useEnhancedEffect(() => {
    ref.current = value;
  }, [value]);

  return ref;
};

export { useLatestRef };
