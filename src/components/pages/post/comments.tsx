import React, { useEffect } from "react";
import Comment from "./comment";
import { IComment } from "../../../services/threads";
import Loading from "../../global/Loading";

interface Props {
  data: IComment[] | undefined;
  commentsLoading: boolean;
  commentsRefetching: boolean;
}

const Comments = ({ data, commentsLoading, commentsRefetching }: Props) => {
  const [commentsData, setCommentsData] = React.useState<IComment[]>([]);
  useEffect(() => {
    if (data) {
      setCommentsData(data);
    }
  }, [data]);
  return (
    <div className="flex flex-col gap-10">
      {commentsLoading || commentsRefetching ? (
        <Loading />
      ) : (
        commentsData?.map((comment) => (
          <Comment
            comments={commentsData}
            setComments={setCommentsData}
            key={comment.id}
            comment={comment}
          />
        ))
      )}
    </div>
  );
};

export default Comments;
