import React from "react"
import { IUserActivity } from "../../../services/profile"
import Link from "next/link"

interface Props {
    data: IUserActivity | undefined
}

const ActivityRecord = ({ data }: Props) => {
    return (
        <div className="w-full mx-auto rounded p-4 bg-darkContent border border-zinc-800 mb-2 text-center">
            <Link
                href={`/post/${data?.threadid}`}
                className="text-white text-sm"
            >
                Commented on thread{" "}
                <span className="text-primary font-bold transition-all duration-200 hover:brightness-125 cursor-pointer">
                    {data?.threadtitle}
                </span>
            </Link>
        </div>
    )
}

export default ActivityRecord
