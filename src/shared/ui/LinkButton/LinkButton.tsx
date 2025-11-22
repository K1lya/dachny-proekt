import type { FC, PropsWithChildren } from 'react';
import clsx from 'clsx';
import styles from './LinkButton.module.css';

interface LinkButtonProps {
  className?: string;
  link?: string;
}

export const LinkButton: FC<PropsWithChildren<LinkButtonProps>> = (props) => {
  // consts
  const { className, children, link } = props;
  return (
    <a className={clsx(styles.root, className)} href={link}>
      {children}
    </a>
  );
};
