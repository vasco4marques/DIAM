import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../components/Loading";

const BACKEND_API = process.env.REACT_APP_BACKEND_API || 'http://localhost:8000';

export default function FormPage() {
  const { formId = "" } = useParams<string>();
  const navigate = useNavigate();

  const [form, setForm] = useState<any>(null);

  useEffect(() => {
    if (formId) {
      try {
        axios
          .get(`${BACKEND_API}/formDetails/${formId}`)
          .then((res) => setForm(res.data));
      } catch (error) {
        setForm({});
        console.error(error);
      }
    }
  }, [formId]);

  function deleteForm() {
    if (!window.confirm('Are you sure you want to delete this form?')) return;
    try {
      fetch(`${BACKEND_API}/forms/${formId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      }).then((res) => {
        if (res.ok) {
          alert('Form deleted successfully!');
          navigate('/home');
        } else {
          alert('Failed to delete form. Please try again.');
        }
        //   navigate('/home');
      });
    } catch (error) {
      console.error(error);
    }
  }

  if (!form) return (<Loading />);

  return (
    <div className="flex flex-col w-full p-[4rem] gap-y-5 rounded-xl bg-cyan-600 text-white">
      <div className="flex items-center justify-end w-full gap-4">
        <button onClick={deleteForm} className="p-2 px-6 text-xl text-white transition-all duration-300 bg-red-500 rounded-md hover:bg-red-700">Delete Form</button>
      </div>
      {form ? (
        <div className="flex flex-col justify-center gap-y-4">
          <div className="flex flex-col gap-y-2">
            <h1 className="text-5xl">{form?.title}</h1>
            <h2 className="text-2xl">{form?.description}</h2>
          </div>
          <hr />
          <div className="flex flex-col gap-y-4">
            <h3 className="text-3xl">Questions:</h3>
            {form?.question_list && form?.question_list.length !== 0 ? (
              form?.question_list.map(
                (question: any, questionId: number) => {
                  return (
                    <div className="flex flex-col gap-y-2" key={questionId}>
                      <p className="text-2xl">{question?.text}</p>
                      {question?.answerOption_list &&
                        question?.answerOption_list.length !== 0 ? (
                        question?.answerOption_list.map(
                          (option: any, optionId: number) => {
                            return question?.answerType === "1" ? (
                              <div
                                className="flex flex-row items-center gap-x-2"
                                key={optionId}
                              >
                                <input
                                  className="w-4 h-4"
                                  name={"option" + optionId}
                                  type="checkbox"
                                />
                                <label
                                  className="text-xl"
                                  htmlFor={"option" + optionId}
                                >
                                  {option?.text}
                                </label>
                              </div>
                            ) : (
                              <h1>No options</h1>
                            );
                          }
                        )
                      ) : question?.answerType === "2" ? (
                        <div key={questionId}>
                          {/* <input className="border-2 border-black rounded-sm h-[9rem] w-[30rem]" name={"question" + questionId} type="text" />   */}
                          <textarea
                            className="resize-none"
                            name={"question" + questionId}
                            id={"question" + questionId}
                            cols={50}
                            rows={4}
                          />
                        </div>
                      ) : (
                        <p>No option added</p>
                      )}
                    </div>
                  );
                }
              )
            ) : (
              <p>No questions added</p>
            )}
          </div>
        </div>
      ) : (
        <p className="text-4xl">No Form Found</p>
      )}
    </div>
  );
}
