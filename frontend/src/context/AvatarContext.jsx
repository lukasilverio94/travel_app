  import { createContext, useContext, useState } from "react";

  const AvatarContext = createContext();

  export const AvatarProvider = ({ children }) => {
    const [avatar, setAvatar] = useState(null);

    const updateAvatar = (newAvatar) => {
      setAvatar(newAvatar);
    };

    return (
      <AvatarContext.Provider value={{ avatar, updateAvatar }}>
        {children}
      </AvatarContext.Provider>
    );
  };

  export const useAvatar = () => {
    const context = useContext(AvatarContext);
    if (!context) {
      throw new Error("useAvatar must be used within an AvatarProvider");
    }
    return context;
  };
