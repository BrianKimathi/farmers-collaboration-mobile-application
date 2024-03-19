import { createContext, useState } from "react";

const UserType = createContext();

const UserContext = ({ children }) => {
  const [userId, setUserId] = useState("");
  const [userName, setUserName] = useState("");
  const [businessId, setBusinessId] = useState("");
  const [isExpert, setIsExpert] = useState(false); // Example boolean value
  const [hasBusiness, setHasBusiness] = useState(false); // Example boolean value

  return (
    <UserType.Provider
      value={{
        userId,
        setUserId,
        userName,
        setUserName,
        isExpert,
        setIsExpert,
        hasBusiness,
        setHasBusiness,
        businessId,
        setBusinessId,
      }}>
      {children}
    </UserType.Provider>
  );
};

export { UserType, UserContext };
