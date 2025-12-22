import type { FC, PropsWithChildren } from 'react';
import clsx from 'clsx';
import styles from './FirstPage.module.css';
import { Header } from '@/widgets/Header';

interface FirstPageProps {
  className?: string;
}

export const FirstPage: FC<PropsWithChildren<FirstPageProps>> = (props) => {
  // consts
  const { className } = props;
  return (
    <section className={clsx(styles.root, className)}>
      <Header />
    </section>
  );
};
