import type { FC, PropsWithChildren } from 'react';
import { Text } from '@/shared/ui/Text/Text.tsx';
import { EView, useView } from '@/shared/hooks/useView.ts';

export interface IMainTitleProps {
  text: string;
}

export const MainTitle: FC<PropsWithChildren<IMainTitleProps>> = (props) => {
  // consts
  const { text } = props;
  const view = useView();
  const size =
    view === EView.DESC ? '47px' : view === EView.TABLET ? '47px' : '24px';
  return (
    <div className={'serviceContainer'}>
      <Text size={size} weight={700}>
        {text}
      </Text>
    </div>
  );
};
