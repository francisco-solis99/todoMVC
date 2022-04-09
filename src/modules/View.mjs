/* Neither the controller nor the model should know anything about the DOM, HTML elements, CSS, or any of that. Anything relating to it should be in the view, like de DOM manipulation */

export class View {
  constructor() {
    // set up all the things I need for my view

    // root element
    this.app = this.getElement("#app");

    // title of the app
    this.title = this.createElement("h1");
    this.title.textContent = "Todos";

    // The form with a [type = text] input and a submit button
    this.form = this.createElement("form");

    this.input = this.createElement("input");
    this.input.type = "text";
    this.input.placeholder = "Add todo";
    this.input.name = "todo";

    this.submitButton = this.createElement("button");
    this.submitButton.textContent = "Submit";

    // The visual representation of the todo list
    this.todoList = this.createElement("ul", "todo-list");

    // Append the input and submit button to the form
    this.form.append(this.input, this.submitButton);

    // Append the title, form, and todo list to the app
    this.app.append(this.title, this.form, this.todoList);
  }

  // handlers
  bindAddTodo(handler) {
    this.form.addEventListener("submit", event => {
      event.preventDefault();
      if (this._todoText) {
        handler(this._todoText);
        this._resetForm();
      }
    });
  }

  bindDeleteTodo(handler) {
    this.todoList.addEventListener("click", event => {
      if (event.target.className !== "delete") return;
      const id = parseInt(event.target.parentElement.id);
      handler(id);
    });
  }

  bindToggleTodo(handler) {
    this.todoList.addEventListener("change", event => {
      if (event.target.type !== "checkbox") return;
      const id = parseInt(event.target.parentElement.id);
      handler(id);
    });
  }

  // create an element with a optional CSS class
  createElement(tag, className) {
    const element = document.createElement(tag);
    if (element) element.classList.add(className);

    return element;
  }

  // Retrive an element from the DOM
  getElement(selector) {
    const element = document.querySelector(selector);
    return element;
  }

  // underscores in the method names to signify that they're private (local) methods that won't be used outside of the class.
  // getter fo the input (new todo) value
  get _todoText() {
    return this.input.value;
  }

  // resetter of the form
  _resetForm() {
    this.form.reset();
  }

  // create the HTML todo
  createTodo(todo) {
    const todoCheckIndicator = todo.complete ? "checked" : "";
    const classText = todo.complete ? "is-completed" : "";
    const liTodo = document.createElement("li");
    liTodo.id = todo.id;
    liTodo.innerHTML = `
      <input type="checkbox" ${todoCheckIndicator}>
      <p class="${classText}">${todo.text}</p>
      <button class="delete">Delete</button>
    `;
    return liTodo;
  }

  renderTodos(todos) {
    this.todoList.innerHTML = "";
    // we'll check if any todos exist. If they don't, we'll display an empty list message.
    if (!todos.length) {
      const p = this.createElement("p");
      p.textContent = "Nothing to do😀!";
      this.todoList.appendChild(p);
      return;
    }
    // craete a fragment to add the todos in it, in this way in the end we just make one render addding the fragment to the DOM
    const fragment = document.createDocumentFragment();

    // For optimize the render and avoid to delete all and render all in every single change
    // const idTodosInScreen = [...this.todoList.querySelectorAll("li")].map(item => Number(item.id));
    // console.log(idTodosInScreen);
    // const todosToRender = !idTodosInScreen.length ? todos : todos.filter(item => !idTodosInScreen.includes(item.id));

    // console.log(todosToRender);

    todos.forEach(todo => {
      const todoItem = this.createTodo(todo);
      // append each todo to the fragment
      fragment.appendChild(todoItem);
    });

    // other way
    // const htmlTodos = todos.map(element =>
    //   `
    //   <li id="${element.id}">
    //     <input type="checkbox" ${element.complete ? "checked" : ""}>
    //     <p class="${element.complete ? "is-completed" : ""}">${element.text}</p>
    //     <button class="delete">Delete</button>
    //   </li>
    //     `
    // ).join("");
    // use innerHTML in the html element to insert these items

    // Append the fragment to the todo list
    this.todoList.appendChild(fragment);
  }
}
