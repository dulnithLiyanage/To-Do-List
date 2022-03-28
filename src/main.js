import "./css/resets.css";
import "./css/Form.css";

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
