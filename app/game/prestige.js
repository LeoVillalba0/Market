define(['angular'], function() {
    var prestige = {
        prestigeReset: function(conf) {
            if (conf) {

                warn('Starting a soft-reset!');

                game.save.removeInt();
                window.removeEventListener("beforeunload", game.save.eventListenerSave, false);
                game.options.pause = true;
                game.options.softReset = true;

                game.save.softResetSave();

                warn('Soft-reset finished. Reload!');
                window.history.pushState('', '', '/#/');
                window.location.reload();

            } else {
                $("#prestige-softreset-btn").removeClass('btn-info').addClass('btn-warning').html("Really?").attr('onclick', 'game.prestige.prestigeReset(true);');

                window.setTimeout(function() {
                    $("#prestige-softreset-btn").removeClass('btn-warning').addClass('btn-info').html('Soft-reset').attr('onclick', 'game.prestige.prestigeReset(false);');
                }, 5000);
            };
        },

        display: function() {},

        varInit: function() {},

        domInit: function() {
            $("#prestige-softreset-btn").attr('onclick', 'game.prestige.prestigeReset(false);');

            this.display();
        },

        angularInit: function() {
            this.domInit();
        },

        init: function() {
            this.varInit();

            window["game"]["prestige"] = this;
            log("Prestige init.");
        }
    };

    return prestige.init();
});
