define([], function() {
    var anticheat = {
        varInit: function() {
        },

        init: function() {
            this.varInit();

            window["game"]["anticheat"] = this;
        }
    };

    return anticheat.init();
});
