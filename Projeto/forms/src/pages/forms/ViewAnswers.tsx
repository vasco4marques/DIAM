import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getAnswersByFormId, getFormDetails } from '../../services/FormService';
import Loading from '../../components/Loading';

const ViewAnswers = () => {
    const { id = "" } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [answers, setAnswers] = useState([]);
    const [formData, setFormData] = useState<any>({
        id: "",
        title: "",
        description: "",
        active: false,
        question_list: [],
    });

    useEffect(() => {
        const fetchAnswers = async () => {
            try {
                const response = await getAnswersByFormId(id);
                setAnswers(response.data);
                const response2 = await getFormDetails(id);
                setFormData(response2.data);
                setLoading(false);
            } catch (error) {
                console.error('Failed to fetch answers:', error);
                alert('Ocorreu um erro, tente mais tarde.');
            }
        };

        fetchAnswers();
    }, [id, navigate]);

    if (loading) {
        return <Loading />;
    }

    if (!answers || !answers.length || !formData) {
        return <div className='flex items-center justify-center w-full h-full'>Nenhuma resposta neste formulario</div>;
    }

    return (
        <div className="container p-4 mx-auto">
            <h1 className="mb-4 text-2xl font-bold">Respostas do formulário: {formData.title}</h1>
            {formData && formData.question_list && formData.question_list.map((question: any, index: number) => (
                <div key={index} className="w-full p-4 mb-10 rounded-md shadow-md bg-trras">
                    <div className="flex flex-col w-full ">
                        <p className='mb-8 font-bold'>{question.title}</p>
                        {
                            question.type === 0 ?
                                <div className='flex flex-col gap-2'>
                                    <p>Lista de respostas:</p>
                                    {
                                        answers && answers.filter((answer: any) => answer.question === question.id && answer.answerText).map((answer: any, index: number) => (
                                            <div key={index} className='flex items-center gap-2'>
                                                <p>{index + 1}. {answer.answerText}</p>
                                            </div>
                                        ))
                                    }
                                </div>
                                :
                                <div className='flex flex-col gap-2'>
                                    <p>Contagem de respostas:</p>
                                    {
                                        answers && Object.entries(answers
                                            .filter((answer: any) => answer.question === question.id)
                                            .reduce((acc: { [key: string]: number }, answer: any) => {
                                                acc[answer.answerText] = (acc[answer.answerText] || 0) + 1;
                                                return acc;
                                            }, {}))
                                            .map(([answerText, count]: [string, number]) => (
                                                <div key={answerText} className='flex items-center gap-2'>
                                                    <p>{answerText} - <span className='font-bold'>Total {count}</span></p>
                                                </div>
                                            ))
                                    }
                                </div>
                        }
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ViewAnswers;
