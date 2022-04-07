// Model is just for storing and modifying data, no DOM manipulation or events

export class Model {
  constructor() {
    // The state of the model, an array of todo objects, prepopulated with some data
    this.todos = [
      { id: 1, text: "Run a marathon", complete: false },
      { id: 2, text: "Plant a garden", complete: false },
    ];
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
  }

  editTodo(id, updateText) {
    this.todos = this.todos
      .map(element => element.id === id
        ? { id: element.id, text: updateText, complete: element.complete }
        : element);
  }

  deleteTodo(id) {
    this.todos = this.todos.filter(element => element.id !== id);
    // const todoIndex = this.todos.finIndex(element => element.id === id);
    // this.todos.splice(todoIndex, 1);
  }

  toggleTodo(id) {
    this.todos = this.todos
      .map(element => element.id === id
        ? { id: element.id, text: element.text, complete: !element.complete }
        : element);
  }
}
