'use client';

import { forwardRef, useId } from 'react';
import styles from './input.module.css';

type InputType = 'text' | 'email' | 'url';
type InputSize = 'sm' | 'md' | 'lg';

interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'type'> {
  type?: InputType;
  size?: InputSize;
  error?: boolean;
  errorMessage?: string;
  helperText?: string;
  leadingIcon?: React.ReactNode;
  trailingIcon?: React.ReactNode;
}

const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  {
    type = 'text',
    size = 'md',
    disabled = false,
    error = false,
    errorMessage,
    helperText,
    leadingIcon,
    trailingIcon,
    className,
    ...rest
  },
  ref,
) {
  const generatedId = useId();
  const descriptionId = `${generatedId}-desc`;
  const hasDescription = Boolean(error && errorMessage) || Boolean(helperText);

  const inputClassNames = [
    styles.input,
    styles[size],
    error ? styles.error : '',
    disabled ? styles.disabled : '',
    leadingIcon ? styles.hasLeadingIcon : '',
    trailingIcon ? styles.hasTrailingIcon : '',
    className ?? '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={styles.wrapper}>
      <div className={styles.inputContainer}>
        {leadingIcon && <span className={styles.leadingIcon}>{leadingIcon}</span>}
        <input
          ref={ref}
          type={type}
          disabled={disabled}
          className={inputClassNames}
          aria-invalid={error}
          aria-describedby={hasDescription ? descriptionId : undefined}
          {...rest}
        />
        {trailingIcon && <span className={styles.trailingIcon}>{trailingIcon}</span>}
      </div>
      {error && errorMessage && (
        <p id={descriptionId} className={styles.errorText} role="alert">
          {errorMessage}
        </p>
      )}
      {!error && helperText && (
        <p id={descriptionId} className={styles.helperText}>
          {helperText}
        </p>
      )}
    </div>
  );
});

export default Input;
