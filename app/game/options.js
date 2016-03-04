define(['angular'], function() {
    var options = {

        display: function() {
            game.setFPS(game.options.fps);
            $("#fpsSlider").on("input change", function() {
                game.setFPS(this.value);
                $("#choosedFPS").html(game.options.fps);
            });
            $("#fpsSlider").val(game.options.fps);
            $("#choosedFPS").html(game.options.fps);

        },

        varInit: function() {},

        domInit: function() {
            this.display();
        },

        angularInit: function() {
            this.domInit();
        },

        init: function() {
            this.varInit();

            window["game"]["options"] = this;
            log("Options init.");
        }
    };

    return options.init();
});
