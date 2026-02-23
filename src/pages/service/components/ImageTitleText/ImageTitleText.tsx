import type { FC, PropsWithChildren } from 'react';
import clsx from 'clsx';
import styles from './ImageTitleText.module.css';
import { EView, useView } from '@/shared/hooks/useView.ts';
import { Text } from '@/shared/ui/Text/Text.tsx';
import { imagesMap } from '@/pages/service/constants/imagesMap.ts';

export interface IImageTitleTextProps {
  text: string;
  title: string;
  image: string;
}

export const ImageTitleText: FC<PropsWithChildren<IImageTitleTextProps>> = (
  props,
) => {
  // consts
  const { text, title, image } = props;

  const view = useView();

  const textSize =
    view === EView.TABLET ? '16px' : view === EView.MOBILE ? '12px' : '18px';
  const titleSize =
    view === EView.TABLET ? '24px' : view === EView.MOBILE ? '16px' : '36px';
  return (
    <div
      className={clsx(
        styles.root,
        {
          [styles.rootTablet]: view === EView.TABLET,
          [styles.rootMobile]: view === EView.MOBILE,
        },
        'serviceContainer',
      )}
    >
      <Text size={titleSize} weight={500}>
        {title}
      </Text>
      <div
        className={clsx(styles.container, {
          [styles.containerTablet]: view === EView.TABLET,
          [styles.containerMobile]: view === EView.MOBILE,
        })}
      >
        <img
          src={imagesMap[image]}
          alt='img'
          className={clsx(styles.img, {
            [styles.imgTablet]: view === EView.TABLET,
            [styles.imgMobile]: view === EView.MOBILE,
          })}
        />
        <Text size={textSize} weight={400}>
          {text}
        </Text>
      </div>
    </div>
  );
};
