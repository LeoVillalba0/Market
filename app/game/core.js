define([], function() {
    var game = {
        money: 0,
    	totalMoney: 0,

        options: {
            fps: 20,
            interval: (1000/20),
            firstTime: true,
            pause: false,
            before: new Date().getTime(),
            after: new Date().getTime(),
            now: new Date().getTime(),
            version: 0.001
        },

        scope: function(selector) {
            return angular.element(selector).scope();
        },

        gainMoney: function(amount) {
            this.money += amount;
            this.totalMoney += amount;
        },

        display: function() {
            $(".navbar-brand").html("$" + beautify.fix(game.money));
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
        },

        init: function() {
            window["game"] = this;
            window["log"] = console.info.bind(console, "BR :");
            require(['beautify', 'sidebar'], function() {
                log("App core libs end init.");
                require(['angular', 'actions'], function() {
                    // intervals goes here
                    log("Game scripts end init.");
                });
            });
        }
    };

    return game.init();
});
