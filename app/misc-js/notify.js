define([], function() {
    var notify = {
        close: function() {
            $("#notify-div").fadeOut("slow");
        },

        pop: function(type, message) {
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
                }, 15000);
            });
        },

        init: function() {
            window["notify"] = this;
            log("Notify init.");
        }
    };

    return notify.init();
});
