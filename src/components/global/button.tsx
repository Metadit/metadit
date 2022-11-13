import React from "react";

interface Props {
  children: React.ReactNode;
  normal: boolean;
  className?: string;
}

const Button = ({ normal, children, className }: Props) => {
  return (
    <button
      className={`w-auto h-[32px] ${
        normal && "bg-zinc-800 border border-zinc-700"
      } text-white text-[13px] transition-all px-7 rounded-md hover:transition-all 
      hover:duration-200 hover:brightness-125 ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
