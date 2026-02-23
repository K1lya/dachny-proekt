import type { FC, PropsWithChildren } from 'react';
import clsx from 'clsx';
import styles from './Text.module.css';
import { EView, useView } from '@/shared/hooks/useView.ts';
import { Text as SText } from '@/shared/ui/Text/Text';

export interface ITextProps {
  text: string;
}

export const Text: FC<PropsWithChildren<ITextProps>> = (props) => {
  // consts
  const { text } = props;
  const view = useView();
  const size =
    view === EView.TABLET ? '16px' : view === EView.MOBILE ? '12px' : '18px';
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
      <SText size={size}>{text}</SText>
    </div>
  );
};
