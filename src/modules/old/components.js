export default class Task {
  constructor(title, description, dueDate) {
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.importance = false;
    this.completed = false;
  }

  getTitle() {
    return this.title;
  }

  getDescription() {
    return this.description;
  }

  getDueDate() {
    return this.dueDate;
  }

  checkIfImportant() {
    return this.priority;
  }

  checkIfCompleted() {
    return this.completed;
  }

  completeTask() {
    this.completed = true;
  }

  unCompleteTask() {
    this.completed = false;
  }

  setImportance(importance) {
    this.importance = importance;
  }
}

// export const ListOfCollections = [];

// export const ToDo = (title, description, dueDate) => {
//   let priority = false;
//   let completed = false;

//   const prioritize = () => {
//     priority = true;
//   };

//   const unPrioritize = () => {
//     priority = false;
//   };

//   const complete = () => {
//     completed = true;
//   };

//   const undoComplete = () => {
//     completed = false;
//   };

//   const getTitle = () => title;
//   const getDescription = () => description;
//   const getDueDate = () => dueDate;
//   const checkIfImportant = () => priority;
//   const checkIfCompleted = () => completed;

//   return {
//     getTitle,
//     getDescription,
//     getDueDate,
//     checkIfImportant,
//     checkIfCompleted,
//     prioritize,
//     unPrioritize,
//     complete,
//     undoComplete,
//   };
// };

// export const Collection = (collectionName, tasks) => {
//   const addTask = (task) => {
//     tasks.push(task);
//   };

//   const removeTask = (task) => {
//     tasks = tasks.filter((todo) => todo !== task);
//   };

//   const getCollectionName = () => collectionName;
//   const getTasks = () => tasks;

//   return {
//     addTask,
//     removeTask,
//     getCollectionName,
//     getTasks,
//   };
// };
