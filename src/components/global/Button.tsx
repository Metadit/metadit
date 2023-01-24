import React from "react";
import Loading from "./Loading";

interface Props {
    children: React.ReactNode;
    normal: boolean;
    className?: string;
    disabled?: boolean;
    onClick?: () => void;
    loading?: boolean;
}

const Button = ({
    normal,
    children,
    className,
    disabled,
    onClick,
    loading,
}: Props) => {
    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className={`${className} h-[32px] font-bold gap-1 flex items-center justify-center transition-all duration-200 ${
                disabled && "!bg-zinc-700 !border-zinc-600 cursor-not-allowed"
            } 
             ${loading && "bg-zinc-700 !cursor-not-allowed border-zinc-600"}
            ${
                normal && "bg-zinc-800 border border-zinc-700 relative"
            } text-white text-[12px] px-5 rounded-md
      hover:brightness-125 `}
        >
            {loading ? <Loading noAbsolute={true} size={20} /> : children}
        </button>
    );
};

export default Button;
