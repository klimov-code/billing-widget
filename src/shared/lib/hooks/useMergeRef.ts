import React from 'react';

import { Maybe } from '#types/utility';

const useMergeRef: (...refs: Maybe<React.Ref<HTMLElement>>[]) => (node: HTMLElement | null) => void =
  (...refs) =>
  (node) => {
    refs.forEach((ref) => {
      if (typeof ref === 'function') {
        ref(node);
      } else if (ref !== null && ref !== undefined) {
        (ref as React.MutableRefObject<HTMLElement | null>).current = node;
      }
    });
  };

export { useMergeRef };
