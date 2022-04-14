export default class Project {
  constructor(name) {
    this.name = name;
    this.tasks = [];
  }

  getName() {
    return this.name;
  }

  setName(name) {
    this.name = name;
  }

  setTasks(tasks) {
    this.tasks = tasks;
  }

  getTasks() {
    return this.tasks;
  }

  getTask(taskName) {
    return this.tasks.find((task) => task.getTitle() === taskName);
  }

  contains(taskName) {
    return this.tasks.some((task) => task.getTitle() === taskName);
  }

  addTask(newTask) {
    this.tasks.push(newTask);
  }

  deleteTask(taskName) {
    this.tasks = this.tasks.filter((task) => task.name !== taskName);
  }

  clearTasks() {
    this.tasks = [];
  }
}
