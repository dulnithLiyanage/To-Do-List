import style from "../style.css";

export const renderTask = (todo) => {
  const toDoContainer = document.getElementById("checklist-container");
  const toDoDiv = document.createElement("div");
  toDoDiv.classList.add("checklist");

  const title = document.createElement("h1");
  const description = document.createElement("p");
  const dueDate = document.createElement("p");
  const priority = document.createElement("p");

  title.classList.add("title");
  description.classList.add("description");
  dueDate.classList.add("dueDate");
  priority.classList.add("priority");

  title.textContent = todo.getTitle();
  description.textContent = todo.getDescription();
  dueDate.textContent = todo.getDueDate();
  priority.textContent = todo.getPriority();

  toDoDiv.append(title, description, dueDate, priority);

  toDoContainer.appendChild(toDoDiv);
};
