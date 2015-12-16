define([], function() {
    var gangs = {
        stats: {
            name: undefined
        },

        members: {
        },

        display: function() {
        },

        domInit: function() {
            this.display();
        },

        varInit: function() {
        },

        angularInit: function() {
            this.domInit();
        },

        init: function() {
            window["game"]["gangs"] = this;
            log("Gangs init.");
        }
    };

    return gangs.init();
});
