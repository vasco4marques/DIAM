import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { defaultMaxListeners } from 'events';
import { DEFAULT_MAX_VERSION } from 'tls';
import { useNavigate, useParams } from "react-router-dom";


export default function FormPage(){
    const [form, setForm] = useState<any>(null);
    const navigate = useNavigate();
    
    const { formId = "" }= useParams<string>();

    useEffect(()=>{
        axios.get("http://localhost:8000/formDetails/"+formId).then((res) => setForm(res.data))
    },[]);

    if(!form){
        return(
          <div className="m-5">
            <h1 className="text-4xl bg-red-500">NO DATA FOUND</h1>
          </div>
        )
    }

    return(
        <div>
            <div className="h-32 bg-blue-400 p-4 flex flex-row justify-between items-center">
                <img src="#" alt="" className="bg-red-500 h-24 w-24" />
                <h1 className="text-4xl">DIAM Form Sharing Website</h1>
                <div className='flex flex-row gap-x-4' >
                  <h1 className="text-xl py-2 px-4 bg-slate-50 rounded-xl">Login</h1>
                  <h1 className="text-xl py-2 px-4 bg-slate-50 rounded-xl">Register</h1>
                </div>
            </div>
        
            <div className='flex flex-col w-full items-center my-5 gap-y-5'>
                {form && form.length !== 0 ? (
                    <div>
                        <h1 className="text-4xl" >{form?.title}</h1>
                        <h2 className="text-xl" >{form?.description}</h2>

                        {form?.question_list && form?.question_list.length !== 0 ? (
                                form?.question_list.map((question:any, questionId:number)=>{
                                    return(
                                        <div key={questionId}>
                                                <h1>{question?.text}</h1>
                                                {question?.answerOption_list && question?.answerOption_list.length !== 0 ? (    
                                                    question?.answerOption_list.map((option:any,optionId:number)=> {
                                                        return(
                                                            question?.answerType === "1" ? (
                                                                <div key={optionId}>
                                                                    <input name={"option" + optionId} type="checkbox" />  
                                                                    <label htmlFor={"option" + optionId}>{option?.text}</label>
                                                                </div>
                                                            ):(
                                                                <h1>No options</h1>
                                                            )
                                                        )
                                                    })
                                                ):(
                                                    question?.answerType=== "2" ? (
                                                        <div key={questionId}>
                                                            <input className="border-2 rounded-sm" name={"question" + questionId} type="text" />  
                                                            {/* <label htmlFor={"question" + questionId}>{question?.text}</label> */}
                                                        </div>
                                                   ):(
                                                    <h1>No option</h1>
                                                   )
                                                )}
                                        </div>
                                    )
                                })
                        ):(
                            <h1>No questions found</h1>
                        )}
                    </div>
                    ):(
                    <h1 className="text-4xl">No Form Found</h1>
                    )
                }
            </div>
        </div>
    )



    






}