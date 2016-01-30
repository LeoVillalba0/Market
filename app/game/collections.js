define(['angular'], function() {
    var collections = {
        init: function() {
            window["game"]["collections"] = this;
            log("Collections init.");
        }
    };

    return collections.init();
});
