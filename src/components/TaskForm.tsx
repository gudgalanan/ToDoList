import React, { FormEvent, useState } from "react";
import "./css/TaskForm.css";

interface Task {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  priority: string;
  completed: boolean;
}

interface TaskFormProps {
  onAdd: (newTask: Task) => void;
  selectedTasks: string[];
}
const TaskForm: React.FC<TaskFormProps> = ({ onAdd }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [priority, setPriority] = useState("normal");

  // Handle form submission to create a new task
  const handleCreateTask = (event: FormEvent) => {
    event.preventDefault();
    const newTask: Task = {
      id: Date.now().toString(),
      title,
      description,
      dueDate,
      priority,
      completed: false,
    };

    onAdd(newTask);

    // Reset form fields
    setTitle("");
    setDescription("");
    setDueDate(new Date().toISOString().split("T")[0]);
    setPriority("normal");
  };

  return (
    <div>
      <h2>New Task</h2>
      <form onSubmit={handleCreateTask}>
        {/* <label> */}

        <input
          type="text"
          placeholder="Add a new task..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        {/* </label> */}
        <label>
          Description
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </label>
        <div className="row">
          <label>
            Due Date
            <input
              type="date"
              value={dueDate}
              min={new Date().toISOString().split("T")[0]}
              onChange={(e) => setDueDate(e.target.value)}
            />
          </label>
          <label>
            Priority
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
            >
              <option value="low">Low</option>
              <option value="normal">Normal</option>
              <option value="high">High</option>
            </select>
          </label>
        </div>
        <button type="submit">Add</button>
      </form>
    </div>
  );
};

export default TaskForm;
