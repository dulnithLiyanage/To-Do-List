import "./css/resets.module.css";
import {
  renderToDoContainer,
  closeModalOnClick,
  createTaskOnClick,
  openModalOnClick,
} from "./modules/DOMFunc";

renderToDoContainer();
openModalOnClick();
closeModalOnClick();
createTaskOnClick();
