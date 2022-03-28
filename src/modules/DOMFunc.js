import {
  eventOpenButton,
  eventCloseButton,
  eventAddTask,
} from "./eventListeners";

export const openModalOnClick = () => {
  const openModalButton = document.querySelector("#open-modal");
  const modal = document.querySelector("#modal");

  eventOpenButton(openModalButton, modal);
};

export const closeModalOnClick = () => {
  const closeModalButton = document.querySelector("#close-modal");
  const modal = document.querySelector("#modal");

  eventCloseButton(closeModalButton, modal);
};

export const createTaskOnClick = () => {
  const form = document.querySelector("#form");

  eventAddTask(form);
};
