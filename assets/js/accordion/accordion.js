import AccordionView from "./accordion.view.js";

export default class Accordion {
    constructor() {
        this.view = new AccordionView();

        this.view.onClickOnAccordionHeader(($accordion) => {
            if (this.view.isAccordionOpen($accordion)) {
                this.view.closeAccordion($accordion);
            } else {
                this.view.openAccordion($accordion);
            }
        });          
    }
}
