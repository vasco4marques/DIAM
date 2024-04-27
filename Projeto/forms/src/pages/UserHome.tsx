import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Loading from "../components/Loading";

const BACKEND_API = process.env.REACT_APP_BACKEND_API || 'http://localhost:8000';

export default function Home() {
  const [forms, setForms] = useState<any>(null);
  const navigate = useNavigate();


  // Página carrega e vamos buscar os dados que existe acerca dos forms
  useEffect(() => {
    try {
      axios.get(`${BACKEND_API}/forms/`).then((res) => setForms(res.data || []));
    } catch (error) {
      setForms([]);
      console.error(error);
    }
  }, []);

  if (!forms) return ( <Loading /> );

  return (
    <div className="flex flex-col gap-y-7">
      <div className="flex items-center justify-between w-full">
        <h1 className="text-4xl">All Forms</h1>
        <button className="p-2 text-black bg-blue-500 rounded-md bg-white hover:bg-[#ddd] transition-all duration-300" onClick={() => navigate('/new-form')}>
          + Add Form
        </button>
      </div>
      {forms.length !== 0 ? (
        forms.map((form: any, index: number) => {
          return (
            <button key={index} className="w-full p-4 text-white bg-cyan-600 rounded-[10px]  hover:shadow-2xl  transition-all duration-200 flex justify-between items-center " onClick={() => navigate(`/form/${form?.id}`)}>
              <div className="flex flex-col w-full overflow-hidden text-left">
                <p className="text-2xl">{form?.title}</p>
                <p className="overflow-hidden text-xl max-w-1/2 text-ellipsis">{form?.description}</p>
              </div>
            </button>
          );
        })
      ) : (
        <h1>No Form found, click "add form"</h1>
      )}
    </div>
  );
}
