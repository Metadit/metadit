import { getAuthenticatedRequest } from "../requests"

export const getUserService = async () => {
    return await getAuthenticatedRequest("user/data")
}
