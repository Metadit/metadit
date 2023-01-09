import React from "react";

interface Props {
    className?: string;
    onFocus?: (e?: any) => void;
    onBlur?: (e?: any) => void;
    onChange: (e?: any) => void;
    value: string;
    name?: string;
    placeholder?: string;
    rows?: number;
}

const TextAreaBox = ({
    className,
    onFocus,
    onBlur,
    value,
    name,
    onChange,
    placeholder,
    rows,
}: Props) => {
    return (
        <textarea
            name={name}
            className={`text-[12px] bg-darkContent text-white resize-none
          transition-all duration-200 p-5 border border-zinc-800 w-full
          rounded-md focus:outline-0 focus:border-primary ${className}`}
            onFocus={onFocus}
            onBlur={onBlur}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            rows={rows}
        />
    );
};

export default TextAreaBox;
