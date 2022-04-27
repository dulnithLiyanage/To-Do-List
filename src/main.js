import "./css/resets.css";
import "./css/Form.css";
import "./css/Sidebar.css";
import "./css/ToDo.css";

import UI from "./modules/UI";
import Storage from "./modules/Storage";

UI.loadInbox();
UI.initAddTaskButtons();
UI.initAddProjectButtons();
UI.initTaskFunctionButtons();

// Comment out when testing
// Storage.clearTasks("Inbox");
// Storage.clearTasks("Important");
