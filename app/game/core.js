define([], function() {
    var game = {
        money: 0,
        totalMoney: 0,
        level: 1,
        reputation: 0,
        reputationNeed: 100,

        options: {
            fps: 20,
            interval: (1000 / 20),
            angularInit: false,
            pause: true,
            firstTime: true,
            menu: 'navbar',
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

        gainRep: function(amount) {
            this.reputation += amount;
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

        menuSwitch: function(type) {
            this.options.menu = type;
            this.menuType();
        },

        menuType: function() {
            var type = this.options.menu;

            if (type == "sidebar") {
                $('li[id^="navbar-menu"]').fadeOut('fast', function() {
                    $("#navbar-sidebarmenu").fadeIn('fast');
                });

                sidebar.activated = true;
            } else {
                $("#navbar-sidebarmenu").fadeOut('fast', function() {
                    $('li[id^="navbar-menu"]').fadeIn('fast');
                });

                sidebar.activated = false;
            };
        },

        toggleModal: function() {
            if (this.options.firstTime) {
                $("#modal-newPlayer").modal({
                    keyboard: false,
                    backdrop: 'static'
                });
            };
        },

        closeModal: function() {
            if (this.options.firstTime) {
                this.options.firstTime = false;
                game.options.pause = false;
                // wait for the modal to fadeOut
                window.setTimeout(function() {
                    $("#modal-newPlayer").remove();
                }, 2000);
            };
        },

        display: function() {
            //this.production.displayDrugs();
            $("#sidebar-version").html("v" + this.options.version);
            $(".navbar-brand").html("$" + beautify.fix(game.money) + " - reputation lvl. " + this.level + " <small>(" + fix(this.reputation, 0) + "/" + fix(this.reputationNeed, 0) + ")");
        },

        coreLoop: function() {
            var that = this.game;
            that.options.now = new Date().getTime();
            var elapsed = that.options.now - that.options.before;
            if (elapsed > that.options.interval) {
                if (elapsed > 1000) {
                    that.updateGame(Math.floor(elapsed / that.options.interval), true);
                    //log('Offline: Money ' + game.actions.gainedMoneyThisRun + ' - Rep: ' + game.actions.gainedRepThisRun);
                    notify.pop("success", "While you were Offline, you gained<br />" +
                        fix(game.actions.gainedMoneyThisRun, 3) + " Money<br />" +
                        fix(game.actions.gainedRepThisRun, 3) + " Reputation<br />");
                } else {
                    that.updateGame(Math.floor(elapsed / that.options.interval), false);
                }
            } else {
                that.updateGame(1, false);
            }
            that.options.before = new Date().getTime();
        },

        updateGame: function(times, offline) {
            this.display();

            game.actions.run(times, offline);
            //game.production.run(times);
        },

        init: function() {
            window["game"] = this;
            window["log"] = console.info.bind(console, "BR-" + this.options.version + " :");

            require(['beautify', 'sidebar', 'notify'], function() {
                log("----------");
                require(['actions', 'research-center', 'achievements', 'prestige', 'collections', 'save'], function() {
                    game.save.load();

                    if (localStorage.getItem((game.save.name + game.save.salt)) === null)
                        game.options.before = new Date().getTime();

                    log("----------");
                    require(['angular', 'bootstrap'], function() {
                        if (!game.options.firstTime)
                            game.options.pause = false;
                        else
                            game.toggleModal();

                        $(function() {
                            $('[data-toggle="tooltip"]').tooltip()
                        });

                        log("Angular & Bootstrap init. Ready to play.");
                    });
                });
            });
        }
    };

    return game.init();
});
