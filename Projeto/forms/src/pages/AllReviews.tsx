import React, { useEffect, useState } from 'react';
import { getAllReviews } from '../services/UserService';
import Loading from '../components/Loading';

const AllReviews = () => {
  const [reviews, setReviews] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const res = await getAllReviews();
        setReviews(res.data || []);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };

    getUsers();
  }, []);

  if (loading || !reviews) {
    return <Loading />;
  }

  return (
    <div className="container p-4 mx-auto">
      <h2 className="mb-4 text-lg font-semibold">Lista de Reviews do website</h2>
      <ul className="pl-5 list-disc">
        {(reviews && reviews.length !== 0) ? reviews.map((user: any) => (
          <li key={user.id} className="py-2">
            <span className="font-bold capitalize">{user.username}</span> | <span className="text-xl">{user.grade} <span className='text-yellow-500'>&#9733;</span></span> | Review: {user?.review}
          </li>
        ))
          :
          <li>Ainda não existem reviews</li>
        }
      </ul>
    </div>
  );
};

export default AllReviews;
