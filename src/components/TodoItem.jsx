import { useState } from "react";
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
    <li>
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
        />
      ) : (
        <span style={{ textDecoration: done ? "line-through" : "none" }}>
          {text}
        </span>
      )}{" "}
      {isEditing ? (
        <>
          <button onClick={handleSave} type="button">
            Save
          </button>{" "}
          <button onClick={handleCancel} type="button">
            Cancel
          </button>
        </>
      ) : (
        <>
          <button type="button" onClick={onDelete}>
            Delete
          </button>{" "}
          <button onClick={handleEditing} type="button">
            Update
          </button>
        </>
      )}
      <input type="checkbox" onChange={onToggle} checked={done} />
    </li>
  );
}
