import type { FC, PropsWithChildren } from 'react';
import clsx from 'clsx';
import styles from './BigImageAndTitle.module.css';
import { EView, useView } from '@/shared/hooks/useView.ts';
import { Text } from '@/shared/ui/Text/Text.tsx';
import { imagesMap } from '@/pages/service/constants/imagesMap.ts';

export interface IBigImageAndTitleProps {
  image: string;
  title: string;
  underText: string;
}

export const BigImageAndTitle: FC<PropsWithChildren<IBigImageAndTitleProps>> = (
  props,
) => {
  // consts
  const { title, image, underText } = props;

  const view = useView();

  const textSize =
    view === EView.TABLET ? '15px' : view === EView.MOBILE ? '12px' : '15px';
  const titleSize =
    view === EView.TABLET ? '30px' : view === EView.MOBILE ? '20px' : '40px';
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
      <Text size={titleSize} weight={700}>
        {title}
      </Text>
      <img
        src={imagesMap[image]}
        alt='image'
        className={clsx(styles.img, {
          [styles.imgTablet]: view === EView.TABLET,
          [styles.imgMobile]: view === EView.MOBILE,
        })}
      />
      <Text
        size={textSize}
        weight={400}
        color={'#828282'}
        className={clsx(styles.under, {
          [styles.underTablet]: view === EView.TABLET,
          [styles.underMobile]: view === EView.MOBILE,
        })}
      >
        {underText}
      </Text>
    </div>
  );
};
