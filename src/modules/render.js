import ToDoStyles from "../css/ToDo.module.css";
import Form from "../css/Form.module.css";

export const renderToDoContainer = () => {
  const toDoContainer = document.getElementById("todo-container");
  const openModalButton = document.getElementById("open-modal");

  toDoContainer.classList.add(ToDoStyles.toDoContainer);
  openModalButton.classList.add(ToDoStyles.openModal);
};

export const renderForm = () => {
  const modal = document.querySelector("#modal");
  const formContainer = document.querySelector("#form-container");
  const form = document.querySelector("#form");

  form.classList.add(Form.form);
  formContainer.classList.add(Form.formContainer);
  modal.classList.add(Form.modal);

  const title = form.querySelector("#title");
  const description = form.querySelector("#description");
  const dueDate = form.querySelector("#due-date");
  const priority = form.querySelector("#priority");

  title.classList.add(Form.title);
  description.classList.add(Form.description);
  dueDate.classList.add(Form.dueDate);
  priority.classList.add(Form.priority);

  const buttonContainer = form.querySelector("#button-container");
  const addButton = form.querySelector("#add-todo");
  const closeButton = form.querySelector("#close-modal");

  buttonContainer.classList.add(Form.buttonContainer);
  addButton.classList.add(Form.addButton);
  closeButton.classList.add(Form.closeButton);
};

export const renderTask = (todo) => {
  const toDoContainer = document.getElementById("todo-container");
  const toDoDiv = document.createElement("div");
  toDoDiv.classList.add(ToDoStyles.todo);

  const title = document.createElement("h1");
  const description = document.createElement("p");
  const dueDate = document.createElement("p");
  const priority = document.createElement("p");

  title.classList.add(ToDoStyles.title);
  description.classList.add(ToDoStyles.description);
  dueDate.classList.add(ToDoStyles.dueDate);
  priority.classList.add(ToDoStyles.priority);

  title.textContent = todo.getTitle();
  description.textContent = todo.getDescription();
  dueDate.textContent = todo.getDueDate();
  priority.textContent = todo.getPriority();

  toDoDiv.append(title, description, dueDate, priority);

  toDoContainer.appendChild(toDoDiv);
};
