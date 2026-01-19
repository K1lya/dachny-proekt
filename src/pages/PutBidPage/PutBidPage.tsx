import type { FC, PropsWithChildren } from 'react';
import clsx from 'clsx';
import styles from './PutBidPage.module.css';
import { Text } from '@/shared/ui/Text/Text.tsx';
import { Button } from '@/shared/ui/Button/Button.tsx';
import { EView, useView } from '@/shared/hooks/useView.ts';

interface PutBidPageProps {
  className?: string;
}

export const PutBidPage: FC<PropsWithChildren<PutBidPageProps>> = (props) => {
  // consts
  const { className } = props;
  const view = useView();
  return (
    <section
      className={clsx(
        styles.root,
        { [styles.rootTablet]: view === EView.TABLET },
        className,
      )}
    >
      <div
        className={clsx(styles.image, {
          [styles.imageTablet]: view === EView.TABLET,
        })}
      >
        <div
          className={clsx(styles.content, {
            [styles.contentTable]: view === EView.TABLET,
          })}
        >
          <div className={styles.text}>
            <Text
              weight={400}
              size={view === EView.TABLET ? '56px' : '102px'}
              color={'#FFFFFF'}
            >
              ОСТАВИТЬ
            </Text>
            <Text
              weight={400}
              size={view === EView.TABLET ? '56px' : '102px'}
              color={'#E85A4F'}
            >
              ЗАЯВКУ
            </Text>
          </div>
          <div
            className={clsx(styles.containerDiv, {
              [styles.containerDivTablet]: view === EView.TABLET,
            })}
          >
            <div
              className={clsx(styles.container, {
                [styles.containerTablet]: view === EView.TABLET,
              })}
            >
              <Text
                weight={400}
                size={'22px'}
                color={'#FFFFFF'}
                className={styles.contentText}
              >
                {view === EView.TABLET &&
                  'Оставьте заявку, мы\n перезвоним и всё обсудим'}
                {view === EView.DESC &&
                  'Оставьте заявку, мы перезвоним Вам в ближайшее время и всё обсудим'}
              </Text>
              <Button width={'258px'} weight={600} fontSize={'16px'}>
                ЗАКАЗАТЬ ЗВОНОК
              </Button>
            </div>
            <div
              className={clsx(styles.container, {
                [styles.containerTablet]: view === EView.TABLET,
              })}
            >
              <Text
                weight={400}
                size={'22px'}
                color={'#FFFFFF'}
                className={styles.contentText}
              >
                Либо напишите нам
                <br />в Telegram
              </Text>
              <Button
                width={'258px'}
                weight={600}
                fontSize={'16px'}
                className={clsx(styles.button, {
                  [styles.buttonTablet]: view === EView.TABLET,
                })}
              >
                Написать в Telegram
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
