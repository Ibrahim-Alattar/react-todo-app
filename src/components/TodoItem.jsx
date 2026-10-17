import { useState } from "react";

const buttonBase = "rounded px-3 py-1 text-sm text-white cursor-pointer";

export function TodoItem({ text, onDelete, onToggle, done, onUpdate }) {
  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState(text);

  function handleEditing() {
    setIsEditing((prev) => !prev);
  }

  function handleSave() {
    if (draft.trim() === "") return;
    onUpdate(draft.trim());
    setIsEditing(false);
  }

  function handleCancel() {
    setDraft(text);
    setIsEditing(false);
  }

  function handleChange(e) {
    setDraft(e.target.value);
  }
  return (
    <li className="flex items-center gap-2 border-b border-gray-200 p-2">
      <input
        type="checkbox"
        onChange={onToggle}
        checked={done}
        className="h-4 w-4"
      />

      {isEditing ? (
        <input
          type="text"
          value={draft}
          onChange={handleChange}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              handleSave();
            }
            if (e.key === "Escape") handleCancel();
          }}
          className="flex-1 rounded border border-gray-300 px-2 py-1"
        />
      ) : (
        <span className={`flex-1 ${done ? "text-gray-400 line-through" : ""}`}>
          {text}
        </span>
      )}

      {isEditing ? (
        <>
          <button
            onClick={handleSave}
            type="button"
            className={`${buttonBase} bg-blue-500 hover:bg-blue-600`}
          >
            Save
          </button>
          <button
            onClick={handleCancel}
            type="button"
            className={`${buttonBase} bg-gray-500 hover:bg-gray-600`}
          >
            Cancel
          </button>
        </>
      ) : (
        <>
          <button
            onClick={handleEditing}
            type="button"
            className={`${buttonBase} bg-blue-500 hover:bg-blue-600`}
          >
            Update
          </button>
          <button
            type="button"
            onClick={onDelete}
            className={`${buttonBase} bg-red-500 hover:bg-red-600`}
          >
            Delete
          </button>
        </>
      )}
    </li>
  );
}
