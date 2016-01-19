define([], function() {
    var gangs = {
        init: function() {
            window["game"]["gangs"] = this;
            log("Gangs init.");
        }
    };

    return gangs.init();
});
