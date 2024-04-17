import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { defaultMaxListeners } from 'events';
import { DEFAULT_MAX_VERSION } from 'tls';
import { useNavigate, useParams } from "react-router-dom";


export default function FormPage(){
    const [form, setForm] = useState<any>(null);
    const navigate = useNavigate();
    
    const { formId = "" }= useParams<string>();

    useEffect(()=>{
        axios.get("http://localhost:8000/forms/"+formId+"/").then((res) => setForm(res.data))
    },[]);

    if(!form){
        return(
          <div className="m-5">
            <h1 className="text-4xl bg-red-500">NO DATA FOUND</h1>
          </div>
        )
    }

    return(
        <div>
            <div className="h-32 bg-blue-400 p-4 flex flex-row justify-between items-center">
                <img src="#" alt="" className="bg-red-500 h-24 w-24" />
                <h1 className="text-4xl">DIAM Form Sharing Website</h1>
                <div className='flex flex-row gap-x-4' >
                  <h1 className="text-xl py-2 px-4 bg-slate-50 rounded-xl">Login</h1>
                  <h1 className="text-xl py-2 px-4 bg-slate-50 rounded-xl">Register</h1>
                </div>
            </div>
        
            <div>
                <h1>{form?.title}</h1>
                <h2>{form?.description}</h2>
            </div>
        
        
        </div>
    )



    






}