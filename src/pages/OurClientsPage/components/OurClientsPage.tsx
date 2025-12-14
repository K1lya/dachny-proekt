import type { FC, PropsWithChildren } from 'react';
import clsx from 'clsx';
import styles from './OurClientsPage.module.css';
import { Text } from '@/shared/ui/Text/Text.tsx';
import { OurClientsCard } from '@/shared/ui/OurClientsCard/OurClientsCard.tsx';
import { ourClients } from '@/shared/constants/ourClientsPage/ourClients.ts';

interface OurClientsPageProps {
  className?: string;
}

export const OurClientsPage: FC<PropsWithChildren<OurClientsPageProps>> = (
  props,
) => {
  // consts
  const { className } = props;
  return (
    <div className={clsx(styles.root, className)}>
      <div>
        <div>
          <Text weight={400} size={'56px'}>
            Что ценят в нас
            <br />
            наши клиенты
          </Text>
          <div className={styles.border} />
        </div>
        <div className={styles.content}>
          {ourClients.map((our) => (
            <OurClientsCard
              key={our.title}
              title={our.title}
              text={our.text}
              icon={our.icon}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
