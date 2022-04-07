export const ListOfCollections = [];

export const ToDo = (title, description, dueDate) => {
  let priority = false;
  let completed = false;

  const prioritize = () => {
    priority = true;
  };

  const unPrioritize = () => {
    priority = false;
  };

  const complete = () => {
    completed = true;
  };

  const undoComplete = () => {
    completed = false;
  };

  const getTitle = () => title;
  const getDescription = () => description;
  const getDueDate = () => dueDate;
  const checkIfImportant = () => priority;
  const checkIfCompleted = () => completed;

  return {
    getTitle,
    getDescription,
    getDueDate,
    checkIfImportant,
    checkIfCompleted,
    prioritize,
    unPrioritize,
    complete,
    undoComplete,
  };
};

export const Collection = (collectionName, tasks) => {
  const addTask = (task) => {
    tasks.push(task);
  };

  const removeTask = (task) => {
    tasks = tasks.filter((todo) => todo !== task);
  };

  const getCollectionName = () => collectionName;
  const getTasks = () => tasks;

  return {
    addTask,
    removeTask,
    getCollectionName,
    getTasks,
  };
};
