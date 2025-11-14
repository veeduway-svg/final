import { createContext, useContext, useState, ReactNode } from 'react';

interface ProblemModalState {
  open: (opts?: { problem?: string }) => void;
  close: () => void;
}

interface ModalProps {
  isOpen: boolean;
  selectedProblem?: string;
}

const ProblemModalContext = createContext<ProblemModalState>({
  open: () => {},
  close: () => {},
});

export const useProblemModal = () => {
  const context = useContext(ProblemModalContext);
  if (!context) {
    throw new Error('useProblemModal must be used within ProblemModalProvider');
  }
  return context;
};

interface ProblemModalProviderProps {
  children: ReactNode;
  modalComponent: (props: ModalProps & { onClose: () => void }) => JSX.Element;
}

export const ProblemModalProvider = ({ children, modalComponent: ModalComponent }: ProblemModalProviderProps) => {
  const [modalProps, setModalProps] = useState<ModalProps>({
    isOpen: false,
    selectedProblem: undefined,
  });

  const open = (opts?: { problem?: string }) => {
    setModalProps({
      isOpen: true,
      selectedProblem: opts?.problem,
    });
  };

  const close = () => {
    setModalProps({
      isOpen: false,
      selectedProblem: undefined,
    });
  };

  return (
    <ProblemModalContext.Provider value={{ open, close }}>
      {children}
      <ModalComponent {...modalProps} onClose={close} />
    </ProblemModalContext.Provider>
  );
};
