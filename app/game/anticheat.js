define(['angular'], function() {
    var anticheat = {
        init: function() {
            window["game"]["anticheat"] = this;
        }
    };

    return anticheat.init();
});
