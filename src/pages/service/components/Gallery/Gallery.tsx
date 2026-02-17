import { type FC, type PropsWithChildren } from 'react';
import clsx from 'clsx';
import styles from './Gallery.module.css';
import { EView, useView } from '@/shared/hooks/useView.ts';
import { Gallery as SGallery } from '@/features/Gallery';
import { imagesMap } from '@/pages/service/constants/imagesMap.ts';
import type { GalleryItem } from '@/features/Gallery/components/Gallery.tsx';
import { Text } from '@/shared/ui/Text/Text.tsx';

interface GalleryProps {
  images: string[];
}

export const Gallery: FC<PropsWithChildren<GalleryProps>> = (props) => {
  // consts
  const { images } = props;
  const view = useView();

  const gap = view === EView.TABLET ? 12 : view === EView.MOBILE ? 8 : 16;
  const titleSize =
    view === EView.TABLET ? '40px' : view === EView.MOBILE ? '24px' : '56px';

  const galleryItems = images.reduce<GalleryItem[]>((acc, image) => {
    const curImage = imagesMap[image];

    return [
      ...acc,
      {
        key: image,
        node: (
          <img
            src={curImage}
            alt='image'
            className={clsx(styles.img, {
              [styles.imgTablet]: view === EView.TABLET,
              [styles.imgMobile]: view === EView.MOBILE,
            })}
          />
        ),
      },
    ];
  }, []);

  return (
    <div
      className={clsx(styles.root, {
        [styles.rootTablet]: view === EView.TABLET,
        [styles.rootMobile]: view === EView.MOBILE,
      })}
    >
      <Text
        weight={400}
        size={titleSize}
        className={clsx(styles.text, {
          [styles.textTablet]: view === EView.TABLET,
          [styles.textMobile]: view === EView.MOBILE,
        })}
      >
        Галерея
      </Text>
      <SGallery
        items={galleryItems}
        rowItemsWidth='fitContent'
        gap={gap}
        isMobile={view === EView.MOBILE}
      />
    </div>
  );
};
