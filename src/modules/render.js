import "../css/ToDo.css";

export const renderToDoContainer = () => {
  const toDoContainer = document.getElementById("todo-container");
  const openModalButton = document.getElementById("open-modal");

  toDoContainer.classList.add("todo-container");
  openModalButton.classList.add("open-modal");
};

export const renderTask = (todo) => {
  const toDoContainer = document.getElementById("todo-container");
  const toDoDiv = document.createElement("div");
  toDoDiv.classList.add("todo");

  const title = document.createElement("h1");
  const description = document.createElement("p");
  const dueDate = document.createElement("p");
  const priority = document.createElement("p");

  title.classList.add("title");
  description.classList.add("description");
  dueDate.classList.add("due-date");
  priority.classList.add("priority");

  title.textContent = todo.getTitle();
  description.textContent = todo.getDescription();
  dueDate.textContent = todo.getDueDate();
  priority.textContent = todo.getPriority();

  toDoDiv.append(title, description, dueDate, priority);

  toDoContainer.appendChild(toDoDiv);
};
