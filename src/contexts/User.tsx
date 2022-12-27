import React, {
  createContext,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";

interface Props {
  children: React.ReactNode;
}

export const UserContext = createContext<{
  user: null | { address: string };
  setUser: React.Dispatch<SetStateAction<any>>;
  loading: boolean | null;
}>({
  user: null,
  setUser: () => {},
  loading: null,
});
export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }: Props) => {
  const [user, setUser] = useState<{ address: string } | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    if (loading) {
      const userLocalStorage = JSON.parse(
        localStorage.getItem("metadit") as string
      );
      const userData = userLocalStorage
        ? { address: userLocalStorage.address }
        : null;
      setUser(userData);
      setLoading(false);
    }
  }, [loading]);
  return (
    <UserContext.Provider value={{ user, setUser, loading }}>
      {children}
    </UserContext.Provider>
  );
};
