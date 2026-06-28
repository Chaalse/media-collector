'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Input from '@/app/components/input/Input';
import Button from '@/app/components/button/Button';
import styles from './media-crawler-form.module.css';

function isValidUrl(value: string): boolean {
  try {
    const url = new URL(value);
    return url.protocol === 'http:' || url.protocol === 'https:';
  } catch {
    return false;
  }
}

// TODO(impl): Replace with actual server action / API call.
async function submitUrl(_url: string): Promise<void> {
  await new Promise((resolve) => setTimeout(resolve, 500));
}

export default function MediaCrawlerForm() {
  const router = useRouter();
  const [url, setUrl] = useState('');
  const [urlError, setUrlError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    if (!showSuccess) return;
    const timer = setTimeout(() => setShowSuccess(false), 3000);
    return () => clearTimeout(timer);
  }, [showSuccess]);

  function handleBlur() {
    if (url && !isValidUrl(url)) {
      setUrlError('Please enter a valid URL (e.g. https://example.com).');
    } else {
      setUrlError('');
    }
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setUrl(e.target.value);
    if (urlError) {
      setUrlError('');
    }
    if (showSuccess) {
      setShowSuccess(false);
    }
  }

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      if (!url) {
        setUrlError('URL is required.');
        return;
      }
      if (!isValidUrl(url)) {
        setUrlError('Please enter a valid URL (e.g. https://example.com).');
        return;
      }

      setIsLoading(true);
      try {
        await submitUrl(url);
        setUrl('');
        setShowSuccess(true);
      } finally {
        setIsLoading(false);
      }
    },
    [url],
  );

  return (
    <form onSubmit={handleSubmit} className={styles.form} noValidate>
      <div className={styles.logo}>
        <Image src="/public/next.svg" alt="" width={200} height={200} />
      </div>
      <Input
        type="url"
        value={url}
        placeholder="Enter media URL"
        autoComplete="url"
        error={Boolean(urlError)}
        errorMessage={urlError}
        onBlur={handleBlur}
        onChange={handleChange}
        disabled={isLoading}
      />
      <Button type="submit" fullWidth loading={isLoading}>
        Get that reel!
      </Button>
      {showSuccess && (
        <p className={styles.successMessage}>URL submitted successfully!</p>
      )}
      <p className={styles.divider}>OR</p>
      <Button
        type="button"
        fullWidth
        onClick={() => router.push('/collector/collections')}
      >
        Check your collections!
      </Button>
    </form>
  );
}
