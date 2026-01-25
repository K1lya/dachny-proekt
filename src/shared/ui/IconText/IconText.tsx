import type { FC, PropsWithChildren } from 'react';
import clsx from 'clsx';
import styles from './IconText.module.css';
import { Text } from '@/shared/ui/Text/Text.tsx';
import { EView, useView } from '@/shared/hooks/useView.ts';

interface IconTextProps {
  className?: string;
  icon: TSVGIcon;
  text: string;
  textSize?: string;
}

export const IconText: FC<PropsWithChildren<IconTextProps>> = (props) => {
  // consts
  const { className, text, textSize = '18px' } = props;
  const view = useView();
  return (
    <div className={clsx(styles.root, className)}>
      <div className={view === EView.MOBILE ? styles.icon : undefined}>
        <props.icon />
      </div>
      <Text
        weight={400}
        size={textSize}
        className={clsx(styles.text, { [styles.textMobile]: view === EView.MOBILE })}
      >
        {text}
      </Text>
    </div>
  );
};
