import React from "react";

interface Props {
  children: React.ReactNode;
  normal: boolean;
  className?: string;
  disabled?: boolean;
}

const Button = ({ normal, children, className, disabled }: Props) => {
  return (
    <button
      disabled={disabled}
      className={`h-[32px] font-bold gap-1 flex items-center justify-center ${
        normal && "bg-zinc-800 border border-zinc-700 relative"
      } text-white text-[12px] transition-all px-7 rounded-md hover:transition-all 
      hover:duration-200 hover:brightness-125 ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
