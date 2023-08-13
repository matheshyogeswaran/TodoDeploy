import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}`);
      setTodos(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const addTodo = async () => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}`, { title: newTodo });
      setTodos([...todos, response.data]);
      setNewTodo('');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container">
      <h1 className="mt-4">Todo List</h1>
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Enter a new todo"
        />
        <button className="btn btn-primary" onClick={addTodo}>
          Add Todo
        </button>
      </div>
      <ul className="list-group">
        {todos.map((todo) => (
          <li key={todo._id} className="list-group-item">
            {todo.title}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
