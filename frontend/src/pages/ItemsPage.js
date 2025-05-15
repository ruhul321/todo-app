import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  getTodoItems,
  addTodoItem,
  updateTodoItem,
  deleteTodoItem,
} from '../api/items';
import TodoItemCard from '../components/TodoItemCard';
import { AuthContext } from '../context/AuthContext';

const ItemsPage = () => {
  const { id: listId } = useParams();
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState('');
  const [listName, setListName] = useState('');
  const { user, logout } = useContext(AuthContext); 
  const navigate = useNavigate(); 

  const fetchItems = async () => {
    try {
      const res = await getTodoItems(listId);
      setItems(res.data.items);
      setListName(res.data.name);
    } catch (err) {
      console.error('Error fetching items:', err);
    }
  };
  

  useEffect(() => {
    fetchItems();
  }, [listId]);

  const handleAddItem = async () => {
    if (!newItem.trim()) return;
    try {
      await addTodoItem(listId, { text: newItem });
      setNewItem('');
      fetchItems();
    } catch (err) {
      console.error('Error adding item:', err);
    }
  };

  const handleUpdateItem = async (itemId, data) => {
    try {
      await updateTodoItem(listId, itemId, data);
      fetchItems();
    } catch (err) {
      console.error('Error updating item:', err);
    }
  };

  const handleDeleteItem = async (itemId) => {
    try {
      await deleteTodoItem(listId, itemId);
      fetchItems();
    } catch (err) {
      console.error('Error deleting item:', err);
    }
  };

  const handleToggleComplete = async (item) => {
    try {
      await updateTodoItem(listId, item._id, { completed: !item.completed });
      fetchItems();
    } catch (err) {
      console.error('Error toggling item:', err);
    }
  };
  

return (
    <div className="p-4 max-w-2xl mx-auto">
      {/* Top Bar: User Info and Back */}
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-2xl font-bold">List: {listName}</h2>
          <button
            onClick={() => navigate('/')}
            className="text-sm text-blue-600 underline mt-1"
          >
            Back to Dashboard
          </button>
        </div>
        <div className="text-right">
          <p className="text-sm font-medium">Hi {user?.user?.name?.trim().split(/\s+/)[0] || 'User'}</p>
          <button
            onClick={logout}
            className="text-sm text-red-600 underline"
          >
            Logout
          </button>
        </div>
      </div>
  
      {/* Add Item Section */}
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="New item"
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
          className="border px-3 py-2 w-full"
        />
        <button
          onClick={handleAddItem}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Add
        </button>
      </div>
  
      {/* Item List */}
      {items.length === 0 ? (
        <p>No items yet.</p>
      ) : (
        <div className="space-y-2">
          {items.map((item) => (
            <TodoItemCard
              key={item._id}
              item={item}
              onUpdate={handleUpdateItem}
              onDelete={handleDeleteItem}
              onToggleComplete={() => handleToggleComplete(item)}
            />
          ))}
        </div>
      )}
    </div>
  );
  
} 
export default ItemsPage;
