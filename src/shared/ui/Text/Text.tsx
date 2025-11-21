import type { FC, PropsWithChildren } from 'react';
import clsx from 'clsx';
import styles from './Text.module.css';

interface TextProps {
  className?: string;
  size?: string;
  weight?: number;
  color?: string;
}

export const Text: FC<PropsWithChildren<TextProps>> = (props) => {
  // consts
  const {
    className,
    children,
    size = '16px',
    weight = 500,
    color = '#121212',
  } = props;
  return (
    <span
      className={clsx(styles.root, className)}
      style={{ fontSize: size, fontWeight: weight, color }}
    >
      {children}
    </span>
  );
};
