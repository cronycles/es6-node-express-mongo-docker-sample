import FormValidator from "./form.validator.js";

export default class DragAndDropArea {
    constructor() {
        this.files = [];
        this.validator = new FormValidator();

        // preventing page from redirecting
        $("html").on("dragover", function (e) {
            e.preventDefault();
            e.stopPropagation();
        });

        $("html").on("drop", function (e) {
            e.preventDefault();
            e.stopPropagation();
        });

        // Drag enter
        $(".upload-area").on("dragenter", function (e) {
            e.stopPropagation();
            e.preventDefault();
        });

        // Drag over
        $(".upload-area").on("dragover", function (e) {
            e.stopPropagation();
            e.preventDefault();
        });

        // Drop
        $(".upload-area").on("drop", (e) => {
            e.stopPropagation();
            e.preventDefault();

            var file = e.originalEvent.dataTransfer.files[0];
            this.processFile(file);
        });

        // Open file selector on div click
        $(".uploadFile")
            .off("click")
            .on("click", function () {
                $("#file").trigger("click");
            });

        // file selected
        $("#file")
            .off("change")
            .on("change", () => {
                var file = $("#file")[0].files[0];
                this.processFile(file);
            });
    }

    processFile = (file) => {
        const $input = $(".jfile .not-valid").hide();
        const isValid = this.validator.validateFile(file);
        if (isValid) {
            this.files.push(file);
            let arrayPositionId = this.files.length - 1;
            this.createThumbnail(file, arrayPositionId);
        } else {
            const $input = $(`input[name=file]`);
            const $errorTextDiv = $input.nextAll(".not-valid:first");
            $errorTextDiv.html("il file inserito è valido");
            $errorTextDiv.show();
        }
    };

    createThumbnail = (file, arrayPositionId) => {
        let fileSizeInMB = (file.size / (1024 * 1024)).toFixed(2);
        let stringSize = `(${fileSizeInMB}MB)`;
        var data = {
            name: file.name,
            size: stringSize,
            fileId: arrayPositionId,
        };

        $(".files-list").loadTemplate($("#fileItem"), data, { append: true });
        let $lastProgessBar = $(".files-list .dnd-upload-status")
            .last()
            .find(".dnd-progress-bar span");
        $lastProgessBar.css("width", "100%");

        $(".files-list")
            .off("click")
            .on("click", ".dnd-upload-status .dnd-upload-details a", (e) => {
                let $this = $(e.currentTarget);
                let stringId = $this.find(".jid").html();
                let numberId = Number(stringId);
                this.files.splice(numberId, 1);
                $this.closest(".dnd-upload-status").remove();
                e.preventDefault();
            });
    };
}
