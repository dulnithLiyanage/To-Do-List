export const Checklist = (title, description, dueDate, priority) => {
  const initiateChecklist = () => {
    return {
      title,
      description,
      dueDate,
      priority,
    };
  };

  const getTitle = () => title;
  const getDescription = () => description;
  const getDueDate = () => dueDate;
  const getPriority = () => priority;

  return {
    initiateChecklist,
    getTitle,
    getDescription,
    getDueDate,
    getPriority,
  };
};
