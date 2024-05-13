import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getAnswersByFormId } from '../../services/FormService';
import Loading from '../../components/Loading';

const ViewAnswers = () => {
    const { id = "" } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [answers, setAnswers] = useState([]);

    useEffect(() => {
        const fetchAnswers = async () => {
            try {
                const response = await getAnswersByFormId(id);
                setAnswers(response.data);
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

    if (!answers || !answers.length) {
        return <div className='flex items-center justify-center w-full h-full'>Nenhuma resposta neste formulario</div>;
    }

    return (
        <div className="container p-4 mx-auto">
            <h1 className="mb-4 text-2xl font-bold">Answers for Form ID: {id}</h1>
            {answers && answers.map((answerSet, index) => (
                <div key={index} className="p-4 mb-6 bg-white rounded shadow">
                    <h2 className="mb-2 text-xl font-semibold">Answer Set {index + 1}</h2>
                    {/* {answerSet.answers.map((ans, idx) => (
                        <div key={idx} className="mb-2">
                            <strong>Question ID {ans.questionId}: </strong>{ans.answer}
                        </div>
                    ))} */}
                </div>
            ))}
        </div>
    );
};

export default ViewAnswers;
