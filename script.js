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

    // Add a new todo
    const addTodo = (e) => {
      e.preventDefault();
  
      const todoText = todoInput.value.trim();
      if (todoText === "") {
        todoInput.style.animation = "shake 0.5s";
        setTimeout(() => (todoInput.style.animation = ""), 500);
        return;
      }
  
      const newTodo = {
        id: Date.now().toString(),
        text: todoText,
        completed: false,
      };
  
      todos.unshift(newTodo);
      saveTodos();
      renderTodos();
      updateStats();
  
      todoInput.value = "";
      todoInput.focus();
    };

    // Delete a todo
    const deleteTodo = (id) => {
      todos = todos.filter((todo) => todo.id !== id);
      saveTodos();
      renderTodos();
      updateStats();
    };


    init();
  });
  