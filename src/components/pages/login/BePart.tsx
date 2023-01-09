import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDiscord } from "@fortawesome/free-brands-svg-icons";

const BePart = () => {
    return (
        <button className="flex flex-col w-full mt-14 md:mt-36">
            <h2 className="text-white text-[20px] mb-5">
                Be part of our community
            </h2>
            <div
                className="bg-[#615EFF] fa-border border-zinc-700 w-full rounded-lg flex
        items-center justify-between h-[55px] gap-2 px-5 transition-all duration-300
        hover:brightness-110 cursor-pointer"
            >
                <FontAwesomeIcon icon={faDiscord} size="lg" color="#fff" />
                <p className="text-white text-[12px] md:text-[15px]">
                    <b>Join our discord</b>
                </p>
            </div>
        </button>
    );
};

export default BePart;
