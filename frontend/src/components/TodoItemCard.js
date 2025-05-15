import React, { useState } from 'react';

const TodoItemCard = ({ item, onUpdate, onDelete, onToggleComplete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(item.text);

  const handleSave = () => {
    if (editText.trim()) {
      onUpdate(item._id, { text: editText });
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setEditText(item.text);
    setIsEditing(false);
  };

  return (
    <div
      className={`p-4 border rounded flex items-center justify-between ${
        item.completed ? 'bg-green-100' : 'bg-white'
      }`}
    >
      <div className="flex items-center gap-2 w-full">
        <input
          type="checkbox"
          checked={item.completed}
          onChange={onToggleComplete}
          className="w-4 h-4 mt-1"
        />

        {isEditing ? (
          <input
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            className="border px-2 py-1 w-full"
          />
        ) : (
          <span
            className={`flex-1 ${item.completed ? 'line-through text-gray-500' : ''}`}
          >
            {item.text}
          </span>
        )}
      </div>

      <div className="flex gap-2 ml-2">
        {isEditing ? (
          <>
            <button
              onClick={handleSave}
              className="text-green-600 text-sm font-medium"
            >
              Save
            </button>
            <button
              onClick={handleCancel}
              className="text-gray-500 text-sm"
            >
              Cancel
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => setIsEditing(true)}
              className="text-blue-600 text-sm"
            >
              Edit
            </button>
            <button
              onClick={() => onDelete(item._id)}
              className="text-red-600 text-sm"
            >
              Delete
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default TodoItemCard;
