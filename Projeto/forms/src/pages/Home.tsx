import React from "react";
import { useNavigate } from "react-router-dom";
import HeaderNotLog from "../components/HeaderNotLog";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col h-[100vh] bg-gradient-to-br from-pink to-blue ">
      <HeaderNotLog />
      <div className="p-16 flex flex-col gap-y-10 items-start">
        <h1 className="text-4xl">The best form platform</h1>
        <h1 className="text-4xl">If you Login or Register you will be able to create forms as you like and share them.</h1>
        <h1 className="text-4xl">When you feel like its enough data, you can disable the sharing link and start using the data you got from it</h1>
      </div>
      
      
    </div>
  );
}
