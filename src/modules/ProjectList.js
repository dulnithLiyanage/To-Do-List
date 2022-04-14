import Project from "./Project";

export default class App {
  constructor() {
    this.projects = [];
    this.projects.push(new Project("Inbox"));
    this.projects.push(new Project("Important"));
  }

  setProjects(projects) {
    this.projects = projects;
  }

  getProjects() {
    return this.projects;
  }

  getProject(projectName) {
    return this.projects.find((project) => project.getName() === projectName);
  }

  contains(projectName) {
    return this.projects.some((project) => project.getName() === projectName);
  }

  addProject(newProject) {
    if (this.projects.find((project) => project.getName() === newProject.name))
      return;
    this.projects.push(newProject);
  }

  deleteProject(projectName) {
    this.projects = this.projects.filter(
      (project) => project.name !== projectName
    );
  }
}
