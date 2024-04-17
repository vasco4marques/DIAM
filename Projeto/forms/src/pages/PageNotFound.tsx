import React from "react";
import { useNavigate } from "react-router-dom";

export default function PageNotFound(){
    const navigate = useNavigate();

    return(
        <div className="m-10 w-100 h-100">
            <div className="w-full flex flex-col gap-y-5 content-center">
                <h1 className="text-5xl text-red-500 w-fit px-10 py-7 rounded-xl bg-black">Page Not Found</h1>   
                <button className="w-fit px-4 py-2 bg-blue-300 text-xl rounded-xl" onClick={()=> navigate(-1)}>Go Back</button>

            </div>
        </div>
    )
}