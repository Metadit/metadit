import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from "react";
import { IModalIds } from "../types/modal";

export const ModalContext = createContext<{
  activeModal: keyof IModalIds | null;
  setActiveModal: Dispatch<SetStateAction<keyof IModalIds | null>>;
}>({
  activeModal: null,
  setActiveModal: () => {},
});

export const useModal = () => useContext(ModalContext);
export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [activeModal, setActiveModal] = useState<keyof IModalIds | null>(null);
  return (
    <ModalContext.Provider value={{ activeModal, setActiveModal }}>
      {children}
    </ModalContext.Provider>
  );
};
