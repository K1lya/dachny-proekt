import type { FC, PropsWithChildren } from 'react';
import clsx from 'clsx';
import styles from './ClientWordsPage.module.css';
import { Gallery } from '@/features/Gallery';
import { clientsWords } from '@/shared/constants/clientsWordsPage/clientsWords.ts';
import { PeopleTalkCard } from '@/shared/ui/PeopleTalkCard/PeopleTalkCard.tsx';
import { Text } from '@/shared/ui/Text/Text.tsx';
import { EView, useView } from '@/shared/hooks/useView.ts';

interface ClientWordsPageProps {
  className?: string;
}

export const ClientWordsPage: FC<PropsWithChildren<ClientWordsPageProps>> = (
  props,
) => {
  // consts
  const { className } = props;
  const view = useView();
  const titleSize =
    view === EView.TABLET ? '32px' : view === EView.MOBILE ? '24px' : '56px';
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
    <section
      className={clsx(
        styles.root,
        { [styles.rootMobile]: view === EView.MOBILE },
        className,
      )}
    >
      <div
        className={clsx(styles.title, {
          [styles.titleTablet]: view === EView.TABLET,
          [styles.titleMobile]: view === EView.MOBILE,
        })}
      >
        <div
          className={clsx(styles.text, {
            [styles.textTablet]: view === EView.TABLET,
            [styles.textMobile]: view === EView.MOBILE,
          })}
        >
          <Text weight={400} size={titleSize}>
            Ваши слова о{view === EView.MOBILE ? <br /> : ' '}нашей работе
          </Text>
          <div
            className={clsx(styles.border, {
              [styles.borderMobile]: view === EView.MOBILE,
              [styles.borderTablet]: view === EView.TABLET,
            })}
          />
        </div>
      </div>
      <Gallery
        items={items}
        centered
        singleCentered={view === EView.TABLET || view === EView.MOBILE}
        isMobile={view === EView.MOBILE}
        gap={view === EView.MOBILE ? 20 : undefined}
      />
    </section>
  );
};
