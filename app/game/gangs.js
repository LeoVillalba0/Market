define([], function() {
    var gangs = {
        stats: {
            name: 'Dead Man Inc.',
            power: 0,
            current: 'district'
        },

        maps: {
            district: [
                [10, 11, 13],
                [14, 15, 17],
                [19, 22, 25]
            ]
        },

        mapPower: {
            district: 10,
            city: 30,
            country: 80,
            world: 180
        },

        members: {},

        gangsNames: [
            'Dead Man Inc.', 'Rasta Rocket', 'Illuminati Power',
            'Head Hunters', 'Contract Killers', 'Hitmans',
            '666', 'Gangster Disciples', 'People Nation',
            'Born to Kill', 'Satanas', '116th Street Crew',
            '18th Stree Crew', 'Gulf Cartel', 'El Cartel',
            'Cali Cartel', '38th Street Gang', 'Tijuana Cartel',
            '211 Crew', 'Russian Mafia', 'Nuestra Familia'
        ],

        mapNames: {
            district: ['10th Street', '24th Street', '38th Street', '41th Street', '62th Street'],
            city: ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Philadelphia'],
            country: ['U.S.A.'],
            world: ['Earth']
        },

        unlocked: true,
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
                            $("#gang-content").fadeIn('slow', function() {
                                game.gangs.drawMap();
                            });
                        });
                    };
                };
            };
        },

        drawMap: function() {
        },

        display: function() {
        },

        domInit: function() {
            if (this.unlocked) {
                $("#gang-locked").css('display', 'none');

                if (this.stats.name === undefined) {
                    $("#gang-creation").css('display', 'block');
                } else {
                    $("#gang-content").css('display', 'block');

                    this.drawMap();
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
