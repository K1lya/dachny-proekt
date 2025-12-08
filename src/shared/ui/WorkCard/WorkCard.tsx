import React from 'react';
import styles from './WorkCard.module.css';
import { Text } from '@/shared/ui/Text/Text.tsx';

interface InfoBlockProps {
  title: string;
  text: string;
  icon: TSVGIcon;
}

export const WorkCard: React.FC<InfoBlockProps> = (props) => {
  const { title, text } = props;
  return (
    <div className={styles.block}>
      <div className={styles.ellipse} />
      <span className={styles.border} />
      <div className={styles.icon}>
        <props.icon />
      </div>
      <Text className={styles.title} weight={700} size={'24px'}>
        {title}
      </Text>
      <Text className={styles.text} size={'16px'}>
        {text}
      </Text>
    </div>
  );
};
