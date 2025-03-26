document.addEventListener("DOMContentLoaded", () => {
    // Elements
  
    const todoForm = document.getElementById("todoForm");
    const todoInput = document.getElementById("todoInput");
    const todoList = document.getElementById("todoList");
    const totalTasksElement = document.getElementById("totalTasks");
    const completedTasksElement = document.getElementById("completedTasks");
    const pendingTasksElement = document.getElementById("pendingTasks");
  
    // Load Todos from Local Storage
    let todos = JSON.parse(localStorage.getItem("todos")) || [];
    
  
    // Initialize App
    const init = () => {
      renderTodos();
      updateStats();
    };

    
    init();
  });
  