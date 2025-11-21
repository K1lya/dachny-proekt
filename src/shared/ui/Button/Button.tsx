import type { FC, PropsWithChildren } from 'react';
import clsx from 'clsx';
import styles from './Button.module.css';
import { Text } from '@/shared/ui/Text/Text.tsx';

interface ButtonProps {
  className?: string;
  onClick?: () => void;
  width?: string;
  weight?: number;
}

export const Button: FC<PropsWithChildren<ButtonProps>> = (props) => {
  // consts
  const { className, children, onClick, width = '16px', weight = 600 } = props;
  return (
    <button
      onClick={onClick}
      className={clsx(styles.root, className)}
      style={{ width }}
    >
      <Text size={width} weight={weight}>
        {children}
      </Text>
    </button>
  );
};
