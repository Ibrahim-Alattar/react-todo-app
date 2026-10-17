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
    <div className="min-h-screen bg-gray-100 px-4 py-10">
      <div className="mx-auto w-full max-w-lg rounded-lg bg-white p-6 shadow-md">
        <h1 className="mb-4 text-center text-2xl font-bold">Todo App</h1>

        <form onSubmit={addTodo}>
          <div className="flex gap-2">
            <input
              className="min-w-0 flex-1 rounded-2xl border border-gray-300 px-3 py-1"
              onChange={handleChange}
              value={inputValue}
              type="text"
              placeholder="What needs doing?"
              aria-label="New todo"
            />
            <button
              className="cursor-pointer rounded px-6 py-2 text-sm text-white bg-green-500 hover:bg-green-400"
              type="submit"
            >
              Add
            </button>
          </div>

          {todos.length === 0 ? (
            <p className="my-6 text-center text-gray-400">No todos yet.</p>
          ) : (
            <ul className="mt-4">
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
          )}

          <p className="my-6 text-center text-gray-500">
            {doneCount} of {todos.length} done
          </p>

          {todos.length > 0 && (
            <button
              className="mx-auto block cursor-pointer rounded px-8 py-2 text-sm text-white bg-gray-700 hover:bg-gray-500"
              type="button"
              onClick={clearTodos}
            >
              Clear
            </button>
          )}
        </form>
      </div>
    </div>
  );
}
