import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { answerForm, getFormByIdActive } from "../services/FormService";
import { Form as FormType } from "./NewForm";
import { ButtonComponent } from "../components/Button";


export interface Answar {
  questionId: string,
  answer: string
}
export interface Answers {
  formId: string;
  answers: Answar[];
}

const AnswerForm: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormType | null>(null);
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [selectedOptions, setSelectedOptions] = useState<{ [key: string]: string }>({});



  useEffect(() => {
    const fetchForm = async () => {
      try {
        const res = await getFormByIdActive(id!);
        console.log(res.data)
        setFormData({...res.data, questions: res.data.question_list.map((q: any) => {
          const newOptions: string[] = q.options.map((o: any) => o.text)
          return {...q, options: newOptions}})
        });
      } catch (error) {
        alert("Formulario nao encontrado ou desativado")
      }
    };

    fetchForm();
  }, [id]);


  const handleOptionChange = (index: number, option: string) => {

    setSelectedOptions(prevState => ({
      ...prevState,
      [index]: option
    }));
  };



  const onSubmit = async (data: any) => {
    const newAnswer: Answers = {
      formId: id!,
      answers: formData?.questions.map((question, index) => ({
        questionId: question.id!,
        answer: data[`answer:${index}`],
      })) || [],

    };
    try {
      console.log(newAnswer)
      await answerForm(newAnswer);
      navigate("/success");
    } catch (error) {
      alert(`Erro ao enviar resposta:${error}`);
    }
  };

  const getDate = (date: string) => {
    const dateObj = new Date(date);
    return dateObj.toLocaleString();
  }

  return formData ? (
    <div className="container pb-8 mx-auto">
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1 className="my-8 text-3xl">{formData.title}</h1>
        <p className="break-all">{formData.description}</p>
        <p className="mb-4 break-all">Criado a: {getDate(formData?.created_at || "")}</p>
        {formData && formData.questions && formData.questions.map((question, index) => (
          <div key={index} className={"bg-trras border shadow-md rounded-md p-8 w-full my-14" + (errors?.[`answer:${index}`]?.type === 'required' ? ' border-red-800' : ' border-zinc-300')}
          >
            <h2 className="my-8 text-xl">{question.title}</h2>
            <p className="mb-4 break-all">{question.description}</p>
            {question.type === 1 ? (
              <ul className="m-4"

              >
                {question.options?.map((option, i) => (
                  <li key={option} className="flex"
                  >
                    <input
                      {...register(`answer:${index}`, { required: question.mandatory })}
                      className="mr-4"
                      type="radio"
                      id={`answer:${index}`}
                      value={option}
                      checked={selectedOptions[index] === option}
                      onChange={() => handleOptionChange(index, option)}
                    />
                    {option}
                  </li>
                ))}
              </ul>
            ) : (
              <textarea
                id={`answers.${index}`}
                rows={5}
                className="w-full p-4 bg-transparent border-2 rounded-md resize-none border-zinc-300 focus:outline-zinc-400"
                {...register(`answer:${index}`, { required: question.mandatory })}
              />
            )}
          </div>
        ))}
        <ButtonComponent type="submit"
          onClick={() => handleSubmit(onSubmit)()}

        >Enviar</ButtonComponent>
      </form>
    </div>
  ) : (
    <div>Carregando...</div>
  );
};

export default AnswerForm;
