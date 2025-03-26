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

    // Toggle todo completion
    const toggleComplete = (id) => {
      todos = todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      );
      saveTodos();
      renderTodos();
      updateStats();
    };

    // Render Todos
    const renderTodos = () => {
      todoList.innerHTML = "";
  
      if (todos.length === 0) {
        todoList.innerHTML = `<li class="empty-state">No tasks yet. Add a task to get started!</li>`;
        return;
      }
  
      todos.forEach((todo) => {
        const todoItem = document.createElement("li");
        todoItem.classList.add("todo-item");
        if (todo.completed) {
          todoItem.classList.add("completed");
        }
  
        todoItem.innerHTML = `
            <input type="checkbox" class="todo-checkbox" ${todo.completed ? "checked" : ""} />
            <span class="todo-text">${todo.text}</span>
            <div class="todo-actions">
                <button class="action-button complete-button">${todo.completed ? "↩" : "✓"}</button>
                <button class="action-button delete-button">×</button>
            </div>
        `;
  
        todoItem.querySelector(".todo-checkbox").addEventListener("change", () => toggleComplete(todo.id));
        todoItem.querySelector(".complete-button").addEventListener("click", () => toggleComplete(todo.id));
        todoItem.querySelector(".delete-button").addEventListener("click", () => deleteTodo(todo.id));
  
        todoList.appendChild(todoItem);
      });
    };

    // Update Stats
    const updateStats = () => {
      const totalTasks = todos.length;
      const completedTasks = todos.filter((todo) => todo.completed).length;
      const pendingTasks = totalTasks - completedTasks;
  
      totalTasksElement.textContent = totalTasks;
      completedTasksElement.textContent = completedTasks;
      pendingTasksElement.textContent = pendingTasks;
    };
  
    // Save Todos to Local Storage
    const saveTodos = () => localStorage.setItem("todos", JSON.stringify(todos));
  
    // Event Listeners for Todo Form
    todoForm.addEventListener("submit", addTodo);


    init();
  });
  