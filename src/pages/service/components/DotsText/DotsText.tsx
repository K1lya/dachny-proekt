import type { FC, PropsWithChildren } from 'react';
import clsx from 'clsx';
import styles from './DotsText.module.css';
import { EView, useView } from '@/shared/hooks/useView.ts';
import { Text } from '@/shared/ui/Text/Text.tsx';

export interface IDotsTextProps {
  text: string[];
}

export const DotsText: FC<PropsWithChildren<IDotsTextProps>> = (props) => {
  // consts
  const { text } = props;
  const view = useView();
  const size =
    view === EView.TABLET ? '16px' : view === EView.MOBILE ? '12px' : '18px';

  if (typeof text !== 'object' || !text || text.length === 0) {
    return null;
  }

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
      {text.map((el) => {
        if (!el || typeof el !== 'string') {
          return null;
        }

        return (
          <div
            className={clsx(styles.container, {
              [styles.containerMobile]: view === EView.MOBILE,
              [styles.containerTablet]: view === EView.TABLET,
            })}
            key={el}
          >
            <div
              className={clsx(styles.dotContainer, {
                [styles.dotContainerMobile]: view === EView.MOBILE,
                [styles.dotContainerTablet]: view === EView.TABLET,
              })}
            >
              <div
                className={clsx(styles.dot, {
                  [styles.dotMobile]: view === EView.MOBILE || view === EView.TABLET,
                })}
              />
            </div>
            <Text size={size} weight={400}>
              {el}
            </Text>
          </div>
        );
      })}
    </div>
  );
};
