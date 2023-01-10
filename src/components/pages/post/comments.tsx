import React from "react";
import Comment from "./comment";
import Loading from "../../global/Loading";
import { IComment } from "../../../services/threads/types";

interface Props {
    data: IComment[] | undefined;
    commentsLoading: boolean;
    commentsRefetching: boolean;
    setComments: React.Dispatch<React.SetStateAction<IComment[] | undefined>>;
}

const Comments = ({
    data,
    commentsLoading,
    commentsRefetching,
    setComments,
}: Props) => {
    return (
        <div className="flex flex-col gap-10">
            {commentsLoading || commentsRefetching ? (
                <Loading />
            ) : (
                data?.map(comment => (
                    <Comment
                        setComments={setComments}
                        comments={data}
                        key={comment.id}
                        comment={comment}
                    />
                ))
            )}
        </div>
    );
};

export default Comments;
