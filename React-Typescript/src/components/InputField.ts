import React, { useRef } from "react";
import styles from "./InputField.module.css";

type InputFieldProps = {
  task: string;
  setTask: (value: string) => void;
  handleAdd: (e: React.FormEvent<HTMLFormElement>) => void;
};

const InputField = ({ task, setTask, handleAdd }: InputFieldProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // prevent page reload
    handleAdd(e);
    if (inputRef.current) {
      inputRef.current.blur();
    }
  };

  return (
    <form className={styles.input} onSubmit={onSubmit}>
      <label htmlFor="taskInput" style={{ display: "none" }}>
        Task
      </label>

      <input
        id="taskInput"
        ref={inputRef}
        type="text"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        placeholder="Add a task..."
        className={styles.inputBox}
      />

      <button type="submit" className={styles.inputSubmit}>
        Add
      </button>
    </form>
  );
};

export default InputField;
