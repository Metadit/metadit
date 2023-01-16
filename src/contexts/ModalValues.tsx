import {
    createContext,
    Dispatch,
    ReactNode,
    SetStateAction,
    useContext,
    useState,
} from "react";

export const modalValuesContext = createContext<{
    modalValues: any;
    setModalValues: Dispatch<SetStateAction<any>>;
}>({
    modalValues: {},
    setModalValues: () => {},
});
export const useModalValues = () => useContext(modalValuesContext);
export const ModalValuesProvider = ({ children }: { children: ReactNode }) => {
    const [modalValues, setModalValues] = useState<any>({});
    return (
        <modalValuesContext.Provider value={{ modalValues, setModalValues }}>
            {children}
        </modalValuesContext.Provider>
    );
};
