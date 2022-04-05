import "./css/resets.css";
import "./css/Form.css";
import "./css/Sidebar.css";
import "./css/ToDo.css";

import {
  closeModalOnClick,
  openModalOnClick,
  closeSidebarOnClick,
  openSidebarOnClick,
  renderCollectionOnClick,
  createProjectOnClick,
  initializeDefaultCollections,
} from "./modules/DOMFunc";

openModalOnClick();
closeModalOnClick();
openSidebarOnClick();
closeSidebarOnClick();
initializeDefaultCollections();
renderCollectionOnClick();
createProjectOnClick();
