import type { FC, PropsWithChildren } from 'react';
import clsx from 'clsx';
import styles from './Button.module.css';
import { Text } from '@/shared/ui/Text/Text.tsx';

interface ButtonProps {
  className?: string;
  onClick?: () => void;
  fontSize?: string;
  weight?: number;
  width?: string;
  height?: string;
}

export const Button: FC<PropsWithChildren<ButtonProps>> = (props) => {
  // consts
  const {
    className,
    children,
    onClick,
    width = '60px',
    height,
    fontSize = '16px',
    weight = 600,
  } = props;
  return (
    <button
      onClick={onClick}
      className={clsx(styles.root, className)}
      style={{ width, height }}
    >
      <Text size={fontSize} weight={weight} color='#FFFFFF'>
        {children}
      </Text>
    </button>
  );
};
