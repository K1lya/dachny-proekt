import type { FC, PropsWithChildren } from 'react';
import clsx from 'clsx';
import styles from './BoxText.module.css';
import { EView, useView } from '@/shared/hooks/useView.ts';
import { Text } from '@/shared/ui/Text/Text.tsx';

export interface IBoxTextProps {
  text: string;
  title?: string;
}

export const BoxText: FC<PropsWithChildren<IBoxTextProps>> = (props) => {
  // consts
  const { text, title } = props;
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
      <Text
        size={titleSize}
        weight={500}
        className={clsx(styles.title, {
          [styles.titleTablet]: view === EView.TABLET,
          [styles.titleMobile]: view === EView.MOBILE,
        })}
      >
        {title}
      </Text>
      <Text
        size={textSize}
        weight={400}
        className={clsx(styles.text, {
          [styles.textTablet]: view === EView.TABLET,
          [styles.textMobile]: view === EView.MOBILE,
        })}
      >
        {text}
      </Text>
    </div>
  );
};
