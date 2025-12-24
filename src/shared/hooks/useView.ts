import { useLayoutEffect, useState } from 'react';

export enum EView {
  DESC = 'DESK',
  TABLET = 'TABLET',
  MOBILE = 'MOBILE',
}

export const useView = () => {
  const getView = () => {
    const width = window.innerWidth;

    if (width > 1299) return EView.DESC;
    if (width > 767) return EView.TABLET;
    return EView.MOBILE;
  };

  const [view, setView] = useState<EView>(getView());

  useLayoutEffect(() => {
    const onResize = () => {
      setView(getView());
    };

    window.addEventListener('resize', onResize);

    return () => window.removeEventListener('resize', onResize);
  }, []);

  return view;
};
