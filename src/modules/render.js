import "../css/ToDo.css";
import { ListOfCollections } from "./components";
import { taskCompletedClick, taskMakeImportant } from "./eventListeners";

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
    collection_object.getTasks().forEach((todoObject) => {
      const isNewCollection = true;
      renderTask(
        todoObject,
        collection_object,
        newCollectionName,
        isNewCollection
      );
    });
  }
};

// Renders the todos into the dom individually
export const renderTask = (
  todoObject,
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

  const circle = document.createElement("i");
  const star = document.createElement("i");

  title.classList.add("title");
  description.classList.add("description");
  dueDate.classList.add("due-date");

  // To find out whether the todo has been completed or not
  circle.classList.add("icon-circle");
  star.classList.add("icon-star");

  title.textContent = todoObject.getTitle();
  description.textContent = todoObject.getDescription();
  dueDate.textContent = todoObject.getDueDate();

  const inbox = ListOfCollections[0];
  if (collection_object.getCollectionName() === collectionName.textContent) {
    // Collection object only gets updated if a new collection is not clicked
    // This prevents renderCollection from rendering twice the amount of tasks
    if (!isNewCollection) {
      // If the todo is not in the inbox, it is added to the inbox
      if (collectionName.textContent !== "Inbox") {
        inbox.addTask(todoObject);
      }
      // Added to the current collection
      collection_object.addTask(todoObject);
    }

    toDoDiv.appendChild(circle);
    toDoDiv.append(title, description, dueDate);
    toDoDiv.appendChild(star);
    toDoContainer.appendChild(toDoDiv);
  }

  if (todoObject.checkIfCompleted()) {
    circle.classList.remove("icon-circle");
    circle.classList.add("icon-check");
    title.classList.add("completed");
    star.classList.add("hidden");
    todoObject.unPrioritize();
    dueDate.classList.add("hidden");
  }

  if (collectionName.textContent === "Important") {
    todoObject.prioritize();
    star.classList.add("icon-star-fill");
  }

  if (todoObject.checkIfImportant()) {
    star.classList.remove("icon-star");
    star.classList.add("icon-star-fill");
  }

  taskCompletedClick(todoObject, toDoDiv, star, dueDate, circle);
  taskMakeImportant(todoObject, toDoDiv, star);
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
