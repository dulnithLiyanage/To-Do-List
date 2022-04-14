import Project from "./Project";
import Task from "./Task";
import ProjectList from "./ProjectList";

export default class Storage {
  static saveProjectList(projectList) {
    localStorage.setItem("projectList", JSON.stringify(projectList));
  }

  static getProjectList() {
    const projectList = Object.assign(
      new ProjectList(),
      JSON.parse(localStorage.getItem("projectList"))
    );

    projectList.setProjects(
      projectList
        .getProjects()
        .map((project) => Object.assign(new Project(), project))
    );

    projectList.getProjects().forEach((project) => {
      project.setTasks(
        project.getTasks().map((task) => Object.assign(new Task(), task))
      );
    });

    return projectList;
  }

  static addProject(project) {
    const projectList = Storage.getProjectList();
    projectList.addProject(project);
    Storage.saveProjectList(projectList);
  }

  static deleteProject(projectName) {
    const projectList = Storage.getProjectList();
    projectList.deleteProject(projectName);
    Storage.saveProjectList(projectList);
  }

  static addTask(projectName, task) {
    const projectList = Storage.getProjectList();
    projectList.getProject(projectName).addTask(task);
    Storage.saveProjectList(projectList);
  }

  static deleteTask(projectName, taskName) {
    const projectList = Storage.getProjectList();
    projectList.getProject(projectName).deleteTask(taskName);
    Storage.saveProjectList(projectList);
  }

  static updateTaskProperty = (projectName, taskName, property, value) => {
    const projectList = Storage.getProjectList();
    projectList.getProject(projectName).getTask(taskName)[property] = value;
    Storage.saveProjectList(projectList);
  };

  static clearTasks(projectName) {
    const projectList = Storage.getProjectList();
    projectList.getProject(projectName).clearTasks();
    Storage.saveProjectList(projectList);
  }
}
