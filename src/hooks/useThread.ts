import { createThreadService, IThreadCreate } from "../services/threads";
import { useContext, useState } from "react";
import { UserContext } from "../contexts/User";
import toast from "react-hot-toast";

export const useThread = () => {
  const { user } = useContext(UserContext);
  const [createLoading, setCreateLoading] = useState(false);
  const createThread = async (
    threadTitle: IThreadCreate["threadTitle"],
    threadContent: IThreadCreate["threadContent"]
  ) => {
    try {
      setCreateLoading(true);
      if (user) {
        await createThreadService({
          userId: user.id,
          threadTitle,
          threadContent,
        });
      }
    } catch {
      toast.error("Error creating thread");
    } finally {
      setCreateLoading(false);
    }
  };

  return {
    createThread,
    createLoading,
  };
};
