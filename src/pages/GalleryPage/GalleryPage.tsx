import type { FC, PropsWithChildren } from 'react';
import clsx from 'clsx';
import styles from './GalleryPage.module.css';
import { Gallery } from '@/features/Gallery';
import { Text } from '@/shared/ui/Text/Text.tsx';
import { EView, useView } from '@/shared/hooks/useView.ts';

interface GalleryPageProps {
  className?: string;
}

export const GalleryPage: FC<PropsWithChildren<GalleryPageProps>> = (props) => {
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
      <div
        className={clsx(styles.titleContainer, {
          [styles.titleContainerMobile]: view === EView.MOBILE,
        })}
      >
        <Text
          weight={400}
          size={
            view === EView.TABLET ? '36px' : view === EView.MOBILE ? '16px' : '56px'
          }
          className={clsx(styles.title, {
            [styles.titleContainerMobile]: view === EView.MOBILE,
          })}
        >
          Вдохновляйтесь уютом,
          <br />
          который мы создаём
        </Text>
      </div>
      <Gallery />
    </section>
  );
};
