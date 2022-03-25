import { ToDo } from "./todo";
import { renderTask } from "./render";

export const eventOpenButton = (button, modal) => {
  button.addEventListener("click", () => {
    modal.showModal();
  });
};

export const eventCloseButton = (button, modal) => {
  button.addEventListener("click", () => {
    modal.close();
  });
};

export const eventAddTask = (form) => {
  form.addEventListener("submit", () => {
    const title = form.querySelector("#title").value;
    const description = form.querySelector("#description").value;
    const dueDate = form.querySelector("#due-date").value;
    const priority = form.querySelector("#priority").value;

    const todo = ToDo(title, description, dueDate, priority);
    renderTask(todo);
  });
};
