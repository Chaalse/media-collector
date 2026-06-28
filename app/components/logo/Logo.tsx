import Image from 'next/image';
import styles from './logo.module.css';

type LogoScale = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'main';

interface LogoProps {
  scale?: LogoScale;
  alt?: string;
  priority?: boolean;
  className?: string;
}

export default function Logo({
  scale = 'sm',
  alt = '',
  priority = false,
  className,
}: LogoProps) {
  const classNames = [
    styles.container,
    styles[scale],
    className ?? '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={classNames}>
      <Image
        src="/logo-light.png"
        alt={alt}
        width={1000}
        height={1000}
        priority={priority}
      />
    </div>
  );
}
