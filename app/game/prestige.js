define([], function() {
    var prestige = {
        init: function() {
            window["game"]["prestige"] = this;

            log("Prestige init.");
        }
    };

    return prestige.init();
});
