import React from "react";

enum InputTypes {
  text = "text",
  number = "number",
  email = "email",
  password = "password",
}

interface Props {
  type: keyof typeof InputTypes;
  className?: string;
  onFocus?: (e?: any) => void;
  onBlur?: (e?: any) => void;
  onChange: (e?: any) => void;
  value: string;
  name: string;
  placeholder?: string;
}

const Input = ({
  type,
  className,
  onFocus,
  onBlur,
  value,
  name,
  onChange,
  placeholder,
}: Props) => {
  return (
    <input
      name={name}
      className={`text-[12px] bg-darkContent text-white resize-none
          transition-all duration-200 p-2 border border-zinc-800 w-full
          rounded-md focus:outline-0 focus:border-primary ${className}`}
      type={type}
      onFocus={onFocus}
      onBlur={onBlur}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
    />
  );
};

export default Input;
