define([], function() {
    var notify = {
        activated: true,

        close: function() {
            $("#notify-div").fadeOut("slow");
        },

        toggle: function() {
            this.activated = !this.activated;
        },

        pop: function(type, message) {
            if (this.activated) {
                switch (type) {
                    case "alert":
                        $("#notify-prop").removeClass();
                        $("#notify-prop").addClass("alert alert-warning");
                        break;

                    case "success":
                        $("#notify-prop").removeClass();
                        $("#notify-prop").addClass("alert alert-success");
                        break;
                };

                $("#notify-message").html(message);
                $("#notify-div").fadeIn("slow", function() {
                    window.setTimeout(function() {
                        $("#notify-div").fadeOut("slow");
                    }, 10000);
                });
            } else {
                return;
            };
        },

        init: function() {
            window["notify"] = this;
            log("Notify init.");
        }
    };

    return notify.init();
});
