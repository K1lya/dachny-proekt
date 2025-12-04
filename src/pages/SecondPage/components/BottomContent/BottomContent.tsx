import type { FC, PropsWithChildren } from 'react';
import clsx from 'clsx';
import styles from './BottomContent.module.css';
import { services } from '@/shared/constants/secondPage/services.ts';
import { ServicesPrice } from '@/shared/ui/ServicesPrice/ServicesPrice.tsx';

interface BottomContentProps {
  className?: string;
}

export const BottomContent: FC<PropsWithChildren<BottomContentProps>> = (props) => {
  // consts
  const { className } = props;
  return (
    <div className={clsx(styles.root, className)}>
      {services.map((service) => (
        <ServicesPrice
          key={service.title}
          icon={service.icon}
          title={service.title}
          price={service.price}
        />
      ))}
    </div>
  );
};
