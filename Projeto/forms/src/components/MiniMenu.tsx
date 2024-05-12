import React, { ReactNode, useState } from "react";
import { IconButton } from "./Button";
import { FaBars, FaXmark } from "react-icons/fa6";

interface Props {
  children: ReactNode;
}

const MiniMenu: React.FC<Props> = ({ children }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="relative w-full">
      <div
      onClick={toggleMenu}
        className={`p-4 flex flex-col justify-center z-10 transition-transform duration-300`}
      >
        {children}
      </div>
    </div>
  );
};

export default MiniMenu;
