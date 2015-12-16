define([], function() {
    var gangs = {
        stats: {
            name: undefined
        },

        members: {},

        unlocked: false,
        need: 25e15,

        invest: function() {
            if (!this.unlocked && game.money >= this.need) {
                this.unlocked = true;
                game.money -= this.need;
                $("#gang-locked").fadeOut('slow', function() {
                    $("#gang-creation").fadeIn('slow');
                });
            };
        },

        nameit: function() {
            if (this.name == undefined) {
                var regex = /[^\w\s]/gi;
                var name = $("#gang-nameit").val();

                if (name.length > 2) {
                    if (regex.test(name) == true) {
                        notify.pop('alert', 'Your gang name contains illegal characters.');
                    } else {
                        notify.pop('success', '<strong>Gang ' + name + ' successfully created.</strong>');
                        $("#gang-creation").fadeOut('slow', function() {
                            $("#gang-content").fadeIn('slow');
                        });
                    };
                };

            };
        },

        display: function() {
        },

        domInit: function() {
            if (this.unlocked) {
                $("#gang-locked").css('display', 'none');

                if (this.name == undefined) {
                    $("#gang-creation").css('display', 'block');
                } else {
                    $("#gang-content").css('display', 'block');
                };
            };

            this.display();
        },

        varInit: function() {},

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
