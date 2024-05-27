import React from "react";
import { FaCheckCircle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

const SuccessPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center w-full h-dvh">
      <FaCheckCircle className="text-6xl text-green-500" />
      <h1 className="mt-4 text-3xl font-semibold">Formulário Enviado com Sucesso!</h1>
      <p className="mt-2 text-lg">Obrigado pelo seu envio.</p>
      <p className="mt-2 text-lg">Agradecemos o seu feedback.</p>
      <button
        onClick={() => navigate("/forms")}
        className="p-2 px-4 mt-8 font-bold text-white rounded-full bg-zinc-600 hover:bg-zinc-800"
      >
        Voltar
      </button>
      <p className="mt-20 text-sm">Crie seus proprios formularios <Link className="font-semibold hover:underline" to={"/login"}>Faça login</Link></p>
    </div>
  );
};

export default SuccessPage;
