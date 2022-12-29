import { postAuthenticatedRequest } from "../requests";

export interface IThreadCreate {
  userId: number;
  threadTitle: string;
  threadContent: string;
}

export const createThreadService = async (body: IThreadCreate) => {
  return await postAuthenticatedRequest("threads/create", body);
};
