export class Controller {
  constructor(model, view) {
    // takes in the model and view
    this.model = model;
    this.view = view;

    // binding the todoList when changes to the model
    this.model.bindTodoListChanged(this.onTodoListChanged);

    // binding the handlers of the events to the view
    this.view.bindAddTodo(this.handleAddTodo);
    this.view.bindDeleteTodo(this.handleDeleteTodo);
    this.view.bindToggleTodo(this.handleToggleTodo);

    // We can also call it once in the constructor to display the initial todos if there are any.
    this.onTodoListChanged(this.model.todos);
  }

  // method that calls displayTodos every time a todo changes
  onTodoListChanged = (todos) => this.view.renderTodos(todos);

  // handlers for the evets after the are fired.
  // The view must listen for those events because they're user input of the view, but it will dispatch the responsibility of what will happen in response to the event to the controller.
  handleAddTodo = (todoText) => {
    this.model.addTodo(todoText);
  };

  handleEditTodo = (id, todoText) => {
    this.model.editTodo(id, todoText);
  };

  handleDeleteTodo = (id) => this.model.deleteTodo(id);

  handleToggleTodo = (id) => this.model.toggleTodo(id);
}
