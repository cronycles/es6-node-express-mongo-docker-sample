import Accordion from "./accordion/accordion.js";
import FormManager from "./form/form.manager.js";
import Navbar from "./navbar.js";

export default class Index {
    constructor() {
        new Accordion();
        new Navbar();
        new FormManager();
    }
}
