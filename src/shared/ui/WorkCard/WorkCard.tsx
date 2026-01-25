import React, { memo, useState } from 'react';
import clsx from 'clsx';
import styles from './WorkCard.module.css';
import { Text } from '@/shared/ui/Text/Text.tsx';
import { EView } from '@/shared/hooks/useView';

interface WorkCardProps {
  title: string;
  text: string;
  icon: TSVGIcon;
  view?: EView;
}

const Chevron = ({ isOpen }: { isOpen: boolean }) => (
  <svg
    className={clsx(styles.chevron, isOpen && styles.chevronOpen)}
    width='19'
    height='12'
    viewBox='0 0 19 12'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
  >
    <path
      d='M1.06067 1.06055L9.06067 9.06055L17.0607 1.06055'
      stroke='#E85A4F'
      stroke-width='3'
    />
  </svg>
);

export const WorkCard: React.FC<WorkCardProps> = memo(
  ({ title, text, icon: Icon, view = EView.DESC }) => {
    const isCompact = view === EView.TABLET || view === EView.MOBILE;

    const [isOpen, setIsOpen] = useState(false);

    const onToggle = (e: React.SyntheticEvent) => {
      e.stopPropagation();
      e.preventDefault();

      setIsOpen((prev) => !prev);
    };

    return (
      <div className={clsx(styles.block, isCompact && styles.blockTablet)}>
        <div className={styles.ellipse} />
        <span className={styles.border} />

        <div className={styles.icon}>
          <Icon />
        </div>

        <Text
          className={clsx(styles.title, {
            [styles.titleTablet]: view === EView.TABLET,
          })}
          weight={700}
          size={`${view === EView.DESC ? 24 : 22}px`}
        >
          {title}
        </Text>

        {/* кнопка только для TABLET/MOBILE */}
        {isCompact && (
          <button type='button' className={styles.toggleBtn} onClick={onToggle}>
            <Chevron isOpen={isOpen} />
          </button>
        )}

        {/* ===== НИЖНЯЯ ЧАСТЬ ===== */}
        {!isCompact && (
          <div className={styles.textWrap}>
            <Text className={styles.text} size='16px'>
              {text}
            </Text>
          </div>
        )}

        {isCompact && isOpen && (
          <div
            style={{ display: isOpen ? 'inline' : 'none' }}
            className={clsx(styles.textWrap, styles.textWrapCompact)}
          >
            <Text className={styles.text} size='16px'>
              {text}
            </Text>
          </div>
        )}
      </div>
    );
  },
);
