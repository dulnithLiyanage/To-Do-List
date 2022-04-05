import { ToDo, Collection, ListOfCollections } from "./components";
import { renderTask, renderCollection, createProject } from "./render";

export const eventInitalizeCollections = (collection) => {
  const collection_object = Collection(collection.innerText, []);
  ListOfCollections.push(collection_object);

  // Assigns an id to the collection
  collection.id = ListOfCollections.indexOf(collection_object);

  const form = document.querySelector(".form");
  eventAddTask(form, collection_object);
};

export const eventRenderCollection = (collection) => {
  collection.addEventListener("click", () => {
    const sidebar = document.querySelector(".sidebar");

    sidebar.classList.add("hide-sidebar");

    // Gets the collection from the list of collections
    const collectionID = parseInt(collection.id);
    const collection_object = ListOfCollections[collectionID];
    renderCollection(collection_object);
  });
};

export const eventAddTask = (form, collection_object) => {
  form.addEventListener("submit", () => {
    const title = form.querySelector("#title").value;
    const description = form.querySelector("#description").value;
    const dueDate = form.querySelector("#due-date").value;
    const priority = form.querySelector("#priority").value;

    const collectionName = document.querySelector(".collection-name");

    const todo = ToDo(title, description, dueDate, priority);

    const isNewCollection = false;

    renderTask(todo, collection_object, collectionName, isNewCollection);
  });
};

export const eventCreateProject = (addProject) => {
  addProject.addEventListener("click", () => {
    createProject(addProject);
    eventAddProjectButton(addProject);
    eventCancelProjectButton(addProject);
  });
};

export const eventAddProjectButton = (addProject) => {
  const projects = document.querySelector(".projects");
  const projectName = document.querySelector(".project-name-input");
  const addButton = document.querySelector(".add-button");
  const cancelButton = document.querySelector(".cancel-button");
  const container = document.querySelector(".add-project-container");

  addButton.addEventListener("click", () => {
    const collection = document.createElement("li");
    collection.classList.add("collection");
    collection.textContent = projectName.value;
    projects.appendChild(collection);

    projectName.value = "";
    container.removeChild(projectName);
    container.removeChild(addButton);
    container.removeChild(cancelButton);
    addProject.classList.remove("hidden");

    // Adds an event listener to the newly created collection
    eventInitalizeCollections(collection);
    eventRenderCollection(collection);
  });
};

export const eventCancelProjectButton = (addProject) => {
  const projectName = document.querySelector(".project-name-input");
  const addButton = document.querySelector(".add-button");
  const cancelButton = document.querySelector(".cancel-button");
  const container = document.querySelector(".add-project-container");

  cancelButton.addEventListener("click", () => {
    container.removeChild(projectName);
    container.removeChild(addButton);
    container.removeChild(cancelButton);
    addProject.classList.remove("hidden");
  });
};

export const eventOpenButton = (button, modal) => {
  button.addEventListener("click", () => {
    modal.showModal();
  });
};

export const eventCloseModal = (button, modal) => {
  button.addEventListener("click", () => {
    modal.close();
  });
};

export const eventCloseSidebar = (button, sidebar) => {
  button.addEventListener("click", () => {
    sidebar.classList.add("hide-sidebar");
  });
};

export const eventOpenSidebar = (button, sidebar) => {
  button.addEventListener("click", () => {
    sidebar.classList.remove("hide-sidebar");
  });
};
