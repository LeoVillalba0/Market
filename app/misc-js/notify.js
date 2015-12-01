define([], function() {
    var notify = {
        close: function() {
            $("#notify-div").fadeOut("slow");
        },

        pop: function(message) {
            $("#notify-message").html(message);
            $("#notify-div").fadeIn("slow");
        },

        init: function() {
            window["notify"] = this;
            log("Notify init.");
        }
    };

    return notify.init();
});
