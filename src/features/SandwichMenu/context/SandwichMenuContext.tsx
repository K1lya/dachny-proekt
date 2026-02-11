import React, { createContext, useContext, useMemo, useState } from 'react';

type SandwichMenuContextValue = {
  isOpen: boolean;
  open: () => void;
  close: () => void;
  toggle: () => void;
};

const SandwichMenuContext = createContext<SandwichMenuContextValue | null>(null);

export const SandwichMenuContextProvider = ({
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
    <SandwichMenuContext.Provider value={value}>
      {children}
    </SandwichMenuContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useSandwichMenuModal = () => {
  const ctx = useContext(SandwichMenuContext);
  if (!ctx)
    throw new Error('useSandwichMenu must be used within <SandwichMenuProvider>');
  return ctx;
};
