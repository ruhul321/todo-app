import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getTodoLists, createTodoList, deleteTodoList, updateTodoList } from '../api/todos';
import TodoListCard from '../components/TodoListCard';
import CreateTodoListForm from '../components/CreateTodoListForm';
import { AuthContext } from '../context/AuthContext';

const Dashboard = () => {
  const [todoLists, setTodoLists] = useState([]);
  const navigate = useNavigate();
  const { user, logout } = useContext(AuthContext); 


  useEffect(() => {
    fetchTodoLists();
  }, []);

  const fetchTodoLists = async () => {
    try {
      const res = await getTodoLists();
      setTodoLists(res.data);
    } catch (err) {
      console.error('Error fetching lists:', err);
    }
  };

  const handleCreate = async (name) => {
    try {
      await createTodoList({ name });
      fetchTodoLists();
    } catch (err) {
      console.error('Error creating list:', err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteTodoList(id);
      fetchTodoLists();
    } catch (err) {
      console.error('Error deleting list:', err);
    }
  };

  const handleUpdate = async (id, name) => {
    try {
      await updateTodoList(id, { name });
      fetchTodoLists();
    } catch (err) {
      console.error('Error updating list:', err);
    }
  };

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <div className="flex justify-between items-center mb-4">
      <h2 className="text-2xl font-bold mb-4">My To-Do Lists</h2>
      <div className="text-right">
          <p className="text-sm font-medium">Hi {user?.user?.name?.split(' ')?.[0]}</p>
          <button
            onClick={logout}
            className="text-sm text-red-600 underline"
          >
            Logout
          </button>
        </div>
      </div>
      <CreateTodoListForm onCreate={handleCreate} />
      {todoLists.length === 0 ? (
        <p>No lists found.</p>
      ) : (
        <ul className="space-y-2">
          {todoLists.map((list) => (
            <TodoListCard
              key={list._id}
              list={list}
              onDelete={handleDelete}
              onUpdate={handleUpdate}
              onNavigate={(id) => navigate(`/lists/${id}`)}
            />
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dashboard;
