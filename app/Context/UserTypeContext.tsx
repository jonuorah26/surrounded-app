import { createContext, ReactNode, useContext, useState } from "react";

export type UserType = "participant" | "moderator" | "";

type UserTypeContextType = {
  userType: UserType;
  setUserType: (userType: UserType) => void;
};

const UserTypeContext = createContext<UserTypeContextType>({
  userType: "",
  setUserType: () => {},
});

const UserTypeProvider = ({ children }: { children: ReactNode }) => {
  const [userType, setUserType] = useState<UserType>("");

  return (
    <UserTypeContext.Provider value={{ userType, setUserType }}>
      {children}
    </UserTypeContext.Provider>
  );
};

const useUserTypeContext = () => {
  const context = useContext(UserTypeContext);
  return context;
};

export { UserTypeProvider, useUserTypeContext };
