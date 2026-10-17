import { useState, useEffect } from "react";

import { TodoItem } from "./TodoItem";

export function Todo() {
  const [todos, setTodos] = useState(() => {
    const saved = localStorage.getItem("todos");
    return saved ? JSON.parse(localStorage.getItem("todos")) : [];
  });

  const [inputValue, setInputValue] = useState("");

  function handleChange(e) {
    setInputValue(e.target.value);
  }

  function addTodo(e) {
    e.preventDefault();
    if (inputValue.trim() === "") return;

    setTodos((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        text: inputValue.trim(),
        done: false,
      },
    ]);

    setInputValue("");
  }
  function deleteTodo(id) {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  }

  function toggleTodo(id) {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, done: !todo.done } : todo,
      ),
    );
  }

  function updateTodo(id, newText) {
    setTodos((prev) =>
      prev.map((todo) => (todo.id === id ? { ...todo, text: newText } : todo)),
    );
  }

  function clearTodos() {
    setTodos([]);
  }

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const doneCount = todos.filter((todo) => todo.done).length;

  return (
    <form onSubmit={addTodo}>
      <input onChange={handleChange} value={inputValue} type="text" />
      <button type="submit">Add</button>

      <ul>
        {todos.map(({ text, id, done }) => (
          <TodoItem
            key={id}
            text={text}
            onDelete={() => deleteTodo(id)}
            done={done}
            onToggle={() => toggleTodo(id)}
            onUpdate={(newText) => updateTodo(id, newText)}
          />
        ))}
      </ul>

      <div>
        {doneCount} of {todos.length} done
      </div>

      <button type="button" onClick={clearTodos}>
        Clear
      </button>
    </form>
  );
}
