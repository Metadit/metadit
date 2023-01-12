import { ChangeEvent, useState } from "react";

export const useInputForm = (inputNames: { [name: string]: string }) => {
    const [inputValues, setInputValues] = useState(inputNames);

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setInputValues({ ...inputValues, [e.target.name]: e.target.value });
    };

    return {
        inputValues,
        onChangeHandler,
        setInputValues,
    };
};
