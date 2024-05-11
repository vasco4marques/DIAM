import React, { useEffect, useState } from "react";
import { getUserName } from "../services/AuthService";
import PulsingDot from "../components/PulsingDot";
import { useNavigate } from "react-router-dom";
import { ButtonAction, ButtonComponent, IconButtonAction } from "../components/Button";
import { FaCopy, FaPen } from "react-icons/fa6";
import Loading from "../components/Loading";
import { getAllForms } from "../services/FormService";

const MyFormsPage: React.FC = () => {
  const baseUrl = window.location.origin;
  const [forms, setForms] = useState([]);
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchforms = async () => {
      try {
        const response = await getAllForms();
        setForms(response.data);
      } catch (error) {
        console.error(error);
        setForms([]);
      }
    };

    fetchforms();
  }, []);

  useEffect(() => {
    const fetchUserName = async () => {
      const user = getUserName()
      setUserName(user!);
    };

    fetchUserName();
  }, []);

  const copy = async (text: string) => {
    await navigator.clipboard.writeText(text);
    alert('Texto copiado!');
  };


  const handleFormClick = (formId: string) => {
    navigate(`/edit/${formId}`,);
  };

  if (!forms) return (<Loading />);

  return (
    <div className="container mx-auto">
      <div className="flex items-center justify-between mt-4">
        <h1 className="text-2xl text-[var(--red)] oito:text-black">👋 Olá, {userName}!</h1>
        <ButtonComponent onClick={() => navigate('/new')}>
          + Novo Formulário
        </ButtonComponent>
      </div>

      {forms && forms.length === 0 ? (
        <p className="mt-8 text-center text-zinc-500 bg-">Você não possui nenhum formulário</p>
      ) : (
        <div className="grid grid-cols-3 gap-4 mt-8">
          {forms && forms.map((form: any) => (
            <div
              key={form._id}
              className="flex flex-col justify-between p-4 transition duration-300 bg-white border border-transparent rounded-md shadow-md cursor-pointer h-44 hover:border-zinc-600"
            // onClick={() => handleFormClick(form._id)}
            >
              <div className="mb-4 ">
                <div className="flex justify-between ">
                  <h2 className="text-xl">{form.title}</h2>
                  <PulsingDot active={form.isActive} />

                </div>
                <p className="mb-2 overflow-hidden text-zinc-700 overflow-ellipsis">{form.description}</p>
              </div>
              <div className="flex items-center justify-between mt-4">
                <div className="flex items-center justify-center">

                  {form.isActive && <ButtonAction onClick={() => navigate(`/answer/${form.id}`)}> Responder</ButtonAction>}
                  <div className="w-4 " />
                  <IconButtonAction onClick={() => copy(`${baseUrl}/answer/${form.id}`)}><FaCopy /></IconButtonAction>
                </div>


                <IconButtonAction
                  onClick={() => handleFormClick(form.id)}
                ><FaPen />

                </IconButtonAction>



              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyFormsPage;
