import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { defaultMaxListeners } from 'events';
import { DEFAULT_MAX_VERSION } from 'tls';
import { useNavigate } from "react-router-dom";

export default function Home(){

  const [forms, setForms] = useState<any>(null);
  const navigate = useNavigate();

  // Página carrega e vamos buscar os dados que existe acerca dos forms
  useEffect(()=>{
  
    axios.get("http://localhost:8000/forms/").then((res) => setForms(res.data))
  },[]);

  // Se não houver nenhum form.
  if(!forms){
    return(
      <div className="m-5">
        <h1 className="text-4xl bg-red-500">NO DATA FOUND</h1>
      </div>
    )
  }

  return(
    <div className="flex flex-col">

      <div className="h-32 bg-blue-400 p-4 flex flex-row justify-between items-center">
        <img src="#" alt="" className="bg-red-500 h-24 w-24" />
        <h1 className="text-4xl">DIAM Form Sharing Website</h1>
        <div className='flex flex-row gap-x-4' >
          <h1 className="text-xl py-2 px-4 bg-slate-50 rounded-xl">Login</h1>
          <h1 className="text-xl py-2 px-4 bg-slate-50 rounded-xl">Register</h1>
        </div>

      </div>

      <div className='m-5 flex flex-col gap-y-2'>

        {forms && forms.length !== 0 ? (  
          forms.map((form:any, index:number) => {
            return (
              <div key={index} className="flex flex-row justify-between bg-blue-400 border-solid rounded-xl p-5">
                <div className='flex flex-col'>
                  <h1 className="text-4xl">Form: {form?.title}</h1>
                  <h2 className="text-xl">Descrição: {form?.description}</h2> 
                </div>
                <button className="text-xl py-2 px-4 bg-slate-50 rounded-xl" onClick={() => navigate(`/form/${form?.id}`)}>Open Form</button>
              </div>
            );
          })
        ):(
          <h1>No Form loaded</h1>
        )}
      </div>
    </div>
  )
} 






