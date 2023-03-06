import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWallet } from "@fortawesome/free-solid-svg-icons";
import { useLogin } from "../../../hooks/useLogin";
import Loading from "../../global/Loading";

interface Props {
    isInstalled: boolean;
}

const Coinbase = ({ isInstalled }: Props) => {
    const [buttonClicked, setButtonClicked] = useState(false);
    const { login, loading } = useLogin();
    useEffect(() => {
        let timeout: NodeJS.Timeout;
        if (buttonClicked && !isInstalled) {
            timeout = setTimeout(() => {
                setButtonClicked(false);
            }, 2000);
        }
        return () => clearTimeout(timeout);
    }, [isInstalled, buttonClicked]);
    const buttonHandler = () => {
        if (!isInstalled) {
            setButtonClicked(true);
        } else {
            login();
        }
    };
    return (
        <>
            <button
                onClick={buttonHandler}
                disabled={loading}
                className={`${
                    loading
                        ? "bg-zinc-800 border border-zinc-600 cursor-not-allowed"
                        : "bg-blue-900 fa-border border-blue-600"
                } w-full rounded-lg flex
        items-center relative justify-between h-[55px] gap-2 px-5 transition-all duration-300
        hover:brightness-110 cursor-pointer focus:outline-none focus:scale-90`}
            >
                {loading ? (
                    <Loading size={25} />
                ) : (
                    <>
                        <FontAwesomeIcon
                            icon={faWallet}
                            size="lg"
                            color="#fff"
                        />
                        <p className="text-white text-[12px] md:text-[15px]">
                            Login with <b>Coinbase wallet</b>
                        </p>
                    </>
                )}
            </button>
            {buttonClicked && !isInstalled && (
                <p className="text-red-500 mx-auto text-[12px]">
                    Please install the Coinbase wallet extension for your
                    browser and refresh the page
                </p>
            )}
        </>
    );
};

export default Coinbase;
