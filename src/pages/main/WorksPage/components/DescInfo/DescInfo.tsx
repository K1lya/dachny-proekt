import styles from './DescInfo.module.css';
import { Button } from '@/shared/ui/Button/Button.tsx';
import { Text } from '@/shared/ui/Text/Text.tsx';
import img from '@/shared/assets/icons/worksPage/img.png';

export const DescInfo = () => {
  return (
    <div className={styles.root}>
      <div>
        <Text weight={400} size={'56px'}>
          Услуги
        </Text>
        <div className={styles.border} />
      </div>
      <Text weight={500} size={'31px'} className={styles.infoText}>
        Все виды работ
        <br />с деревянными <br />
        конструкциями
      </Text>
      <Text weight={500} size={'19px'} className={styles.infoText}>
        Выполняем полный спектр плотницких и столярных работ: монтаж, замена,
        обработка, утепление, отделка, антисептическая и противопожарная защита.
        Работаем с любыми деревянными элементами — стенами, перекрытиями, кровлей,
        полами и декоративными деталями.
      </Text>
      <div className={styles.buttonContainer}>
        <div className={styles.image}>
          <img src={img} className={styles.img} />
        </div>
        <Button
          width={'322px'}
          weight={600}
          height={'61px'}
          fontSize={'19px'}
          className={styles.button}
        >
          ОСТАВИТЬ ЗАЯВКУ
        </Button>
      </div>
    </div>
  );
};
