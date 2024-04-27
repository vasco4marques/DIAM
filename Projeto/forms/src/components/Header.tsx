import React from "react";
import { useNavigate } from "react-router-dom";

const Header = ({ isLogged }: { isLogged: boolean }) => {

  const navigate = useNavigate();

  const isHome = window.location.pathname === '/' || window.location.pathname === '/home';

  return (
    <div className="absolute top-0 left-0 flex flex-row items-center px-[8vw] z-[50] justify-between w-full h-32 py-4">
      <button className="text-xl p-2 px-6 text-black bg-blue-500 rounded-md bg-white hover:bg-[#ddd] transition-all duration-300" onClick={() => !isHome ? navigate(-1) : null}>
        {isHome ? 'DIAM: Dynamic Forms' : '← Go Back'}
      </button>
      {
        !isLogged ?
          <div className="flex flex-row gap-x-4">
            <a className="text-xl p-2 px-6 text-black bg-blue-500 rounded-md bg-white hover:bg-[#ddd] transition-all duration-300" href="/login">
              Login
            </a>
            <a className="text-xl p-2 px-6 text-black bg-blue-500 rounded-md bg-white hover:bg-[#ddd] transition-all duration-300" href="/register">
              Register
            </a>
          </div>
          :
          <div className="flex flex-row gap-x-4">
            <a className="text-xl p-2 px-6 text-black bg-blue-500 rounded-md bg-white hover:bg-[#ddd] transition-all duration-300" href="/home">
              Home
            </a>
            <a className="text-xl p-2 px-6 text-black bg-blue-500 rounded-md bg-white hover:bg-[#ddd] transition-all duration-300" href="/logout">
              Logout
            </a>
          </div>
      }
    </div>
  );
};

export default Header;
