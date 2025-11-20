import type { FC, PropsWithChildren } from 'react';
import clsx from 'clsx';
import styles from './FirstPage.module.css';

interface FirstPageProps {
  className?: string;
}

export const FirstPage: FC<PropsWithChildren<FirstPageProps>> = (props) => {
  // consts
  const { className } = props;
  return <div className={clsx(styles.root, className)}>FirstPage</div>;
};
