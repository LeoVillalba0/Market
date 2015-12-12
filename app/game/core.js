define([], function() {
    var game = {
        money: 0,
    	totalMoney: 0,
        level: 1,
        reputation: 0,
        reputationNeed: 100,

        options: {
            fps: 20,
            interval: (1000/20),
            firstTime: true,
            pause: false,
            before: new Date().getTime(),
            now: new Date().getTime(),
            version: 0.001
        },

        scope: function(selector) {
            return angular.element(selector).scope();
        },

        togglePause: function() {
            this.options.pause = !this.options.pause;

            if (this.options.pause)
                notify.pop("alert", "<strong>Game paused...</strong>");
            else
                notify.pop("alert", "<strong>Game un-paused.</strong>");
        },

        gainMoney: function(amount) {
            this.money += amount;
            this.totalMoney += amount;
        },

        repLevelUp: function() {
            if (this.reputation >= this.reputationNeed) {
                while (this.reputation >= this.reputationNeed) {
                    this.level++;
                    this.reputation -= this.reputationNeed;
                    this.reputationNeed = Math.floor(100 * Math.pow(1.30, this.level));
                };
            };
        },

        display: function() {
            this.production.displayDrugs();

            $(".navbar-brand").html("$" + beautify.fix(game.money) + " - reputation lvl. " + this.level + " <small>(" + fix(this.reputation, 0) + "/" + fix(this.reputationNeed, 0) + ")");
        },

        coreLoop: function() {
            var that = this.game;
        	that.options.now = new Date().getTime();
        	var elapsed = that.options.now - that.options.before;
        	if (elapsed > that.options.interval)
        		that.updateGame(Math.floor(elapsed/that.options.interval));
        	else
        		that.updateGame(1);
        	that.options.before = new Date().getTime();
        },

        updateGame: function(times) {
            this.display();

        	game.actions.run(times);
            game.production.run(times);
        },

        init: function() {
            window["game"] = this;
            window["log"] = console.info.bind(console, "BR :");

            require(['beautify', 'sidebar', 'notify'], function() {
                log("App core libs end init.");

                require(['actions', 'production', 'research-center', 'achievements', 'prestige', 'gangs'], function() {
                    log("Game scripts end init.");

                    require(['save'], function() {
                        game.save.load();
                        log("Save.js end init");

                        require(['angular'], function() {
                            log("Angular init.");
                        });
                    });
                });
            });
        }
    };

    return game.init();
});
