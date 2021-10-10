export default class AccordionView {
    constructor() {
        this.$accordions = $(".accordion");
        this.$panels = $(".panel");
        this.transitionDurationMilliSeconds = 600;
    }

    onClickOnAccordionHeader = (callback) => {
        this.$accordions.off("click").on("click", function (event) {
            let $accordion = $(this);
            callback($accordion);
            event.preventDefault();
        });
    };

    isAccordionOpen = ($accordion) => {
        let outcome = false;
        if($accordion.hasClass("active")) {
            outcome = true;
        }

        return outcome;
    }

    openAccordion = ($accordion) => {
        this.closeAllAccordions();
        $accordion.addClass("active");
        var panel = $accordion.next();
        $(panel).slideDown(this.transitionDurationMilliSeconds);
    }

    closeAccordion = ($accordion) => {
        $accordion.removeClass("active");
        var panel = $accordion.next();
        $(panel).slideUp(this.transitionDurationMilliSeconds);
    }

    closeAllAccordions = () => {
        this.$accordions.removeClass("active");
        this.$panels.slideUp(this.transitionDurationMilliSeconds);
    }
}
