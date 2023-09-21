// TaskDetail.tsx
import React, { useState } from "react";

interface Task {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  priority: string;
  completed: boolean;
}

interface TaskDetailProps {
  task: Task;
  onUpdate: (updatedTask: Task) => void;
  onClose: () => void;
}

const TaskDetail: React.FC<TaskDetailProps> = ({ task, onUpdate, onClose }) => {
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [dueDate, setDueDate] = useState(task.dueDate);
  const [priority, setPriority] = useState(task.priority);

  // Handle form submission to update the task
  const handleUpdateTask = () => {
    const updatedTask: Task = {
      ...task,
      title,
      description,
      dueDate,
      priority,
    };

    onUpdate(updatedTask);
    onClose(); // Close the TaskDetail component
  };

  return (
    <div>
      <form onSubmit={handleUpdateTask}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <label>
          Description:
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </label>
        <div className="row">
          <label>
            Due Date:
            <input
              type="date"
              value={dueDate}
              min={new Date().toISOString().split("T")[0]}
              onChange={(e) => setDueDate(e.target.value)}
            />
          </label>
          <label>
            Priority:
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

        <button type="submit">Update Task</button>

        {/* Add a close button */}
      </form>
    </div>
  );
};

export default TaskDetail;
