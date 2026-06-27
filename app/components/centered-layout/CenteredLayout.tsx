import styles from './centered-layout.module.css';

interface CenteredLayoutProps {
  children: React.ReactNode;
  className?: string;
}

export default function CenteredLayout({ children, className }: CenteredLayoutProps) {
  return (
    <main className={`${styles.container}${className ? ` ${className}` : ''}`}>
      {children}
    </main>
  );
}
