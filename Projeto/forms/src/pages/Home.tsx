import React, { useEffect, useState } from "react";
import { getUserName } from "../services/AuthService";
import PulsingDot from "../components/PulsingDot";
import { useNavigate } from "react-router-dom";
import { ButtonAction, ButtonComponent, IconButtonAction } from "../components/Button";
import { FaCopy, FaPen } from "react-icons/fa6";
import Loading from "../components/Loading";
import { getAllForms, deleteForm } from "../services/FormService";
import { MdDeleteOutline } from "react-icons/md";
import { FaEye } from "react-icons/fa";

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

  const handleFormDelete = async (formId: string) => {
    await deleteForm(formId);
    alert('Formulário apagado com sucesso!');
    setForms(forms.filter((form: any) => form.id !== formId));
  };

  const seeAnswers = (formId: string) => {
    navigate(`/answers/${formId}`);
  };

  if (!forms) return (<Loading />);

  return (
    <div className="container mx-auto">
      <div className="flex items-center justify-between mt-4">
        <h1 className="text-2xl text-[var(--red)] oito:text-black">👋 Olá, <span className="capitalize">{userName}</span>!</h1>
        <ButtonComponent onClick={() => navigate('/new')}>
          + Novo Formulário
        </ButtonComponent>
      </div>

      {forms && forms.length === 0 ? (
        <p className="mt-8 text-center text-zinc-500 bg-">Você não possui nenhum formulário</p>
      ) : (
        <div className="grid grid-cols-3 gap-4 mt-8">
          {forms && forms.map((form: any, index: number) => (
            <div
              key={index}
              className="flex flex-col justify-between p-4 transition duration-300 bg-white border border-transparent rounded-md shadow-md cursor-pointer h-44 hover:border-zinc-600"
            >
              <div className="mb-4 h-1/2">
                <div className="flex justify-between ">
                  <h2 className="text-xl">{form.title}</h2>
                  <PulsingDot active={form.active} />

                </div>
                <p className="mb-2 overflow-hidden text-zinc-700 overflow-ellipsis">{form.description}</p>
              </div>
              <div className="flex items-center justify-between py-2 mt-4 bg-white">
                <div className="flex items-center justify-center">

                  {form.isActive && <ButtonAction onClick={() => navigate(`/answer/${form.id}`)}> Responder</ButtonAction>}
                  <div className="w-4 " />
                  <IconButtonAction onClick={() => copy(`${baseUrl}/answer/${form.id}`)}><FaCopy /></IconButtonAction>
                </div>

                <IconButtonAction
                  onClick={() => seeAnswers(form.id)}
                ><FaEye color="black" />
                </IconButtonAction>

                <IconButtonAction
                  onClick={() => handleFormClick(form.id)}
                ><FaPen color="black" />
                </IconButtonAction>

                <IconButtonAction
                  onClick={() => handleFormDelete(form.id)}
                ><MdDeleteOutline color="red" />
                </IconButtonAction>

              </div>
            </div>
          ))}
        </div>
      )}
      {
        localStorage.getItem('userType') === 'Admin' ?
          <button onClick={() => navigate('/all-reviews')} className="fixed px-4 py-2 text-white bg-black rounded-full bottom-4 left-4">
            Ver reviews
          </button>
          :
          <button onClick={() => navigate('/review')} className="fixed px-4 py-2 text-white bg-black rounded-full bottom-4 left-4">
            Review website
          </button>
      }
      {
        localStorage.getItem('userType') === 'Admin' &&
        <button onClick={() => navigate('/users')} className="fixed px-4 py-2 text-white bg-black rounded-full bottom-4 right-4">
          Ver users
        </button>
      }
    </div>
  );
};

export default MyFormsPage;
