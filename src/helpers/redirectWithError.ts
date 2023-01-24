import router from "next/router";
import toast from "react-hot-toast";

const redirectWithError = (message: string, path: string) => {
    return router.push(path).then(() => {
        toast.error(message);
    });
};

export default redirectWithError;
