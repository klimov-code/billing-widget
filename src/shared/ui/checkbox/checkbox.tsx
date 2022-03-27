import React, { forwardRef, useRef, useState } from 'react';
import { Checkmark16 } from '@carbon/icons-react';
import clsx from 'clsx';

import { useFocusVisible, useMergeRef } from '@app/shared/lib/hooks';

import styles from './checkbox.module.css';

type Size = 'm' | 'l' | undefined;
type Ref = HTMLInputElement | null;

interface Props {
  label?: string;
  checkSize?: Size;
}

export const Checkbox = forwardRef<Ref, React.InputHTMLAttributes<HTMLInputElement> & Props>(function Checkbox(
  { checked = false, checkSize = 'm', disabled = false, id, label, onChange, ...rest },
  ref,
) {
  const checkboxRef = useRef<Ref>(null);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const { isFocusVisible, onBlurVisible, ref: focusVisibleRef } = useFocusVisible();
  const handleRef = useMergeRef(ref, checkboxRef, focusVisibleRef);

  const handleFocus: ((event: React.FocusEvent<HTMLInputElement>) => void) | undefined = (event) => {
    if (isFocusVisible(event)) {
      setFocused(true);
    }
  };

  const handleBlur: ((event: React.FocusEvent<HTMLInputElement>) => void) | undefined = () => {
    if (focused) {
      onBlurVisible();
      setFocused(false);
    }
  };

  const onMouseEnter = () => {
    setHovered(true);
  };

  const onMouseLeave = () => {
    setHovered(false);
  };

  return (
    <span className={clsx(styles.container)} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
      <span className={clsx(styles.box)}>
        <input
          {...rest}
          ref={handleRef}
          type="checkbox"
          aria-checked={checked}
          aria-labelledby={id}
          autoComplete="off"
          id={id}
          name={id}
          checked={checked}
          disabled={disabled}
          className={clsx(styles.control, hovered && !disabled && 'cursor-pointer', disabled && 'cursor-not-allowed')}
          onChange={onChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
        <span
          className={clsx(
            styles.checkbox,
            styles[checkSize],
            checked && styles.checked,
            hovered && !disabled && !checked && styles.hovered,
            disabled && styles.disabled,
            focused && styles.focused,
          )}
        >
          {checked ? <Checkmark16 /> : null}
        </span>
      </span>
      {label && (
        <label
          id={id}
          htmlFor={id}
          className={clsx(styles.label, hovered && !disabled && 'cursor-pointer', disabled && 'cursor-not-allowed')}
        >
          {label}
        </label>
      )}
    </span>
  );
});
