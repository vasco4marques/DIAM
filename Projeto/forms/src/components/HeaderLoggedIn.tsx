import React from "react";

const HeaderLoggedIn = () => {
  return (
    <div className="h-32  p-4 flex flex-row justify-between items-center">
      <a href="/">
        <h1 className="text-4xl font-semibold">DIAM Form Sharing Website</h1>
      </a>
      <div className="flex flex-row gap-x-4">
        <a href="/login">
          <h1 className="text-xl py-2 px-4 bg-slate-50 rounded-xl">Your profile</h1>
        </a>
       
      </div>
    </div>
  );
};

export default HeaderLoggedIn;
