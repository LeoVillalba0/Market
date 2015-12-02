define([], function() {
    var save = {
        init: function() {
            window["game"]["save"] = this;

            log("Save init.");
        }
    };

    return save.init();
});
