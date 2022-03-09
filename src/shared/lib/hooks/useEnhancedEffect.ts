import { useEffect, useLayoutEffect } from 'react';

const useEnhancedEffect = typeof document !== 'undefined' ? useLayoutEffect : useEffect;

export { useEnhancedEffect };
