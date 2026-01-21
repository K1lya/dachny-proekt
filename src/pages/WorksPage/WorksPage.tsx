import styles from './WorksPage.module.css';
import { Text } from '@/shared/ui/Text/Text.tsx';
import { Button } from '@/shared/ui/Button/Button.tsx';
import img from '@/shared/assets/icons/worksPage/img.png';
import { works } from '@/shared/constants/worksPage/works.ts';
import { WorkCard } from '@/shared/ui/WorkCard/WorkCard.tsx';
import { useView } from '@/shared/hooks/useView.ts';

export const WorksPage = () => {
  // consts
  const view = useView();
  return (
    <section className={styles.root}>
      <div className={styles.info}>
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
      <div className={styles.works}>
        {works.map((work) => (
          <WorkCard key={work.title} {...work} view={view} />
        ))}
      </div>
    </section>
  );
};
