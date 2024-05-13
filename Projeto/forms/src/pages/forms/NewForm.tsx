import React, { useState } from "react";
import { ButtonAction, ButtonComponent, IconButtonAction } from "../../components/Button";
import AutoTextarea from "../../components/TextArea";
import OptionsComponent from "../../components/Options";
import { useNavigate } from "react-router-dom";
import MiniMenu from "../../components/MiniMenu";
import { FaPlus, FaXmark } from "react-icons/fa6";
import { postForms } from "../../services/FormService";

export enum QuestionType {
  Text = 0,
  MultipleChoice = 1,
}

export interface Question {
  id?: string;
  type: QuestionType;
  title: string;
  description?: string;
  mandatory?: boolean;
  options?: string[];
}

export interface Form {
  id?: string
  title: string;
  description?: string;
  questions: Question[];
  active?: boolean;
  createdBy?: string;
  created_at?: string;
}

const NewForm: React.FC = () => {
  const [newOptions, setNewOptions] = useState<string[]>([]);
  const [formData, setFormData] = useState<Form>({
    title: "",
    description: "",
    questions: [],
  });

  const navigate = useNavigate()

  const onSubmit = async () => {
    try {
      await postForms(formData);
      navigate(-1);
    } catch (error) {
      console.error(error);
      alert('Erro ao criar formulário');
    }
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value;
    setFormData(prevFormData => ({
      ...prevFormData,
      title: newTitle
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
    } else if (field === "mandatory") {
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
      mandatory: false,
    } : newQuestion = {
      type: type,
      title: "",
      description: "",
      mandatory: false,
    }


    const updatedQuestions = [...formData.questions];
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


  return (
    <div className="container mx-auto">

      <div className="flex flex-col items-center justify-center gap-4 mt-4">

        <h1 className="text-2xl"> Novo Formulario </h1>
        <div className="flex flex-col w-full gap-4 p-4">
          <p>Titulo</p>
          <input
            id="title"
            type="text"
            className={" bg-transparent rounded-md p-2 text-2xl focus:outline-none border-black  border-2"}
            placeholder=''
            onChange={handleTitleChange}

          />
          <p>Descrição</p>
          <AutoTextarea placehoder="" onBlur={(value) => {
            handleDescriptionChange(value)
          }} />
        </div>
        {formData.questions.map((question, index) => (
          <div key={index} className="w-full p-4 mb-20 rounded-md shadow-md bg-trras">
            <div className="flex items-center justify-between ">
              <input
                type="text"
                className="p-2 text-lg bg-transparent border-none rounded-md focus:outline-none"
                placeholder={`"Questão ${index + 1}"`}
                onChange={(e) =>
                  handleQuestionChange(index, "title", e.target.value)
                }
              />
              <IconButtonAction onClick={() => deleteQuestion(index)}>
                <FaXmark />
              </IconButtonAction>
            </div>
            <AutoTextarea
              placehoder={'"Texto da questão..."'}
              onBlur={(value: string) => {
                handleQuestionChange(index, "description", value);
              }}
            />

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
                checked={question.mandatory}
                onChange={(e) =>
                  handleQuestionChange(index, "mandatory", e.target.checked)
                }
              />
            </div>
          </div>
        ))}
        <MiniMenu>
          <ButtonAction onClick={() => addQuestion(QuestionType.MultipleChoice)}>Adcionar questão multipla escolha</ButtonAction>
          <div className="mb-4 " />
          <ButtonAction onClick={() => addQuestion(QuestionType.Text)}>Adcionar questão discursiva</ButtonAction>
          <div className="mb-4 " />
          <ButtonComponent onClick={onSubmit}>Concluir</ButtonComponent>
        </MiniMenu>
        <hr />
      </div>
    </div>
  );
};

export default NewForm;
