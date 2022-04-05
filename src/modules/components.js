export const ListOfCollections = [];

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

export const Collection = (collectionName, tasks) => {
  const addTask = (task) => {
    tasks.push(task);
  };

  const getCollectionName = () => collectionName;
  const getTasks = () => tasks;

  return {
    addTask,
    getCollectionName,
    getTasks,
  };
};
