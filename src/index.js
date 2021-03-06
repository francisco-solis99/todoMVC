import { Controller } from "./modules/Controller.mjs";
import { View } from "./modules/View.mjs";
import { Model } from "./modules/Model.mjs";

// app will be instance of teh controller
const app = new Controller(new Model(), new View());
console.log(app);
