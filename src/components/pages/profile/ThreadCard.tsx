import React from "react";
import Button from "../../global/Button";
import parse from "html-react-parser";
import Link from "next/link";
import { IUserThreads } from "../../../services/profile/types";

interface Props {
    thread: IUserThreads;
}

const ThreadCard = ({ thread }: Props) => {
    const removeImagesFromThreadContent = () => {
        const regex = /<img[^>]*>/g;
        return thread.threadcontent.replace(regex, "");
    };

    return (
        <div className="w-full border rounded rounded-xl border-zinc-800 p-4 text-center h-[250px] overflow-hidden">
            <div className="flex flex-col h-full justify-between">
                <div>
                    <h1 className="text-white font-bold text-[18px]">
                        {thread.threadtitle}
                    </h1>
                    <div className="text-content text-sm leading-6 h-[150px] overflow-x-hidden overflow-y-auto">
                        {parse(removeImagesFromThreadContent())}
                    </div>
                </div>
                <Link href={`/post/${thread.threadid}`}>
                    <Button
                        normal={false}
                        className="bg-primaryDark border border-primary w-[30%] mx-auto mt-2"
                    >
                        View
                    </Button>
                </Link>
            </div>
        </div>
    );
};

export default ThreadCard;
