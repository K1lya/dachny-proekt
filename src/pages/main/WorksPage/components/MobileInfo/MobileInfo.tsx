import clsx from 'clsx';
import styles from './MobileInfo.module.css';
import { Text } from '@/shared/ui/Text/Text.tsx';
import img from '@/shared/assets/icons/worksPage/imgMobile.png';

export const MobileInfo = () => {
  return (
    <div className={clsx(styles.root)}>
      <div>
        <Text weight={400} size={'24px'} className={styles.title}>
          Услуги
        </Text>
        <div className={styles.border} />
      </div>
      <div className={styles.title}>
        <img src={img} />
        <Text size={'16px'} weight={500}>
          Все виды работ с деревянными конструкциями
        </Text>
      </div>
      <Text size={'12px'} className={styles.text}>
        Выполняем полный спектр плотницких и столярных работ: монтаж, замена,
        обработка, утепление, отделка, антисептическая и противопожарная защита.
        <br /> <br />
        Работаем с любыми деревянными элементами — стенами, перекрытиями, кровлей,
        полами и декоративными деталями.
      </Text>
    </div>
  );
};
