import type { FC, PropsWithChildren } from 'react';
import clsx from 'clsx';
import styles from './OurClientsPage.module.css';
import { Text } from '@/shared/ui/Text/Text.tsx';
import { OurClientsCard } from '@/shared/ui/OurClientsCard/OurClientsCard.tsx';
import { ourClients } from '@/shared/constants/ourClientsPage/ourClients.ts';
import { EView, useView } from '@/shared/hooks/useView.ts';

interface OurClientsPageProps {
  className?: string;
}

export const OurClientsPage: FC<PropsWithChildren<OurClientsPageProps>> = (
  props,
) => {
  // consts
  const { className } = props;
  const view = useView();
  return (
    <section
      className={clsx(
        styles.root,
        { [styles.rootTable]: view === EView.TABLET },
        { [styles.rootMobile]: view === EView.MOBILE },
        className,
      )}
    >
      <div
        className={clsx({
          [styles.containerTable]: view === EView.TABLET,
          [styles.containerMobile]: view === EView.MOBILE,
        })}
      >
        <div>
          <Text weight={400} size={view === EView.MOBILE ? '24px' : '56px'}>
            Что ценят в нас
            <br />
            наши клиенты
          </Text>
          <div
            className={clsx(styles.border, {
              [styles.borderMobile]: view === EView.MOBILE,
            })}
          />
        </div>
        <div
          className={clsx(styles.content, {
            [styles.contentMobile]: view === EView.MOBILE,
          })}
        >
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
    </section>
  );
};
