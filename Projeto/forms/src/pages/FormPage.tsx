import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import HeaderNotLog from "../components/HeaderNotLog";

export default function FormPage() {
  const [form, setForm] = useState<any>(null);
  const navigate = useNavigate();

  const { formId = "" } = useParams<string>();

  useEffect(() => {
    if (formId) {
      axios
        .get("http://localhost:8000/formDetails/" + formId)
        .then((res) => setForm(res.data));
    }
  }, [formId]);

  // botão -> função -> axios.post/put
  if (!form) {
    return (
      <div className="m-5">
        <h1 className="text-4xl bg-red-500">NO DATA FOUND</h1>
      </div>
    );
  }

  return (
    <div className="h-[100vh] bg-gradient-to-br from-pink to-blue">
      <HeaderNotLog/>

      <div className="flex flex-row justify-center ">
        <div className="flex flex-col w-fit items-center my-5 p-[4rem] gap-y-5 rounded-xl bg-pink-purple ">
          {form ? (
            <div className="flex flex-col justify-center gap-y-4">
              <div className="flex flex-col gap-y-2">
                <h1 className="text-5xl">Title: {form?.title}</h1>
                <h2 className="text-2xl">Description: {form?.description}</h2>
              </div>
              <div className="flex flex-col gap-y-4">
                {form?.question_list && form?.question_list.length !== 0 ? (
                  form?.question_list.map(
                    (question: any, questionId: number) => {
                      return (
                        <div className="flex flex-col gap-y-2" key={questionId}>
                          <h1 className="text-2xl">{question?.text}</h1>
                          {question?.answerOption_list &&
                          question?.answerOption_list.length !== 0 ? (
                            question?.answerOption_list.map(
                              (option: any, optionId: number) => {
                                return question?.answerType === "1" ? (
                                  <div
                                    className="flex flex-row gap-x-2 items-center"
                                    key={optionId}
                                  >
                                    <input
                                      className="h-4 w-4"
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
                            <h1>No option</h1>
                          )}
                        </div>
                      );
                    }
                  )
                ) : (
                  <h1>No questions found</h1>
                )}
              </div>
            </div>
          ) : (
            <h1 className="text-4xl">No Form Found</h1>
          )}
        </div>
      </div>
    </div>
  );
}
