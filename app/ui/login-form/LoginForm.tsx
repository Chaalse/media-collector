'use client';

import { useActionState, useState } from 'react';
import Image from 'next/image';
import Input from '@/app/components/input/Input';
import Button from '@/app/components/button/Button';
import styles from './login-form.module.css';
import { authenticate } from './actions';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function LoginForm() {
  const [errorMessage, formAction, isPending] = useActionState<string|undefined, FormData>(
    authenticate,
    undefined,
  );

  const [emailError, setEmailError] = useState('');

  function handleBlur(e: React.FocusEvent<HTMLInputElement>) {
    const value = e.target.value;
    if (value && !EMAIL_REGEX.test(value)) {
      setEmailError('Please enter a valid email address.');
    } else {
      setEmailError('');
    }
  }

  function handleChange() {
    if (emailError) {
      setEmailError('');
    }
  }

  const displayError = emailError || errorMessage || '';

  return (
    <form action={formAction} className={styles.form} noValidate>
      <div className={styles.logo}>
        <Image src="/next.svg" alt="" width={200} height={200} priority />
      </div>
      <Input
        name="email"
        type="email"
        placeholder="Enter your email"
        required
        autoComplete="email"
        error={Boolean(displayError)}
        errorMessage={displayError}
        onBlur={handleBlur}
        onChange={handleChange}
        disabled={isPending}
      />
      <Button type="submit" fullWidth loading={isPending}>
        Sign In
      </Button>
    </form>
  );
}
