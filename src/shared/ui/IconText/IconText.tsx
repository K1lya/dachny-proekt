import type { FC, PropsWithChildren } from 'react';
import clsx from 'clsx';
import styles from './IconText.module.css';
import { Text } from '@/shared/ui/Text/Text.tsx';

interface IconTextProps {
  className?: string;
  icon: TSVGIcon;
  text: string;
}

export const IconText: FC<PropsWithChildren<IconTextProps>> = (props) => {
  // consts
  const { className, text } = props;
  return (
    <div className={clsx(styles.root, className)}>
      <div>
        <props.icon />
      </div>
      <Text weight={400} size='18px' className={styles.text}>
        {text}
      </Text>
    </div>
  );
};
