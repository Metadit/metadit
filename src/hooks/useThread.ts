import {
    createThreadService,
    postCommentVoteService,
    postVoteService,
} from "../services/threads"
import { useContext, useState } from "react"
import { UserContext } from "../contexts/User"
import toast from "react-hot-toast"
import { useRouter } from "next/router"
import { ICommentVote, IThreadCreate, IVote } from "../services/threads/types"
import redirectWithError from "../helpers/redirectWithError"

export const useThread = () => {
    const { user } = useContext(UserContext)
    const [createLoading, setCreateLoading] = useState(false)
    const router = useRouter()

    const commentVoteHandler = async (
        args: ICommentVote,
        direction: string
    ) => {
        if (!user) {
            await redirectWithError(
                "You must be logged in to vote",
                "/login",
                router
            )
        }
        try {
            await postCommentVoteService({
                userId: args.userId as number,
                commentId: args.commentId as number,
                threadId: args.threadId as number,
                currentUserVote: args.currentUserVote,
                vote: args.vote,
                direction: direction,
            })
        } catch (error) {
            toast.error("Error voting")
        }
    }
    const voteHandler = async (args: IVote, direction: string) => {
        if (!user) {
            await redirectWithError(
                "You must be logged in to vote",
                "/login",
                router
            )
        }
        try {
            await postVoteService({
                userId: args.userId as number,
                threadId: args.threadId as number,
                currentUserVote: args.currentUserVote,
                vote: args.vote,
                direction: direction,
            })
        } catch (error) {
            toast.error("Error voting")
        }
    }
    const createThread = async (
        threadTitle: IThreadCreate["threadTitle"],
        threadContent: IThreadCreate["threadContent"]
    ) => {
        try {
            setCreateLoading(true)
            if (user) {
                const { id } = await createThreadService({
                    userId: user.id,
                    threadTitle,
                    threadContent,
                })
                return id
            }
        } catch {
            toast.error("Error creating thread")
        } finally {
            setCreateLoading(false)
        }
    }

    return {
        createThread,
        createLoading,
        voteHandler,
        commentVoteHandler,
    }
}
