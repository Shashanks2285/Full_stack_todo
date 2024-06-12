// TodoList.jsx
import React from "react";

const TodoList = ({ id, prop, onDelete, onAskGPT }) => {
  return (
    <div className="todo_style">
      <i onClick={() => onDelete(id)}>x</i>
      <li>{prop}</li>
      <button onClick={() => onAskGPT(prop)}>Ask GPT</button>
    </div>
  );
};

export default TodoList;
