export const ToDo = (title, description, dueDate, priority) => {
  const getTitle = () => title;
  const getDescription = () => description;
  const getDueDate = () => dueDate;
  const getPriority = () => priority;

  return {
    getTitle,
    getDescription,
    getDueDate,
    getPriority,
  };
};

export const Project = (projectName, tasks) => {
  const addTask = (task) => {
    tasks.push(task);
  };

  const getProjectName = () => projectName;
  const getTasks = () => tasks;

  return {
    addTask,
    getProjectName,
    getTasks,
  };
};
