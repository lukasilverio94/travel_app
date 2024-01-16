// ThemeBtn.jsx
import React, { useState } from "react";
import classNames from "classnames";
import { ThemeContext } from "../context/ThemeContext";

export default function ThemeBtn() {
  const { themeMode, darkTheme, lightTheme } = React.useContext(ThemeContext);
  const [isSelected, setIsSelected] = useState(false);

  const onChangeBtn = () => {
    setIsSelected(!isSelected);
    isSelected ? lightTheme() : darkTheme();
  };

  return (
    <div
      onClick={onChangeBtn}
      checked={themeMode === "dark"}
      className={classNames(
        "flex  w-12 h-6 bg-gray-600 rounded-full transition-all duration-500",
        {
          "bg-green-500": isSelected,
        }
      )}
    >
      <span
        className={classNames(
          "cursor-pointer w-6 h-6 bg-white shadow-lg rounded-full transition-all duration-500",
          {
            "ml-6": isSelected,
          }
        )}
      ></span>
    </div>
  );
}
