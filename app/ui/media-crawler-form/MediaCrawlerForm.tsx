'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Input from '@/app/components/input/Input';
import Button from '@/app/components/button/Button';
import Logo from '@/app/components/logo/Logo';
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
      <Logo
      priority
      scale="main"
      />
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
      {showSuccess && (
        <p className={styles.successMessage}>URL submitted successfully!</p>
      )}
      <div className={styles.buttonRow}>
        <Button type="submit" loading={isLoading}>
          Scrape a reel!
        </Button>
        <span className={styles.divider}>OR</span>
        <Button
          type="button"
          onClick={() => router.push('/collector/scrappins')}
        >
          Go to scrappins!
        </Button>
      </div>
    </form>
  );
}
