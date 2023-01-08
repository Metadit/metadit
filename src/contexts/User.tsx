import React, {
  createContext,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import { IUserAuthTokenDecoded, IUserLocalStorage } from "../types/user";
import jwt_decode from "jwt-decode";
import Loading from "../components/global/Loading";

interface Props {
  children: React.ReactNode;
}

export const UserContext = createContext<{
  user: null | IUserLocalStorage;
  setUser: React.Dispatch<SetStateAction<any>>;
  loading: boolean | null;
}>({
  user: null,
  setUser: () => {},
  loading: null,
});
export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }: Props) => {
  const [user, setUser] = useState<IUserLocalStorage | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    if (loading) {
      const userLocalStorage: IUserLocalStorage = JSON.parse(
        localStorage.getItem("metadit") as string
      );
      const userAuthToken: IUserAuthTokenDecoded =
        userLocalStorage && jwt_decode(userLocalStorage.token);
      if (userAuthToken) {
        const now = new Date().getTime();
        const exp = userAuthToken.exp * 1000;
        const didTokenExpire = now > exp;
        if (didTokenExpire) {
          localStorage.removeItem("metadit");
          setUser(null);
        }
      }
      const userData = userLocalStorage ? userLocalStorage : null;
      setUser(userData);
      setLoading(false);
    }
  }, [loading]);
  return (
    <UserContext.Provider value={{ user, setUser, loading }}>
      {loading ? (
        <div className="w-full h-full absolute flex items-center justify-center">
          <Loading size={45} />
        </div>
      ) : (
        children
      )}
    </UserContext.Provider>
  );
};
