import React, { useEffect, useState } from "react";
import AutoTextarea from "../components/TextArea";
import OptionsComponent from "../components/Options";
import { useNavigate, useParams } from "react-router-dom";
import { updateForm } from "../services/FormService";
import { Form, Question, QuestionType } from "./NewForm";
import { ButtonAction, ButtonComponent, IconButtonAction } from "../components/Button";
import MiniMenu from "../components/MiniMenu";
import { FaPlus, FaXmark } from "react-icons/fa6";
import PulsingDot from "../components/PulsingDot";
import Loading from "../components/Loading";
import axios from "axios";

const BACKEND_API = process.env.REACT_APP_BACKEND_API || 'http://localhost:8000';

const EditForm: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate()
  const [newOptions, setNewOptions] = useState<string[]>([]);
  const [formData, setFormData] = useState<Form>({
    _id: "",
    title: "",
    description: "",
    questions: [],
  });

  useEffect(() => {
    if (id) {
      try {
        axios
          .get(`${BACKEND_API}/formDetails/${id}`)
          .then((res) => setFormData(res.data));
      } catch (error) {
        console.error(error);
      }
    }
  }, [id]);

  const onSubmit = async () => {
    await updateForm(formData)
    navigate('/forms')
  };


  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value;
    setFormData(prevFormData => ({
      ...prevFormData,
      title: newTitle
    }));
  };

  const handleIsActiveToggle = () => {
    const isActive = !formData.isActive
    setFormData(prevFormData => ({
      ...prevFormData,
      isActive: isActive
    }));
  };


  const handleDescriptionChange = (value: string) => {
    setFormData(prevFormData => ({
      ...prevFormData,
      description: value
    }));
  };
  const handleNewOptionChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const updatedNewOptions = [...newOptions];
    updatedNewOptions[index] = e.target.value;
    setNewOptions(updatedNewOptions);
  };

  const handleQuestionChange = (
    index: number,
    field: keyof Question,
    value: string | string[] | QuestionType | boolean
  ) => {
    const updatedFormData = { ...formData };

    if (field === "type") {
      updatedFormData.questions[index][field] = value as QuestionType;
    } else if (field === "isRequired") {
      updatedFormData.questions[index][field] = value as boolean;
    }
    else if (field === "options") {
      updatedFormData.questions[index][field] = value as string[];
    } else {
      updatedFormData.questions[index][field] = value as string;
    }

    setFormData(updatedFormData);
  };



  const addQuestion = (type: 0 | 1) => {
    let newQuestion: Question;

    type ? newQuestion = {
      type: type,
      title: "",
      description: "",
      options: [],
      isRequired: false,
    } : newQuestion = {
      type: type,
      title: "",
      description: "",
      isRequired: false,
    }
    const updatedQuestions = [...formData?.questions || []];
    updatedQuestions.push(newQuestion)
    setFormData((prevFormData) => {
      return { ...prevFormData, questions: updatedQuestions };
    });

  }
  const deleteQuestion = (questionIndex: number) => {
    let updatedQuestions = [...formData.questions];
    updatedQuestions = updatedQuestions.filter((_, i) => i !== questionIndex)
    setFormData((prevFormData) => ({
      ...prevFormData,
      questions: updatedQuestions,
    }));
  };

  const addOption = (questionIndex: number, newOption: string) => {
    const updatedQuestions = [...formData.questions];
    const inOptions = !!updatedQuestions[questionIndex].options?.find((o) => o === newOption)
    if (!inOptions) {
      updatedQuestions[questionIndex].options?.push(newOption)
    }

    setFormData((prevFormData) => {
      return { ...prevFormData };
    });

  };

  const deleteOption = (questionIndex: number, optionIndex: number) => {
    const updatedQuestions = [...formData.questions];
    updatedQuestions[questionIndex].options = updatedQuestions[questionIndex].options?.filter((_, i) => i !== optionIndex)
    setFormData((prevFormData) => {
      return { ...prevFormData, questions: updatedQuestions };
    });
  };

  if (!formData) return (<Loading />);

  return (
    <div className="container mx-auto">


      <div className="flex flex-col items-center justify-center mt-4">

        <h1 className="text-2xl"> Editar Formulario </h1>
        <div className="flex items-center w-full p-4">
          <PulsingDot active={formData.isActive!} />
          <div className="w-4 " />
          <ButtonAction onClick={handleIsActiveToggle}>{formData.isActive ? "desativar" : " ativar"}</ButtonAction>
        </div>
        <div className="flex flex-col w-full gap-4 p-4">
          <p>Titulo</p>
          <input
            id="title"
            type="text"
            className={" bg-transparent rounded-md p-2 text-2xl focus:outline-none border-black  border-2"}
            placeholder=''
            onChange={handleTitleChange}
            value={formData.title}
          />
          <p>Descrição</p>
          <AutoTextarea value={formData.description} placehoder={'"Descrição do formulario..."'} onBlur={(value) => {
            handleDescriptionChange(value)
          }

          } />
        </div>

        {formData && formData.questions && formData.questions.map((question, index) => (
          <div key={index} className="w-full p-4 mb-20 rounded-md shadow-md bg-trras">
            <div className="flex items-center justify-between ">
              <input
                type="text"
                className="p-2 text-lg bg-transparent border-none rounded-md focus:outline-none"
                placeholder={`"Questão ${index + 1}"`}
                value={question.title}
                onChange={(e) =>
                  handleQuestionChange(index, "title", e.target.value)
                }
              /><IconButtonAction onClick={() => deleteQuestion(index)}><FaXmark /></IconButtonAction>
            </div>
            <AutoTextarea
              placehoder={'"Texto da questão..."'}
              value={question.description}
              onBlur={(value: string) => {
                handleQuestionChange(index, "description", value);
              }}
            />

            {/* Options */}
            {question.type === 1 && (
              <>
                <OptionsComponent
                  data={question.options}
                  onChange={(value: string) => {
                    console.log(value);
                  }}
                  onDelete={(optionIndex) =>
                    deleteOption(index, optionIndex)
                  }
                />
                <div className="flex items-center">
                  <input
                    type="text"
                    placeholder="Nova opção"
                    className="p-2 mr-4 border rounded-md"
                    value={newOptions[index]}
                    // onChange={handleNewOptionChange}
                    onChange={(e) => handleNewOptionChange(index, e)}

                  />
                  <IconButtonAction
                    onClick={() => addOption(index, newOptions[index])}
                  >
                    <FaPlus />
                  </IconButtonAction>
                </div>
              </>
            )}


            <div className="flex items-center mt-4">
              <p className="mr-4 text-gray-500">Obrigatório:</p>
              <input
                type="checkbox"
                checked={question.isRequired}
                onChange={(e) =>
                  handleQuestionChange(index, "isRequired", e.target.checked)
                }
              />
            </div>
          </div>
        ))}
        <hr />
        <div className="">
          <MiniMenu>
            <ButtonAction onClick={() => addQuestion(QuestionType.MultipleChoice)}>Adcionar questão multipla escolha</ButtonAction>
            <div className="mb-4 " />
            <ButtonAction onClick={() => addQuestion(QuestionType.Text)}>Adcionar questão discursiva</ButtonAction>
            <div className="mb-4 " />
            <ButtonComponent onClick={onSubmit}>Concluir</ButtonComponent>
          </MiniMenu>
        </div>
      </div>
    </div>
  )
};
export default EditForm;

