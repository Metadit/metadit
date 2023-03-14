import { ChangeEvent, useState } from "react";

interface InputValues {
    [name: string]: string;
}

interface InputFormResult {
    inputValues: InputValues;
    onChangeHandler: (e: ChangeEvent<HTMLInputElement>) => void;
    setInputValues: (values: InputValues) => void;
}

export const useInputForm = (inputNames: InputValues = {}): InputFormResult => {
    const [inputValues, setInputValues] = useState<InputValues>(inputNames);

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setInputValues({
            ...inputValues,
            [e.target.name]: e.target.value,
        });
    };

    return {
        inputValues,
        onChangeHandler,
        setInputValues,
    };
};
