import { useCallback, useLayoutEffect, useRef } from 'react';

// https://github.com/facebook/react/issues/14099#issuecomment-440013892
const useEventCallback = (fn) => {
  const ref = useRef(fn);

  useLayoutEffect(() => {
    ref.current = fn;
  });

  return useCallback((...args) => (0, ref.current)(...args), []);
};

export { useEventCallback };
