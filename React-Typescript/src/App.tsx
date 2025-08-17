import React, { useState } from "react";
//import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { DragDropContext } from "@hello-pangea/dnd";
import type { DropResult } from "@hello-pangea/dnd";
import InputField from "./components/InputField";
import TodoList from "./components/TodoList";
import type { Task } from "./types/Task";
import "./App.css";

const App: React.FC = () => {
  const [task, setTask] = useState("");
  const [activeTasks, setActiveTasks] = useState<Task[]>(
    JSON.parse(localStorage.getItem("activeTasks") || "[]")
  );
  const [completedTasks, setCompletedTasks] = useState<Task[]>(
    JSON.parse(localStorage.getItem("completedTasks") || "[]")
  );

  const persist = (nextActive: Task[], nextDone: Task[]) => {
    localStorage.setItem("activeTasks", JSON.stringify(nextActive));
    localStorage.setItem("completedTasks", JSON.stringify(nextDone));
  };

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    const desc = task.trim();
    if (!desc) return;

    const newTask: Task = { id: Date.now(), description: desc, isDone: false };
    const next = [newTask, ...activeTasks];
    setActiveTasks(next);
    persist(next, completedTasks);
    setTask("");
  };

  const handleDelete = (id: number, list: "active" | "done") => {
    if (list === "active") {
      const next = activeTasks.filter((t) => t.id !== id);
      setActiveTasks(next);
      persist(next, completedTasks);
    } else {
      const next = completedTasks.filter((t) => t.id !== id);
      setCompletedTasks(next);
      persist(activeTasks, next);
    }
  };

  const handleToggle = (id: number, list: "active" | "done") => {
    if (list === "active") {
      const t = activeTasks.map((x) => x.id === id ? { ...x, isDone: true } : x);
      const moved = activeTasks.find((x) => x.id === id);
      if (moved) {
        const nextActive = activeTasks.filter((x) => x.id !== id);
        const nextDone = [{ ...moved, isDone: true }, ...completedTasks];
        setActiveTasks(nextActive);
        setCompletedTasks(nextDone);
        persist(nextActive, nextDone);
      } else {
        setActiveTasks(t);
        persist(t, completedTasks);
      }
    } else {
      const moved = completedTasks.find((x) => x.id === id);
      if (moved) {
        const nextDone = completedTasks.filter((x) => x.id !== id);
        const nextActive = [{ ...moved, isDone: false }, ...activeTasks];
        setActiveTasks(nextActive);
        setCompletedTasks(nextDone);
        persist(nextActive, nextDone);
      }
    }
  };

  const handleEdit = (id: number, description: string, list: "active" | "done") => {
    if (list === "active") {
      const next = activeTasks.map((t) => (t.id === id ? { ...t, description } : t));
      setActiveTasks(next);
      persist(next, completedTasks);
    } else {
      const next = completedTasks.map((t) => (t.id === id ? { ...t, description } : t));
      setCompletedTasks(next);
      persist(activeTasks, next);
    }
  };

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;
    if (!destination) return;

    // Same place? do nothing
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) return;

    // Clone lists
    const active = Array.from(activeTasks);
    const done = Array.from(completedTasks);

    // Remove from source
    let moved: Task | undefined;
    if (source.droppableId === "ActiveTasks") {
      moved = active.splice(source.index, 1)[0];
    } else {
      moved = done.splice(source.index, 1)[0];
    }
    if (!moved) return;

    // Insert into destination
    if (destination.droppableId === "ActiveTasks") {
      moved.isDone = false;
      active.splice(destination.index, 0, moved);
    } else {
      moved.isDone = true;
      done.splice(destination.index, 0, moved);
    }

    setActiveTasks(active);
    setCompletedTasks(done);
    persist(active, done);
  };

  return (
    <div className="app">
      <header className="hero">
        <h1 className="title">tasks-typescript-app</h1>
        <p className="subtitle">React + TS + Drag & Drop ✅</p>
        <InputField task={task} setTask={setTask} handleAdd={handleAdd} />
      </header>

      <DragDropContext onDragEnd={onDragEnd}>
        <div className="columns">
          <TodoList
            title="Active"
            droppableId="ActiveTasks"
            tasks={activeTasks}
            onDelete={(id) => handleDelete(id, "active")}
            onToggle={(id) => handleToggle(id, "active")}
            onEdit={(id, d) => handleEdit(id, d, "active")}
          />
          <TodoList
            title="Completed"
            droppableId="CompletedTasks"
            tasks={completedTasks}
            onDelete={(id) => handleDelete(id, "done")}
            onToggle={(id) => handleToggle(id, "done")}
            onEdit={(id, d) => handleEdit(id, d, "done")}
          />
        </div>
      </DragDropContext>
    </div>
  );
};

export default App;
