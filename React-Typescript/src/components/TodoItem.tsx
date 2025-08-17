import React, { useState } from "react";
import { Draggable } from "@hello-pangea/dnd";
import type { Task } from "../types/Task";
import styles from "./TodoItem.module.css";

interface TodoItemProps {
  index: number;
  task: Task;
  onDelete: (id: number) => void;
  onToggle: (id: number) => void;
  onEdit: (id: number, description: string) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({
  index,
  task,
  onDelete,
  onToggle,
  onEdit,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [desc, setDesc] = useState(task.description);

  const saveEdit = () => {
    if (desc.trim().length) onEdit(task.id, desc.trim());
    setIsEditing(false);
  };

  return (
    <Draggable draggableId={task.id.toString()} index={index}>
      {(provided, snapshot) => (
        <li
          className={`${styles.item} ${
            snapshot.isDragging ? styles.dragging : ""
          }`}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <input
            type="checkbox"
            checked={task.isDone}
            onChange={() => onToggle(task.id)}
            aria-label="Mark task complete"
          />

          {isEditing ? (
            <input
             aria-label="Username"
              className={styles.editInput}
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              onBlur={saveEdit}
              onKeyDown={(e) => e.key === "Enter" && saveEdit()}
              autoFocus
            />
          ) : (
            <span
              className={`${styles.text} ${task.isDone ? styles.done : ""}`}
              onDoubleClick={() => setIsEditing(true)}
              title="Double-click to edit"
            >
              {task.description}
            </span>
          )}

          <button
            className={styles.delete}
            onClick={() => onDelete(task.id)}
            aria-label="Delete task"
          >
            ✕
          </button>
        </li>
      )}
    </Draggable>
  );
};

export default TodoItem;