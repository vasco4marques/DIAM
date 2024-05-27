import React, { useEffect, useState } from 'react';
import { getAllUsers } from '../services/UserService';
import Loading from '../components/Loading';
const UserList = () => {
  const [users, setUsers] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const res = await getAllUsers();
        setUsers(res.data || []);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };

    getUsers();
  }, []);

  const getDate = (date: string) => {
    const dateObj = new Date(date);
    return dateObj.toLocaleString();
  }

  if (loading || !users) {
    return <Loading/>;
  }

  return (
    <div className="container p-4 mx-auto">
      <h2 className="mb-4 text-lg font-semibold">Lista de utilizadores da dashboard</h2>
      <ul className="pl-5 list-disc">
        {users && users.map((user:any) => (
          <li key={user.id} className="py-2">
            <span className="font-bold capitalize">{user.username}</span> - <span>{user.user_type} | Criado a {getDate(user?.created_at || "")}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
