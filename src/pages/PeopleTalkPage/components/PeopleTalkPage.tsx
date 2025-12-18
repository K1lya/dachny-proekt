import type { FC, PropsWithChildren } from 'react';
import clsx from 'clsx';
import styles from './PeopleTalkPage.module.css';
import { peopleTalk } from '@/shared/constants/peopleTalk/peopleTalk.ts';
import { PeopleTalkCard } from '@/shared/ui/PeopleTalkCard/PeopleTalkCard.tsx';

interface PeopleTalkPageProps {
  className?: string;
}

export const PeopleTalkPage: FC<PropsWithChildren<PeopleTalkPageProps>> = (
  props,
) => {
  // consts
  const { className } = props;
  return (
    <section className={clsx(styles.root, className)}>
      {peopleTalk.map((item) => (
        <PeopleTalkCard key={item.name} {...item} />
      ))}
    </section>
  );
};
