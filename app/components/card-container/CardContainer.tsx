import styles from './card-container.module.css';

interface CardContainerProps {
  children: React.ReactNode;
  className?: string;
}

export default function CardContainer({ children, className }: CardContainerProps) {
  return (
    <div className={`${styles.container}${className ? ` ${className}` : ''}`}>
      {children}
    </div>
  );
}
