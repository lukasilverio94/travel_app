import React, { createContext, useContext, useState } from "react";
import PropTypes from "prop-types";
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
AvatarProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
export const useAvatar = () => {
  return useContext(AvatarContext);
};
