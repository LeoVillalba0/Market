define(['angular'], function() {
    var prestige = {
        prestigeReset: function(conf) {
            if (conf) {
                var toSave = {
                    moneyAll: game.allTimeMoney,
                    reputationAll: game.allTimeReputation,
                    reputation: game.reputation,
                    level: game.level,

                    itemsOwned: game.collections.owned,

                    optionsStarted: game.options.started,
                    optionsFirst: game.options.firstTime
                };

                var temp = toSave;

                warn('Starting a soft-reset!');

                game.save.removeInt();
                window.removeEventListener("beforeunload", game.save.eventListenerSave, false);
                localStorage.removeItem((game.save.name + game.save.salt));
                game.options.pause = true;

                // need a global varInit in core.js
                game.money = 0;
                game.totalMoney = 0;
                game.totalReputation = 0;

                game.achievements.varInit();
                game.actions.varInit();
                game.collections.varInit();
                //game.production.varInit();
                game.research.varInit();

                game.save.save('silent');
                game.save.load('silent');

                game.allTimeMoney = temp.moneyAll;
                game.allTimeReputation = temp.reputationAll;
                game.reputation = temp.reputation;
                game.level = temp.level;
                game.collections.owned = temp.itemsOwned;
                game.options.started = temp.optionsStarted;
                game.options.first = temp.optionsFirst;

                game.save.save('silent');
                game.save.setInt();

                game.options.pause = false;

                window.history.pushState('', '', '/#/');

                warn('Soft-reset finished.');
                notify.pop('success', 'You have successfully soft-reset.');
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
