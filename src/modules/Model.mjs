// Model is just for storing and modifying data, no DOM manipulation or events

export class Model {
  constructor() {
    // The state of the model, an array of todo objects, prepopulated with some data
    this.todos = JSON.parse(localStorage.getItem("todoTasks")) ?? [];
    this.onTodoListChanged = null;
  }

  // Methods
  /* We have an addTodo, editTodo, deleteTodo, and toggleTodo. These should all be very self explanatory - add appends a new todo to the array, edit finds the id of the todo to edit and replaces it, delete filters a todo out of the array, and toggle switches the complete boolean property. */

  addTodo(todoText) {
    const todo = {
      id: this.todos.length > 0 ? this.todos[this.todos.length - 1].id + 1 : 1,
      text: todoText,
      complete: false
    };

    this.todos.push(todo);
    // save the changes
    this.saveTasks();
    // emit the action to change the UI
    this.onTodoListChanged(todo, "addTodo");
    console.log(this.todos);
  }

  editTodo(id, updateText) {
    this.todos = this.todos
      .map(element => element.id === id
        ? { id: element.id, text: updateText, complete: element.complete }
        : element);
    // save the changes
    this.saveTasks();

    // emit the action to change the UI
    this.onTodoListChanged(this.findTask(id));
    console.log(this.todos);
  }

  deleteTodo(id) {
    const todoTemp = this.findTask(id);
    this.todos = this.todos.filter(element => element.id !== id);
    this.saveTasks();

    // emit the action to change the UI
    this.onTodoListChanged(todoTemp, "deleteTodo");
    console.log(this.todos);
  }

  findTask(id) {
    return this.todos.find(item => item.id === id);
  }

  toggleTodo(id) {
    this.todos = this.todos
      .map(element => element.id === id
        ? { id: element.id, text: element.text, complete: !element.complete }
        : element);
    // save the changes
    this.saveTasks();

    // emit the action to change the UI
    this.onTodoListChanged(this.findTask(id), "checkedTodo");
    console.log(this.todos);
  }

  saveTasks() {
    // save the changes
    localStorage.setItem("todoTasks", JSON.stringify(this.todos));
  }

  // We already made the onTodoListChanged method on the controller to deal with this, we just have to make the model aware of it. We'll bind it to the model the same way we did with the handlers on the view.

  bindTodoListChanged(callback) {
    this.onTodoListChanged = callback;
  }
}
