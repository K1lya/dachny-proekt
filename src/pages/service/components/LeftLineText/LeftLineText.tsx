import type { FC, PropsWithChildren } from 'react';
import clsx from 'clsx';
import styles from './LeftLineText.module.css';
import { Text } from '@/shared/ui/Text/Text.tsx';
import { EView, useView } from '@/shared/hooks/useView.ts';

export interface ILeftLineTextProps {
  text: string;
}

export const LeftLineText: FC<PropsWithChildren<ILeftLineTextProps>> = (props) => {
  // consts
  const { text } = props;
  const view = useView();
  const size =
    view === EView.TABLET ? '24px' : view === EView.MOBILE ? '14px' : '29px';
  return (
    <div
      className={clsx(
        styles.root,
        {
          [styles.rootMobile]: view === EView.MOBILE,
          [styles.rootTablet]: view === EView.TABLET,
        },
        'serviceContainer',
      )}
    >
      <Text
        className={clsx(styles.text, {
          [styles.textMobile]: view === EView.MOBILE,
          [styles.textTablet]: view === EView.TABLET,
        })}
        size={size}
        weight={500}
      >
        {text}
      </Text>
    </div>
  );
};
