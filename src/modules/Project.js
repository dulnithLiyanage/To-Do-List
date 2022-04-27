export default class Project {
  constructor(name) {
    this.name = name;
    this.tasks = [];
    this.isDefault = true;
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

  deleteTask(task) {
    this.tasks = this.tasks.filter((t) => t.title !== task.title);
  }

  updateTask(task) {
    const taskIndex = this.tasks.findIndex((t) => t.getTitle() === task.title);
    this.tasks[taskIndex] = task;
  }

  clearTasks() {
    this.tasks = [];
  }
}
