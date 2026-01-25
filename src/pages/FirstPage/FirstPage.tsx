import type { FC, PropsWithChildren } from 'react';
import clsx from 'clsx';
import styles from './FirstPage.module.css';
import { NavigationBar } from '@/widgets/NavigationBar';
import { EView, useView } from '@/shared/hooks/useView.ts';

interface FirstPageProps {
  className?: string;
}

export const FirstPage: FC<PropsWithChildren<FirstPageProps>> = (props) => {
  // consts
  const { className } = props;
  const view = useView();
  return (
    <section
      className={clsx(
        styles.root,
        { [styles.rootTablet]: view === EView.TABLET },
        { [styles.rootMobile]: view === EView.MOBILE },
        className,
      )}
    >
      <NavigationBar />
    </section>
  );
};
