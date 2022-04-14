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

    const collectionName = document.querySelector(".collection-name");

    const todo = ToDo(title, description, dueDate);

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

export const taskCompletedClick = (
  todoObject,
  toDoDiv,
  star,
  dueDate,
  circle
) => {
  circle.addEventListener("click", () => {
    const importantCollection = ListOfCollections[1];
    const collectionName = document.querySelector(".collection-name");

    const title = toDoDiv.querySelector(".title");
    const toDoContainer = document.querySelector(".todo-container");

    const ListOfClasses = [...circle.classList];

    if (ListOfClasses.includes("icon-circle")) {
      circle.classList.remove("icon-circle");
      circle.classList.add("icon-check");

      title.classList.add("completed");
      star.classList.add("hidden");
      dueDate.classList.add("hidden");

      todoObject.complete();

      todoObject.unPrioritize();
      importantCollection.removeTask(todoObject);

      if (collectionName.textContent === "Important") {
        toDoContainer.removeChild(toDoDiv);
      }
    } else if (ListOfClasses.includes("icon-check")) {
      circle.classList.remove("icon-check");
      circle.classList.add("icon-circle");

      title.classList.remove("completed");
      star.classList.remove("hidden");
      dueDate.classList.remove("hidden");

      todoObject.undoComplete();
    }
  });
};

export const taskMakeImportant = (todoObject, toDoDiv, star) => {
  star.addEventListener("click", () => {
    const importantCollection = ListOfCollections[1];
    const collectionName = document.querySelector(".collection-name");

    const toDoContainer = toDoDiv.parentNode;

    const ListOfClasses = [...star.classList];

    if (ListOfClasses.includes("icon-star")) {
      star.classList.remove("icon-star");
      star.classList.add("icon-star-fill");
      todoObject.prioritize();
      importantCollection.addTask(todoObject);
    } else if (ListOfClasses.includes("icon-star-fill")) {
      star.classList.remove("icon-star-fill");
      star.classList.add("icon-star");

      todoObject.unPrioritize();
      importantCollection.removeTask(todoObject);

      if (collectionName.textContent === "Important") {
        toDoContainer.removeChild(toDoDiv);
      }
    }
  });
};
