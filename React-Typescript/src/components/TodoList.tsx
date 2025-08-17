import React from "react";
import { Droppable } from "@hello-pangea/dnd"; // ✅ updated import
import type { Task } from "../types/Task";
import TodoItem from "./TodoItem";
import styles from "./TodoList.module.css";

interface TodoListProps {
  title: string;
  droppableId: string;
  tasks: Task[];
  onDelete: (id: number) => void;
  onToggle: (id: number) => void;
  onEdit: (id: number, description: string) => void;
}

const TodoList: React.FC<TodoListProps> = ({
  title,
  droppableId,
  tasks,
  onDelete,
  onToggle,
  onEdit,
}) => {
  return (
    <div className={styles.column}>
      {/* ✅ Heading is fine, already accessible */}
      <h2 className={styles.title}>{title}</h2>

      <Droppable droppableId={droppableId}>
        {(provided, snapshot) => (
          <ul
            className={`${styles.list} ${
              snapshot.isDraggingOver ? styles.over : ""
            }`}
            ref={provided.innerRef}
            {...provided.droppableProps}
            aria-label={`${title} tasks list`} // ✅ accessibility fix
          >
            {tasks.map((t, i) => (
              <TodoItem
                key={t.id}
                index={i}
                task={t}
                onDelete={onDelete}
                onToggle={onToggle}
                onEdit={onEdit}
              />
            ))}
            {provided.placeholder}
          </ul>
        )}
      </Droppable>
    </div>
  );
};

export default TodoList;
