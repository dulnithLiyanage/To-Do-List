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
    return this.importance;
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
