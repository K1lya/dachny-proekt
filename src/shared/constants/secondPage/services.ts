import rekonst from '@/shared/assets/icons/secondPage/rekonst.svg?react';
import dacha from '@/shared/assets/icons/secondPage/dacha.svg?react';
import besed from '@/shared/assets/icons/secondPage/besed.svg?react';
import prist from '@/shared/assets/icons/secondPage/prist.svg?react';

export interface IServices {
  icon: TSVGIcon;
  title: string;
  price: string;
}

export const services: IServices[] = [
  {
    icon: dacha,
    title: 'Строительство дачных домов',
    price: '12 000 000',
  },
  {
    icon: prist,
    title: 'Строительство пристроек',
    price: '12 000 000',
  },
  {
    icon: besed,
    title: 'Строительство беседок',
    price: '12 000 000',
  },
  {
    icon: rekonst,
    title: 'Реконструкция деревянных конструкций',
    price: '12 000 000',
  },
];
