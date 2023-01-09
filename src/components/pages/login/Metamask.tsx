import React from "react";
import Image from "next/image";
import metamask from "../../../../public/images/metamask.png";
import { useLogin } from "../../../hooks/useLogin";
import Loading from "../../global/Loading";

const Metamask = () => {
    const { login, loading } = useLogin();
    return (
        <button
            onClick={login}
            disabled={loading}
            className={`${
                loading ? "bg-zinc-500 cursor-not-allowed" : "bg-primary"
            } w-full rounded-lg flex
        transform items-center scale-100 justify-between h-[55px] gap-2 px-5 transition-all duration-300
        hover:brightness-110 cursor-pointer focus:outline-none focus:scale-90`}
        >
            {loading ? (
                <Loading size={25} />
            ) : (
                <>
                    <Image width={20} src={metamask} alt="metamask" />
                    <p className="text-white text-[12px] md:text-[15px]">
                        Login with <b>Metamask</b>
                    </p>
                </>
            )}
        </button>
    );
};

export default Metamask;
