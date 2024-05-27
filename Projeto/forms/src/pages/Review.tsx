import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { postReview } from '../services/UserService';

const UserReview = () => {
  const navigate = useNavigate();
  const [review, setReview] = useState('');
  const [rating, setRating] = useState(0);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    await postReview({ review, grade: rating });
    alert(`Review entregue com sucesso!`);
    navigate('/forms');
  };

  const StarRating = ({ rating, setRating }: any) => {
    const changeRating = (newRating: number) => {
      setRating(newRating);
    };

    return (
      <div className="flex">
        {[...Array(5)].map((_, index) => {
          index += 1;
          return (
            <button
              key={index}
              className={index <= rating ? 'text-yellow-500' : 'text-gray-300'}
              onClick={() => changeRating(index)}
            >
              <span className="text-2xl">&#9733;</span>
            </button>
          );
        })}
      </div>
    );
  };

  return (
    <form className="max-w-lg p-4 mx-auto space-y-4">
      <h2 className="text-lg font-semibold">Deixe um Review</h2>
      <textarea
        className="block w-full p-4 mt-1 border-gray-300 rounded-md shadow-sm outline-none resize-none form-textarea focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        placeholder="Write your review here..."
        value={review}
        onChange={(e) => setReview(e.target.value)}
      ></textarea>

      <div>
        <h3 className="text-lg font-semibold">Avalie a sua experiência:</h3>
        <StarRating rating={rating} setRating={setRating} />
      </div>

      <button
        onClick={handleSubmit}
        className="px-4 py-2 text-white rounded bg-slate-400"
      >
        Submeter review
      </button>
    </form>
  );
};

export default UserReview;
