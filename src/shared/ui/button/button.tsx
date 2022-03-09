import { forwardRef, useState } from 'react';
import clsx from 'clsx';

import { useFocusVisible, useMergeRef } from '@app/shared/lib/hooks';

import styles from './button.module.css';

type Variant = 'primary' | 'secondary' | 'tertiary' | 'text' | undefined;
type Size = 'xs' | 's' | 'm' | 'l' | undefined;
type Width = 'auto' | 'fluid' | undefined;
type Ref = HTMLButtonElement;

interface Props {
  className?: string | undefined;
  variant?: Variant;
  size?: Size;
  width?: Width;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
}

const Button = forwardRef<Ref, React.ButtonHTMLAttributes<HTMLButtonElement> & Props>(function Button(
  {
    className,
    type = 'button',
    variant = 'primary',
    size = 'm',
    width = 'auto',
    disabled,
    children,
    onClick,
    startIcon,
    endIcon,
    ...rest
  },
  ref,
) {
  const [focused, setFocused] = useState(false);
  const { isFocusVisible, onBlurVisible, ref: focusVisibleRef } = useFocusVisible();
  const handleRef = useMergeRef(ref, focusVisibleRef);

  const handleFocus: ((event: React.FocusEvent<HTMLButtonElement>) => void) | undefined = (event) => {
    if (isFocusVisible(event)) {
      setFocused(true);
    }
  };

  const handleBlur: ((event: React.FocusEvent<HTMLButtonElement>) => void) | undefined = () => {
    if (focused) {
      onBlurVisible();
      setFocused(false);
    }
  };

  return (
    <button
      ref={handleRef}
      type={type}
      className={clsx(styles.btn, styles[variant], styles[size], styles[width], focused && styles.focused, className)}
      disabled={disabled}
      onClick={onClick}
      onFocus={handleFocus}
      onBlur={handleBlur}
      {...rest}
    >
      <span className={clsx(styles.inner)}>
        {startIcon && startIcon}
        {children}
        {endIcon && endIcon}
      </span>
    </button>
  );
});

export default Button;
