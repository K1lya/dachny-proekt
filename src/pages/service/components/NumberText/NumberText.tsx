import type { FC, PropsWithChildren } from 'react';
import clsx from 'clsx';
import styles from './NumberText.module.css';
import { EView, useView } from '@/shared/hooks/useView.ts';
import { Text } from '@/shared/ui/Text/Text.tsx';

interface NumberTextProps {
  text: string[];
}

export const NumberText: FC<PropsWithChildren<NumberTextProps>> = (props) => {
  // consts
  const { text } = props;
  const view = useView();
  const textSize =
    view === EView.TABLET ? '16px' : view === EView.MOBILE ? '12px' : '18px';
  const numberSize =
    view === EView.TABLET ? '20px' : view === EView.MOBILE ? '14px' : '20px';
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
      {text.map((el, index) => (
        <div
          key={el}
          className={clsx(styles.container, {
            [styles.containerMobile]: view === EView.MOBILE,
            [styles.containerTablet]: view === EView.TABLET,
          })}
        >
          <Text size={numberSize} weight={700} color={'#E85A4F'}>
            {index + 1}.
          </Text>
          <Text size={textSize} weight={400}>
            {el}
          </Text>
        </div>
      ))}
    </div>
  );
};
