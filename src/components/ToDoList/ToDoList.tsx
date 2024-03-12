import { useState } from "react";
import styles from "./ToDoList.module.css";

export default function ToDoList() {
  const [tasks, setTasks] = useState<string[]>([]);
  const [newTask, setNewTask] = useState<string>("");

  function handleInputChange(event: any) {
    setNewTask(event.target.value);
  }

  function addTask() {
    if (newTask.trim() !== "") {
      setTasks((t) => [...t, newTask]);
      setNewTask("");
    }
  }

  function removeTask(index: number) {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  }

  function moveTaskUp(index: number) {
    if (index > 0) {
      const updatedTasks = [...tasks];
      [updatedTasks[index], updatedTasks[index - 1]] = [
        updatedTasks[index - 1],
        updatedTasks[index],
      ];
      setTasks(updatedTasks);
    }
  }

  function moveTaskDown(index: number) {
    if (index < tasks.length - 1) {
      const updatedTasks = [...tasks];
      [updatedTasks[index], updatedTasks[index + 1]] = [
        updatedTasks[index + 1],
        updatedTasks[index],
      ];
      setTasks(updatedTasks);
    }
  }

  return (
    <div className={styles["to-do-list-container"]}>
      <h1>To-Do-List</h1>

      <div>
        <input
          type="text"
          placeholder="Enter a task..."
          value={newTask}
          onChange={handleInputChange}
        />

        <button onClick={addTask} className={styles["add-task-button"]}>
          Add
        </button>

        <ol>
          {tasks.map((task, i) => (
            <li key={i}>
              <span className={styles["text"]}>{task}</span>
              <button
                onClick={() => removeTask(i)}
                className={styles["remove-task-button"]}
              >
                Delete
              </button>
              <button
                onClick={() => moveTaskUp(i)}
                className={styles["move-task"]}
              >
                ⬆️
              </button>
              <button
                onClick={() => moveTaskDown(i)}
                className={styles["move-task"]}
              >
                ⬇️
              </button>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
