import Task from "./Task";
import Storage from "./Storage";

export default class UI {
  static loadInbox() {
    const inbox = Storage.getProjectList().getProject("Inbox");
    this.renderTasksToContainer(inbox.getName());
  }

  // ADD TASK EVENT LISTENERS
  static initAddTaskButtons = () => {
    const openAddTaskPopupButton = document.querySelector(
      "#button-open-add-task-popup"
    );
    const closeAddTaskPopupButton = document.querySelector(
      "#button-close-add-task-popup"
    );
    const addTaskForm = document.querySelector("#form-add-task");

    openAddTaskPopupButton.addEventListener("click", UI.openAddTaskPopup);
    closeAddTaskPopupButton.addEventListener("click", UI.closeAddTaskPopup);
    addTaskForm.addEventListener("submit", UI.takeInput);
  };

  static openAddTaskPopup = () => {
    const modal = document.querySelector("#modal");
    modal.showModal();
  };

  static closeAddTaskPopup = () => {
    const modal = document.querySelector("#modal");
    modal.close();
  };

  static takeInput = () => {
    const addTaskForm = document.querySelector("#form-add-task");
    const title = addTaskForm.querySelector("#title").value;
    const description = addTaskForm.querySelector("#description").value;
    const dueDate = addTaskForm.querySelector("#due-date").value;

    const projectName = document.querySelector(".project-name");

    const taskObject = new Task(title, description, dueDate);

    if (projectName.innerText !== "Inbox") {
      Storage.addTask("Inbox", taskObject);
    }
    Storage.addTask(projectName.textContent, taskObject);

    UI.renderTasksToContainer(projectName.textContent);
  };

  // ADD PROJECT EVENT LISTENERS
  static initAddProjectButtons = () => {
    const addProjectButtons = document.querySelectorAll(".project");
    addProjectButtons.forEach((button) => {
      button.addEventListener("click", UI.renderProject);
    });
  };

  static renderProject = (event) => {
    const projectName = event.target.textContent;
    UI.renderTasksToContainer(projectName);
  };

  // TASK EVENT LISTENERS
  static initTaskFunctionButtons = () => {
    const notCompletedIcon = document.querySelectorAll(".icon-not-completed");
    const completedIcon = document.querySelectorAll(".icon-completed");
    const importantIcon = document.querySelectorAll(".icon-important");
    const notImportantIcon = document.querySelectorAll(".icon-not-important");

    notCompletedIcon.forEach((icon) => {
      icon.addEventListener("click", UI.changeCompletedStatus);
    });

    completedIcon.forEach((icon) => {
      icon.addEventListener("click", UI.changeCompletedStatus);
    });

    importantIcon.forEach((icon) => {
      icon.addEventListener("click", UI.changeImportance);
    });

    notImportantIcon.forEach((icon) => {
      icon.addEventListener("click", UI.changeImportance);
    });
  };

  static changeCompletedStatus = (event) => {
    const task = event.target.parentElement;
    const taskTitle = task.querySelector(".title").textContent;
    const projectName = document.querySelector(".project-name").textContent;
    const projectObject = Storage.getProjectList().getProject(projectName);

    const taskObject = projectObject.getTask(taskTitle);

    !taskObject.checkIfCompleted()
      ? Storage.updateTaskProperty(projectName, taskTitle, "completed", true)
      : Storage.updateTaskProperty(projectName, taskTitle, "completed", false);

    UI.renderTasksToContainer(projectName);
  };

  static changeImportance = (event) => {
    const task = event.target.parentElement;
    const taskTitle = task.querySelector(".title").textContent;
    const projectName = document.querySelector(".project-name").textContent;
    const projectObject = Storage.getProjectList().getProject(projectName);

    const taskObject = projectObject.getTask(taskTitle);

    !taskObject.checkIfImportant()
      ? Storage.updateTaskProperty(projectName, taskTitle, "importance", true)
      : Storage.updateTaskProperty(projectName, taskTitle, "importance", false);

    UI.renderTasksToContainer(projectName);
  };

  static renderTasksToContainer = (projectName) => {
    const projectList = Storage.getProjectList();
    const projectObject = projectList.getProject(projectName);

    const taskContainer = document.getElementById("task-container");
    const projectNameElem = document.querySelector(".project-name");

    const resetTaskContainer = () => {
      taskContainer.removeChild(projectNameElem);
      const taskDiv = document.querySelectorAll(".todo");
      taskDiv.forEach((task) => {
        task.remove();
      });

      projectNameElem.innerText = projectName;
      taskContainer.appendChild(projectNameElem);
    };

    resetTaskContainer();

    projectObject.getTasks().forEach((taskObject) => {
      const taskDiv = document.createElement("div");
      taskDiv.classList.add("todo");

      const titleElem = document.createElement("h1");
      const descriptionElem = document.createElement("p");
      const dueDateElem = document.createElement("p");

      const completeIcon = document.createElement("i");
      const importantIcon = document.createElement("i");

      titleElem.classList.add("title");
      descriptionElem.classList.add("description");
      dueDateElem.classList.add("due-date");

      titleElem.textContent = taskObject.getTitle();
      descriptionElem.textContent = taskObject.getDescription();
      dueDateElem.textContent = taskObject.getDueDate();

      taskObject.checkIfCompleted()
        ? completeIcon.classList.add("icon-completed")
        : completeIcon.classList.add("icon-not-completed");

      taskObject.checkIfCompleted()
        ? titleElem.classList.add("completed")
        : null;

      taskObject.checkIfCompleted()
        ? dueDateElem.classList.add("hidden")
        : null;

      taskObject.checkIfImportant()
        ? importantIcon.classList.add("icon-important")
        : importantIcon.classList.add("icon-not-important");

      taskDiv.appendChild(completeIcon);
      taskDiv.appendChild(titleElem);
      taskDiv.appendChild(descriptionElem);
      taskDiv.appendChild(dueDateElem);
      taskDiv.appendChild(importantIcon);

      taskContainer.appendChild(taskDiv);
    });
    UI.initTaskFunctionButtons();
  };
}
