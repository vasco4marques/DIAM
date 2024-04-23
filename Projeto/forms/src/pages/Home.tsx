import React, { useEffect, useState } from "react";
import axios from "axios";
import { defaultMaxListeners } from "events";
import { DEFAULT_MAX_VERSION } from "tls";
import { useNavigate } from "react-router-dom";
import HeaderNotLog from "../components/HeaderNotLog";

export default function Home() {
  const [forms, setForms] = useState<any>(null);
  const navigate = useNavigate();

  // Página carrega e vamos buscar os dados que existe acerca dos forms
  useEffect(() => {
    axios.get("http://localhost:8000/forms/").then((res) => setForms(res.data));
  }, []);

  // Se não houver nenhum form.
  if (!forms) {
    return (
      <div className="m-5">
        <h1 className="text-4xl bg-red-500">NO DATA FOUND</h1>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-[100vh] bg-gradient-to-br from-pink to-blue ">
      <HeaderNotLog />

      <div className="m-5 flex flex-col gap-y-7">
        {forms && forms.length !== 0 ? (
          forms.map((form: any, index: number) => {
            return (
              <div key={index} className="bg-blue-grey p-4 rounded-xl text-white hover:shadow-xl hover:shadow-gray-600" >
                <button className="w-full" onClick={() => navigate(`/form/${form?.id}`)}>
                  <div className="flex flex-col">
                    <h1 className="text-4xl">Form: {form?.title}</h1>
                    <h2 className="text-xl">Descrição: {form?.description}</h2>
                  </div>
                </button>
              </div>
            );
          })
        ) : (
          <h1>No Form loaded</h1>
        )}
      </div>
    </div>
  );
}
