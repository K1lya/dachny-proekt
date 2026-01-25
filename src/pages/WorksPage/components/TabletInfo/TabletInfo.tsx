import styles from './TabletInfo.module.css';
import { Text } from '@/shared/ui/Text/Text.tsx';
import img from '@/shared/assets/icons/worksPage/img.png';

export const TabletInfo = () => {
  return (
    <div className={styles.root}>
      <div className={styles.image}>
        <img src={img} className={styles.img} />
        <Text size='23px' weight={500}>
          Все виды работ
          <br />с деревянными конструкциями
        </Text>
      </div>
      <div className={styles.titleContainer}>
        <div>
          <Text weight={400} size={'36px'} className={styles.title}>
            Услуги
          </Text>
          <div className={styles.border} />
        </div>
        <Text weight={500} size={'16px'} className={styles.infoText}>
          Выполняем полный спектр плотницких и столярных работ: монтаж, замена,
          обработка, утепление, отделка, антисептическая и противопожарная защита.
          <br />
          <br />
          Работаем с любыми деревянными элементами — стенами, перекрытиями, кровлей,
          полами и декоративными деталями.
        </Text>
      </div>
    </div>
  );
};
