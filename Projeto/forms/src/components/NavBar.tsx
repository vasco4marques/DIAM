import React from "react";
import { useNavigate } from "react-router-dom";
import { logout } from "../services/AuthService";

const NavBar: React.FC = () => {
  const navigate = useNavigate();

  async function handleLogout() {
    await logout()
    navigate('/login');
  }

  const isHome = window.location.pathname === '/forms' || window.location.pathname === '/home';

  return (
    <div className="absolute top-0 left-0 flex flex-row items-center px-[8vw] z-[50] justify-between w-full h-[5rem] py-4">
      <button className="text-xl p-2 px-6 text-black bg-blue-500 rounded-md bg-white hover:bg-[#ddd] transition-all duration-300" onClick={() => !isHome ? navigate(-1) : null}>
        {isHome ? 'DIAM: Dynamic Forms' : '← Go Back'}
      </button>

      <div className="flex flex-row gap-x-4">
        <a className="text-xl p-2 px-6 text-black bg-blue-500 rounded-md bg-white hover:bg-[#ddd] transition-all duration-300" href="/forms">
          Home
        </a>
        <button className="text-xl p-2 px-6 text-black bg-blue-500 rounded-md bg-white hover:bg-[#ddd] transition-all duration-300" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default NavBar;