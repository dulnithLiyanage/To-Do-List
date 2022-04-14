import {
  eventOpenButton,
  eventCloseModal,
  eventOpenSidebar,
  eventCloseSidebar,
  eventCreateProject,
  eventRenderCollection,
  eventInitalizeCollections,
} from "./eventListeners";

export const initializeDefaultCollections = () => {
  const collections = document.querySelectorAll(".collection");

  collections.forEach((collection) => {
    eventInitalizeCollections(collection);
  });
};

export const renderCollectionOnClick = () => {
  const collections = document.querySelectorAll(".collection");
  console.log(collections);
  collections.forEach((collection) => {
    eventRenderCollection(collection);
  });
};

export const openModalOnClick = () => {
  const openModalButton = document.querySelector("#open-modal");
  const modal = document.querySelector("#modal");

  eventOpenButton(openModalButton, modal);
};

export const closeModalOnClick = () => {
  const closeModalButton = document.querySelector("#close-modal");
  const modal = document.querySelector("#modal");

  eventCloseModal(closeModalButton, modal);
};

export const openSidebarOnClick = () => {
  const openSidebarButton = document.querySelector("#open-sidebar");
  const sidebar = document.querySelector(".sidebar");

  eventOpenSidebar(openSidebarButton, sidebar);
};

export const closeSidebarOnClick = () => {
  const closeSidebarButton = document.querySelector("#close-sidebar");
  const sidebar = document.querySelector(".sidebar");

  eventCloseSidebar(closeSidebarButton, sidebar);
};

export const createProjectOnClick = () => {
  const addProject = document.querySelector(".add-project");

  eventCreateProject(addProject);
};
