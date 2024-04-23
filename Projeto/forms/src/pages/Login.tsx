import React, { useEffect, useState } from "react";
import HeaderNotLog from "../components/HeaderNotLog";

export default function Login() {
  return (
    <div className="w-full h-[100vh] bg-gradient-to-br from-pink to-blue">
      <HeaderNotLog />
      <div className="flex flex-row justify-center mt-5">
        <div className="bg-white flex flex-col gap-y-5 items-center p-10 rounded-md">
          <h1 className="text-4xl mb-5">Login</h1>
          <div className="w-full flex flex-row gap-x-2 justify-between">
            <label htmlFor="email">Email:</label>
            <input
              type="text"
              name="email"
              className="border-solid border-2 border-black rounded-md"
            />
          </div>
          <div className="w-full flex flex-row gap-x-2 justify-between">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              name="password"
              className="border-solid border-2 border-black rounded-md"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
