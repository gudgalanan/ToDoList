import React, { useState } from "react";
import TaskForm from "./TaskForm";
import TaskDetail from "./TaskDetail";
import "./css/TaskList.css";

interface Task {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  priority: string;
  completed: boolean;
}

const initialTasks: Task[] = [
  {
    id: "1",
    title:
      "Really Long Task Name Buy Groceries, Everything including fruits, vegetables, and household items",
    description:
      "Buy groceries for the week, including fruits, vegetables, and household items.",
    dueDate: "2023-09-30",
    priority: "high",
    completed: false,
  },
  {
    id: "2",
    title: "Complete React Project",
    description:
      "Finish the React project for the task management system. Ensure all components are working correctly.",
    dueDate: "2023-10-15",
    priority: "normal",
    completed: false,
  },
  {
    id: "3",
    title: "Call Mom",
    description:
      "Call mom to wish her a happy birthday and catch up on family news.",
    dueDate: "2023-09-25",
    priority: "low",
    completed: false,
  },
];

const TaskList: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [filterText, setFilterText] = useState("");
  const [selectedTasks, setSelectedTasks] = useState<string[]>([]);

  const [stateSelectedTasks, setStateSelectedTasks] = useState<{
    id: string;
    status: boolean;
  }>({ id: "", status: false });

  // Function to add a new task
  const addTask = (newTask: Task) => {
    setTasks([
      ...tasks,
      { ...newTask, id: Date.now().toString(), completed: false },
    ]);
  };

  const [showTaskDetail, setShowTaskDetail] = useState(false); // State to control the visibility of TaskDetail
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null); // Store the selected task ID

  const openTaskDetail = (taskId: string) => {
    setSelectedTaskId(taskId);
  };

  // Function to close the TaskDetail component
  const closeTaskDetail = () => {
    setSelectedTaskId(null);
  };

  // Function to remove a task
  const removeTask = (taskId: string) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  // Function to update a task
  const updateTask = (updatedTask: Task) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === updatedTask.id ? { ...task, ...updatedTask } : task
      )
    );
  };

  // Function to handle search
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilterText(e.target.value);
  };

  // Function to handle bulk remove
  const handleBulkRemove = () => {
    setTasks(tasks.filter((task) => !selectedTasks.includes(task.id)));
    setSelectedTasks([]);
  };

  // Function to handle task selection
  const handleTaskSelect = (taskId: string) => {
    if (selectedTasks.includes(taskId)) {
      setSelectedTasks(selectedTasks.filter((id) => id !== taskId));
    } else {
      setSelectedTasks([...selectedTasks, taskId]);
    }
  };

  const selectedTask = tasks.find((task) => task.id === selectedTaskId);

  return (
    <div className="task-list-container">
      <div className="task-form-container">
        <TaskForm onAdd={addTask} selectedTasks={selectedTasks} />
      </div>
      <div className="task-list">
        <h2>To-Do List</h2>
        <input
          type="text"
          placeholder="Search..."
          className="search-input"
          value={filterText}
          onChange={handleSearch}
        />
        <div>
          {tasks
            .filter((task) =>
              task.title.toLowerCase().includes(filterText.toLowerCase())
            )
            .map((task) => (
              <div key={task.id} className="task-item">
                <div className="task-item-wrap">
                  <div className="task-item-detail">
                    <input
                      type="checkbox"
                      checked={selectedTasks.includes(task.id)}
                      onChange={() => handleTaskSelect(task.id)}
                    />
                    <span>{task.title}</span>
                  </div>

                  <div className="row">
                    <button onClick={() => openTaskDetail(task.id)}>
                      Detail
                    </button>
                    <button onClick={() => removeTask(task.id)}>Remove</button>
                  </div>
                </div>

                {/* Render TaskDetail below the selected task */}
                {selectedTaskId === task.id && (
                  <div className="task-desc">
                    <div className="task-form-container">
                      <TaskDetail
                        task={task}
                        onUpdate={updateTask}
                        onClose={closeTaskDetail}
                      />
                    </div>
                  </div>
                )}
              </div>
            ))}
        </div>

        {selectedTasks.length > 0 && (
          <div className="bulk-action-box">
            <span>Bulk Action: </span>
            <div className="row">
              <button onClick={handleBulkRemove}>Remove</button>
              <button onClick={() => console.log("Done")}>Done</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskList;
