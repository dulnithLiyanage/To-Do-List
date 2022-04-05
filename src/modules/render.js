import "../css/ToDo.css";

// Renders the collection of todos into the dom
export const renderCollection = (collection_object) => {
  const toDoContainer = document.getElementById("todo-container");

  const oldCollectionName = toDoContainer.querySelector(".collection-name");
  toDoContainer.removeChild(oldCollectionName);

  const todos = toDoContainer.querySelectorAll(".todo") ?? [];

  todos.forEach((todo) => {
    toDoContainer.removeChild(todo);
  });

  const newCollectionName = document.createElement("h1");

  newCollectionName.textContent = collection_object.getCollectionName();
  newCollectionName.classList.add("collection-name");

  toDoContainer.appendChild(newCollectionName);

  if (collection_object.getCollectionName() === newCollectionName.textContent) {
    collection_object.getTasks().forEach((todo) => {
      const isNewCollection = true;
      renderTask(todo, collection_object, newCollectionName, isNewCollection);
    });
  }
};

// Renders the todos into the dom individually
export const renderTask = (
  todo,
  collection_object,
  collectionName,
  isNewCollection
) => {
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

  if (collection_object.getCollectionName() === collectionName.textContent) {
    if (isNewCollection) {
      toDoDiv.append(title, description, dueDate, priority);
      toDoContainer.appendChild(toDoDiv);
    } else if (!isNewCollection) {
      collection_object.addTask(todo);

      toDoDiv.append(title, description, dueDate, priority);
      toDoContainer.appendChild(toDoDiv);
    }
  }
};

// Creates a new project
export const createProject = (addProject) => {
  const projectName = document.createElement("input");
  const addButton = document.createElement("button");
  const cancelButton = document.createElement("button");
  const container = document.querySelector(".add-project-container");

  projectName.classList.add("project-name-input");
  projectName.placeholder = "Project Name";
  addButton.classList.add("add-button");
  addButton.textContent = "Add";
  cancelButton.classList.add("cancel-button");
  cancelButton.textContent = "Cancel";

  addProject.classList.add("hidden");
  container.appendChild(projectName);
  container.appendChild(addButton);
  container.appendChild(cancelButton);
};
