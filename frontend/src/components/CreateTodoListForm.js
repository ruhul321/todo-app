import React, { useState } from 'react';

const CreateTodoListForm = ({ onCreate }) => {
  const [newListName, setNewListName] = useState('');

  const handleSubmit = () => {
    if (newListName.trim()) {
      onCreate(newListName);
      setNewListName('');
    }
  };

  return (
    <div className="flex gap-2 mb-4">
      <input
        type="text"
        placeholder="New list name"
        value={newListName}
        onChange={(e) => setNewListName(e.target.value)}
        className="border px-3 py-2 w-full"
      />
      <button onClick={handleSubmit} className="bg-blue-500 text-white px-4 py-2 rounded">
        Create
      </button>
    </div>
  );
};

export default CreateTodoListForm;
