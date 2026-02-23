import React, { createContext, useContext, useMemo, useState } from 'react';

type QuestionsFormContextValue = {
  isOpen: boolean;
  open: () => void;
  close: () => void;
  toggle: () => void;
};

const QuestionsFormContext = createContext<QuestionsFormContextValue | null>(null);

export const QuestionsFormContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);
  const toggle = () => setIsOpen((v) => !v);

  const value = useMemo(() => ({ isOpen, open, close, toggle }), [isOpen]);

  return (
    <QuestionsFormContext.Provider value={value}>
      {children}
    </QuestionsFormContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useQuestionsFormModal = () => {
  const ctx = useContext(QuestionsFormContext);
  if (!ctx)
    throw new Error('useSandwichMenu must be used within <SandwichMenuProvider>');
  return ctx;
};
