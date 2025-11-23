export interface IHeaderLink {
  name: string;
  link: string;
}

export const headerLinks: IHeaderLink[] = [
  {
    name: 'Наши работы',
    link: '/works',
  },
  {
    name: 'Этапы работы',
    link: '/stages',
  },
  {
    name: 'Ипотека',
    link: '/mortgage',
  },
  {
    name: 'Отзывы',
    link: '/reviews',
  },
  {
    name: 'Контакты',
    link: '/contacts',
  },
];
