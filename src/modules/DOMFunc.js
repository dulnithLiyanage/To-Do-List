import {
  eventOpenButton,
  eventCloseButton,
  eventAddTask,
} from "./eventListeners";

export const openModal = () => {
  const openModalButton = document.querySelector("#open-modal");
  const modal = document.querySelector("#modal");

  eventOpenButton(openModalButton, modal);
};

export const closeModal = () => {
  const closeModalButton = document.querySelector("#close-modal");
  const modal = document.querySelector("#modal");

  eventCloseButton(closeModalButton, modal);
};

export const createChecklist = () => {
  const form = document.querySelector("#form");

  eventAddTask(form);
};
