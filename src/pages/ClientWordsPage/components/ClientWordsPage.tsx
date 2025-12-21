import type { FC, PropsWithChildren } from 'react';
import clsx from 'clsx';
import styles from './ClientWordsPage.module.css';
import { Gallery } from '@/features/Gallery';
import { peopleTalk } from '@/shared/constants/peopleTalk/peopleTalk.ts';
import { PeopleTalkCard } from '@/shared/ui/PeopleTalkCard/PeopleTalkCard.tsx';

interface ClientWordsPageProps {
  className?: string;
}

export const ClientWordsPage: FC<PropsWithChildren<ClientWordsPageProps>> = (
  props,
) => {
  // consts
  const { className } = props;
  const items = peopleTalk.map((item) => ({
    key: item.name,
    node: (
      <PeopleTalkCard
        key={item.name}
        photo={item.photo}
        image={item.image}
        avatar={item.avatar}
        text={item.text}
        name={item.name}
        infoText={item.infoText}
      />
    ),
  }));
  return (
    <section className={clsx(styles.root, className)}>
      <Gallery items={items} centered />
    </section>
  );
};
