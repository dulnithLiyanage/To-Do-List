import Task from "./Task";
import Storage from "./Storage";
import Project from "./Project";

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

    const projectName = document.querySelector(".project-name").textContent;

    const taskObject = new Task(title, description, dueDate);
    taskObject.setParentProject(projectName);

    if (projectName === "Important") {
      taskObject.setImportance(true);
    }

    if (projectName !== "Inbox") {
      Storage.addTask("Inbox", taskObject);
    }

    Storage.addTask(projectName, taskObject);

    UI.renderTasksToContainer(projectName);
  };

  // SHOW ADDED PROJECTS IN SIDEBAR
  static addNonDefaultProjects = () => {
    const projectList = Storage.getProjectList().projects;

    const nonDefaultProjects = projectList.filter((project) => {
      return project.isDefault === false;
    });

    const projects = document.querySelector(".projects");

    nonDefaultProjects.forEach((nonDefaultProject) => {
      const project = document.createElement("li");
      project.classList.add("project");
      project.textContent = nonDefaultProject.getName();
      projects.appendChild(project);
    });

    this.initRenderProjectButtons();
  };

  // OPEN SIDEBAR
  static initOpenSidebarIcon = () => {
    const openSidebarIcon = document.querySelector("#open-sidebar");

    openSidebarIcon.addEventListener("click", UI.openSidebar);
  };

  static openSidebar = () => {
    const sidebar = document.querySelector(".sidebar");
    sidebar.classList.remove("hide-sidebar");
  };

  // CLOSE SIDEBAR ICON
  static initCloseSidebarIcon = () => {
    const closeSidebarIcon = document.querySelector("#close-sidebar");

    closeSidebarIcon.addEventListener("click", UI.closeSidebar);
  };

  static closeSidebar = () => {
    const sidebar = document.querySelector(".sidebar");
    sidebar.classList.add("hide-sidebar");
  };

  // RENDER PROJECT EVENT LISTENERS
  static initRenderProjectButtons = () => {
    const renderProjectButtons = document.querySelectorAll(".project");
    renderProjectButtons.forEach((button) => {
      button.addEventListener("click", UI.renderProject);
      button.addEventListener("click", UI.closeSidebar);
    });
  };

  static renderProject = (event) => {
    const projectName = event.target.textContent;
    UI.renderTasksToContainer(projectName);
  };

  // ADD PROJECT EVENT LISTENERS
  static initAddProjectButton = () => {
    const addProjectButton = document.querySelector(".add-project");
    addProjectButton.addEventListener("click", UI.addProjectSelection);
  };

  static addProjectSelection = () => {
    const addProjectButton = document.querySelector(".add-project");
    const form = document.createElement("form");
    const projectName = document.createElement("input");
    const addButton = document.createElement("button");
    const cancelButton = document.createElement("button");
    const container = document.querySelector(".add-project-container");

    form.setAttribute("method", "dialog");
    form.classList.add("add-project-form");
    // Prevents the form from submitting
    form.setAttribute("onsubmit", "return false;");

    projectName.classList.add("project-name-input");
    projectName.placeholder = "Project Name";
    projectName.setAttribute("required", true);

    addButton.classList.add("add-button");
    addButton.textContent = "Add";
    addButton.setAttribute("type", "submit");

    cancelButton.classList.add("cancel-button");
    cancelButton.textContent = "Cancel";
    cancelButton.setAttribute("type", "button");

    addProjectButton.classList.add("hidden");
    form.appendChild(projectName);
    form.appendChild(addButton);
    form.appendChild(cancelButton);

    container.appendChild(form);

    UI.initAddOrCancelButtons();
  };

  static initAddOrCancelButtons = () => {
    const form = document.querySelector(".add-project-form");
    const cancelButton = document.querySelector(".cancel-button");

    form.addEventListener("submit", UI.createProject);
    cancelButton.addEventListener("click", UI.cancelProjectCreation);
  };

  static createProject = () => {
    const projectName = document.querySelector(".project-name-input");
    const form = document.querySelector(".add-project-form");

    form.remove();

    const addProjectButton = document.querySelector(".add-project");
    addProjectButton.classList.toggle("hidden");

    const projects = document.querySelector(".projects");

    const project = document.createElement("li");
    project.classList.add("project");
    project.textContent = projectName.value;
    projects.appendChild(project);

    this.initRenderProjectButtons();

    const projectObject = new Project(project.textContent);
    projectObject.isDefault = false;

    Storage.addProject(projectObject);
  };

  static cancelProjectCreation = () => {
    const form = document.querySelector(".add-project-form");

    form.remove();

    const addProjectButton = document.querySelector(".add-project");
    addProjectButton.classList.toggle("hidden");
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
    const parentProjectOfTask = taskObject.getParentProject();

    if (taskObject.checkIfCompleted()) {
      taskObject.unCompleteTask();
      Storage.updateTask(projectName, taskObject);
    } else {
      taskObject.completeTask();
      if (taskObject.checkIfImportant()) {
        taskObject.setImportance(false);
      }
      Storage.updateTask(projectName, taskObject);
    }

    if (projectName === "Inbox") {
      Storage.updateTask(parentProjectOfTask, taskObject);
    } else {
      Storage.updateTask("Inbox", taskObject);
    }

    if (projectName === "Important") {
      if (parentProjectOfTask !== "Inbox") {
        Storage.updateTask(parentProjectOfTask, taskObject);
        Storage.updateTask("Inbox", taskObject);
      } else {
        Storage.updateTask("Inbox", taskObject);
      }
    }

    if (taskObject.checkIfCompleted()) {
      Storage.deleteTask("Important", taskObject);
    }

    UI.renderTasksToContainer(projectName);
  };

  static changeImportance = (event) => {
    const task = event.target.parentElement;
    const taskTitle = task.querySelector(".title").textContent;
    const projectName = document.querySelector(".project-name").textContent;
    const projectObject = Storage.getProjectList().getProject(projectName);

    const taskObject = projectObject.getTask(taskTitle);
    const parentProjectOfTask = taskObject.getParentProject();

    if (taskObject.checkIfImportant()) {
      taskObject.setImportance(false);
      Storage.updateTask(projectName, taskObject);
    } else {
      taskObject.setImportance(true);
      Storage.updateTask(projectName, taskObject);
    }

    if (projectName === "Inbox") {
      Storage.updateTask(parentProjectOfTask, taskObject);
    } else {
      Storage.updateTask("Inbox", taskObject);
    }

    if (projectName !== "Important") {
      if (taskObject.checkIfImportant()) {
        Storage.addTask("Important", taskObject);
      } else {
        Storage.deleteTask("Important", taskObject);
      }
    } else {
      if (!taskObject.checkIfImportant()) {
        Storage.deleteTask(projectName, taskObject);
      }
    }

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

      projectNameElem.textContent = projectName;
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

      if (taskObject.checkIfCompleted()) {
        completeIcon.classList.add("icon-completed");

        titleElem.classList.add("completed");
        dueDateElem.classList.add("hidden");
        importantIcon.classList.add("hidden");
      } else {
        completeIcon.classList.add("icon-not-completed");
      }

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
