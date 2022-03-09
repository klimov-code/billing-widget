// based on https://github.com/WICG/focus-visible/blob/v4.1.5/src/focus-visible.js
import { useEffect, useMemo, useRef } from 'react';

let hadKeyboardEvent = true;
let hadFocusVisibleRecently = false;
let hadFocusVisibleRecentlyTimeout = null;

const inputTypesWhitelist = {
  text: true,
  search: true,
  url: true,
  tel: true,
  email: true,
  password: true,
  number: true,
  date: true,
  month: true,
  week: true,
  time: true,
  datetime: true,
  'datetime-local': true,
};

const focusTriggersKeyboardModality = (node) => {
  const { isContentEditable, type, tagName, readOnly } = node;

  if (tagName === 'INPUT' && inputTypesWhitelist[type] && !readOnly) {
    return true;
  }

  if (tagName === 'TEXTAREA' && !readOnly) {
    return true;
  }

  if (isContentEditable) {
    return true;
  }

  return false;
};

const handleKeyDown = (event) => {
  if (event.metaKey || event.altKey || event.ctrlKey) {
    return;
  }

  hadKeyboardEvent = true;
};

const handlePointerDown = () => {
  hadKeyboardEvent = false;
};

const handleVisibilityChange = () => {
  if (document.visibilityState === 'hidden') {
    // If the tab becomes active again, the browser will handle calling focus
    // on the element (Safari actually calls it twice).
    // If this tab change caused a blur on an element with focus-visible,
    // re-apply the class when the user switches back to the tab.
    if (hadFocusVisibleRecently) {
      hadKeyboardEvent = true;
    }
  }
};

const prepare = () => {
  document.addEventListener('keydown', handleKeyDown, true);
  document.addEventListener('mousedown', handlePointerDown, true);
  document.addEventListener('pointerdown', handlePointerDown, true);
  document.addEventListener('touchstart', handlePointerDown, true);
  document.addEventListener('visibilitychange', handleVisibilityChange, true);
};

const teardown = () => {
  document.removeEventListener('keydown', handleKeyDown, true);
  document.removeEventListener('mousedown', handlePointerDown, true);
  document.removeEventListener('pointerdown', handlePointerDown, true);
  document.removeEventListener('touchstart', handlePointerDown, true);
  document.removeEventListener('visibilitychange', handleVisibilityChange, true);
};

const isFocusVisible = (event) => {
  const { target } = event;
  try {
    return target.matches(':focus-visible');
  } catch (error) {
    // browsers not implementing :focus-visible will throw a SyntaxError
    // we use our own heuristic for those browsers
    // rethrow might be better if it's not the expected error but do we really
    // want to crash if focus-visible malfunctioned?
  }

  // no need for validFocusTarget check. the user does that by attaching it to
  // focusable events only
  return hadKeyboardEvent || focusTriggersKeyboardModality(target);
};

const onBlurVisible = () => {
  // To detect a tab/window switch, we look for a blur event followed
  // rapidly by a visibility change.
  // If we don't see a visibility change within 100ms, it's probably a
  // regular focus change.
  hadFocusVisibleRecently = true;
  window.clearTimeout(hadFocusVisibleRecentlyTimeout);
  hadFocusVisibleRecentlyTimeout = window.setTimeout(() => {
    hadFocusVisibleRecently = false;
  }, 100);
};

const useFocusVisible = () => {
  const ref = useRef(null);

  useEffect(() => {
    if (ref.current !== null) {
      prepare();
    }

    return () => {
      teardown();
    };
  }, [ref]);

  return useMemo(
    () => ({
      isFocusVisible,
      onBlurVisible,
      ref,
    }),
    [ref],
  );
};

export { teardown, useFocusVisible };
