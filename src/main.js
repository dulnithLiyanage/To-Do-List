import "./style.css";
import { Checklist } from "./modules/checklist";

const app = document.getElementById("app");
const button = document.createElement("button");
button.innerText = "Click me and look at the console!";
app.appendChild(button);

button.addEventListener("click", () => {
  const title = "Checklist";
  const description = "This is a description";
  const dueDate = "2020-01-01";
  const priority = "high";

  const checklist = Checklist(title, description, dueDate, priority);

  checklist.initiateChecklist();

  console.log(
    `%c  Title: ${checklist.getTitle()}
  Description: ${checklist.getDescription()}
  Due Date: ${checklist.getDueDate()}
  Priority: ${checklist.getPriority()}`,
    "color:cyan; font-size: 20px; font-family: 'Courier New', Courier, monospace;"
  );
});

// document.addEventListener("DOMContentLoaded", () => {
//   const checklist = Checklist(
//     "Make A To Do List",
//     "Make a list of things to do",
//     "2020-01-01",
//     "high"
//   );

//   checklist.initiateChecklist();

// });
