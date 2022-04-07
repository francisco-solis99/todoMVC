# Todo APP with Native JS

## What is the MVC?
MVC is one possib;e pattern for organizing your code. It's a popular one. It's important to say but this model is not a design pattern
![MVC graphic](https://resources.theframework.es/eduardoaf.com/20200917/mvc-modelo-vista-controlador.png)

Before the frameworks this could be the most used model to create aplications. Let's see what mean every letter in this model:

- **Model** - Manages the data of an application
- **View** - A visual representation of the model
- **Controller - Links the user and the system

## Apply this concepts to this project
- The **model** is the data. In this todo app, the data will be the todo list and the methods that will add, edit or delete them.
- The **view** is how the data is displayed into the UI. In this todo App, that will be the rendered HTML in the DOM and CSS.
- The **controller** connects the model and the view. It takes user input, such as clicking or typing and the handlers callbacks for user interactions.

**Note**: The model never touches the view and vice versa. The only who can touch them is the controller
