import type { FC, PropsWithChildren } from 'react';
import clsx from 'clsx';
import styles from './PutBidPage.module.css';
import { Text } from '@/shared/ui/Text/Text.tsx';
import { EView, useView } from '@/shared/hooks/useView.ts';
import { Button } from '@/shared/ui/Button/Button.tsx';

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
        { [styles.rootMobile]: view === EView.MOBILE },
        className,
      )}
    >
      <div
        className={clsx(styles.image, {
          [styles.imageTablet]: view === EView.TABLET,
          [styles.imageMobile]: view === EView.MOBILE,
        })}
      >
        <div
          className={clsx(styles.content, {
            [styles.contentTable]: view === EView.TABLET,
            [styles.contentMobile]: view === EView.MOBILE,
          })}
        >
          <div className={styles.text}>
            <Text
              weight={400}
              size={
                view === EView.TABLET
                  ? '56px'
                  : view === EView.MOBILE
                    ? '29px'
                    : '102px'
              }
              color={'#FFFFFF'}
            >
              ОСТАВИТЬ
            </Text>
            <Text
              weight={400}
              size={
                view === EView.TABLET
                  ? '56px'
                  : view === EView.MOBILE
                    ? '29px'
                    : '102px'
              }
              color={'#E85A4F'}
            >
              ЗАЯВКУ
            </Text>
          </div>
          {view !== EView.MOBILE && (
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
          )}
          {view === EView.MOBILE && (
            <div className={styles.buttonContainerMobile}>
              <Button width={'280px'} height={'42px'} fontSize={'12px'}>
                ЗАКАЗАТЬ ЗВОНОК
              </Button>
              <Button width={'280px'} height={'42px'} fontSize={'12px'}>
                НАПИСАТЬ В TELEGRAM
              </Button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
