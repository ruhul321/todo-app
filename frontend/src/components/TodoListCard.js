import React, { useState } from 'react';

const TodoListCard = ({ list, onDelete, onUpdate, onNavigate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [updatedName, setUpdatedName] = useState(list.name);

  const handleSave = () => {
    if (updatedName.trim()) {
      onUpdate(list._id, updatedName);
      setIsEditing(false);
    }
  };

  return (
    <div className="flex justify-between items-center border p-3 rounded">
      {isEditing ? (
        <input
          className="border px-2 py-1 flex-grow mr-2"
          value={updatedName}
          onChange={(e) => setUpdatedName(e.target.value)}
        />
      ) : (
        <span className="cursor-pointer text-blue-600 flex-grow" onClick={() => onNavigate(list._id)}>
          {list.name}
        </span>
      )}

      {isEditing ? (
        <button className="text-green-500 mr-2" onClick={handleSave}>Save</button>
      ) : (
        <button className="text-yellow-500 mr-2" onClick={() => setIsEditing(true)}>Edit</button>
      )}

      <button className="text-red-500" onClick={() => onDelete(list._id)}>Delete</button>
    </div>
  );
};

export default TodoListCard;
