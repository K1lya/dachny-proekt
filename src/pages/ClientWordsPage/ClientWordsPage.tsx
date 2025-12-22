import type { FC, PropsWithChildren } from 'react';
import clsx from 'clsx';
import styles from './ClientWordsPage.module.css';
import { Gallery } from '@/features/Gallery';
import { clientsWords } from '@/shared/constants/clientsWordsPage/clientsWords.ts';
import { PeopleTalkCard } from '@/shared/ui/PeopleTalkCard/PeopleTalkCard.tsx';
import { Text } from '@/shared/ui/Text/Text.tsx';

interface ClientWordsPageProps {
  className?: string;
}

export const ClientWordsPage: FC<PropsWithChildren<ClientWordsPageProps>> = (
  props,
) => {
  // consts
  const { className } = props;
  const items = clientsWords.map((item) => ({
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
      <div className={styles.title}>
        <div className={styles.text}>
          <Text weight={400} size={'56px'}>
            Ваши слова о нашей работе
          </Text>
          <div className={styles.border} />
        </div>
      </div>
      <Gallery items={items} centered />
    </section>
  );
};
