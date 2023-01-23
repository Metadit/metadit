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
    activeModal: IModalIds | string;
    setActiveModal: Dispatch<SetStateAction<IModalIds | string>>;
}>({
    activeModal: "",
    setActiveModal: () => {},
});

export const useModal = () => useContext(ModalContext);
export const ModalProvider = ({ children }: { children: ReactNode }) => {
    const [activeModal, setActiveModal] = useState<IModalIds | string>("");
    return (
        <ModalContext.Provider value={{ activeModal, setActiveModal }}>
            {children}
        </ModalContext.Provider>
    );
};
