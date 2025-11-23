import WoodenIcon from '@/shared/assets/icons/secondPage/wooden.svg?react';
import EcoIcon from '@/shared/assets/icons/secondPage/eco.svg?react';
import IndIcon from '@/shared/assets/icons/secondPage/ind.svg?react';
import FastIcon from '@/shared/assets/icons/secondPage/fast.svg?react';
import KonkurIcon from '@/shared/assets/icons/secondPage/konkur.svg?react';
import PolnIcon from '@/shared/assets/icons/secondPage/poln_cykl.svg?react';

export interface ISecondPageIcons {
  icon: TSVGIcon;
  text: string;
}

export const topIcons = [
  {
    icon: WoodenIcon,
    text: 'Узкая специализация —\nдеревянное строительство',
  },
  {
    icon: PolnIcon,
    text: 'Полный цикл работ',
  },
  {
    icon: KonkurIcon,
    text: 'Конкурентные цены',
  },
  {
    icon: FastIcon,
    text: 'Быстрое принятие решений\nи контроль качества',
  },
  {
    icon: IndIcon,
    text: 'Индивидуальный подход',
  },
  {
    icon: EcoIcon,
    text: 'Экологичность и \nтрадиции',
  },
];
