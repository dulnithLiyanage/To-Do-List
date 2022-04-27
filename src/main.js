import "./css/resets.css";
import "./css/Form.css";
import "./css/Sidebar.css";
import "./css/ToDo.css";

import UI from "./modules/UI";

UI.loadInbox();
UI.initAddTaskButtons();
UI.addNonDefaultProjects();
UI.initRenderProjectButtons();
UI.initAddProjectButton();
UI.initTaskFunctionButtons();
