import type { FC, PropsWithChildren } from 'react';
import clsx from 'clsx';
import styles from './ServicesPrice.module.css';
import { useHover } from '@/shared/hooks/useHover.ts';
import { Text } from '@/shared/ui/Text/Text.tsx';

interface ServicesPriceProps {
  className?: string;
  icon: TSVGIcon;
  title: string;
  price: string;
  circleWidth?: string;
}

export const ServicesPrice: FC<PropsWithChildren<ServicesPriceProps>> = (props) => {
  // consts
  const { className, circleWidth = '189px', price, title } = props;

  const { ref, hovered } = useHover<HTMLDivElement>();
  return (
    <div ref={ref} className={clsx(styles.root, className)}>
      <div className={styles.circleWrapper} style={{ width: circleWidth }}>
        <div
          className={clsx(styles.activeCircle, hovered && styles.activeCircleActive)}
        />
        <div className={styles.circle}>
          <div className={styles.icon}>{<props.icon />}</div>
        </div>
      </div>
      <div className={clsx(styles.content, hovered && styles.contentActive)}>
        <Text
          className={styles.title}
          weight={600}
          size={'21px'}
          color={hovered ? '#E85A4F' : '#121212'}
        >
          {title}
        </Text>
        <div className={styles.badge}>
          <Text weight={600} size='21px' color='#7B6A52'>
            от {price} ₽
          </Text>
        </div>
      </div>
    </div>
  );
};
