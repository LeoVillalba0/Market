define([], function() {
    var game = {
        money: 0,
        totalMoney: 0,
        allTimeMoney: 0,
        level: 1,
        reputation: 0,
        totalReputation: 0,
        allTimeReputation: 0,
        reputationNeed: 100,
        moneyActions: new Array(),
        repActions: new Array(),

        gameInterval: undefined,

        options: {
            fps: 60,
            interval: (1000 / 60),
            angularInit: false,
            init: false,
            pause: true,
            firstTime: true,
            menu: 'navbar',
            before: new Date().getTime(),
            now: new Date().getTime(),
            started: new Date().getTime(),
            softReset: false,
            version: 0.001,
            countReset: 0
        },

        setFPS: function(fps) {
            fps = parseInt(fps);
            if (fps >= 1 && fps <= 60) {
                this.stopGame();
                this.options.fps = fps;
                this.options.interval = 1000 / fps;
                $("#choosedFPS").html(game.options.fps);
                this.runGame();
            };
        },

        getObjLength: function(obj) {
            var size = 0,
                key;

            for (key in obj) {
                if (obj.hasOwnProperty(key)) size++;
            };

            return size;
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
            this.allTimeMoney += amount;
        },

        gainRep: function(amount) {
            this.reputation += amount;
            this.totalReputation += amount;
            this.allTimeReputation += amount;
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

        animateMenu: function(menuitem) {
            var classMenuItem = '.navbar-menu-' + menuitem;
            $(classMenuItem).addClass("glow").delay(1000).queue(function() {
                $(this).removeClass("glow").dequeue();
            });
        },

        toggleModal: function(name) {
            name = '#' + name;
            $(name).modal({
                keyboard: false,
                backdrop: 'static'
            });

            $(name).fadeIn('slow');
        },

        closeModal: function(name) {
            game.options.pause = false;
            game.options.firstTime = false;
            game.options.softReset = false;

            window.setTimeout(function() {
                $(name).remove();
            }, 3000);
        },

        display: function() {
            $("#sidebar-version").html("v" + this.options.version);
            $(".navbar-brand").html("$" + beautify.fix(game.money) + " - reputation lvl. " + this.level + " <small>(" + fix(this.reputation, 0) + "/" + fix(this.reputationNeed, 0) + ")");
            //this.production.displayDrugs();
        },

        coreLoop: function() {
            var that = game;
            that.options.now = new Date().getTime();
            var elapsed = that.options.now - that.options.before;
            if (elapsed > that.options.interval) {
                if (elapsed > 2000) {
                    that.updateGame(Math.floor(elapsed / that.options.interval), true);
                    notify.pop("success", "While you were offline, you gained:<br>" +
                        "$" + fix(game.actions.gainedMoneyThisRun, 3) + "<br>" +
                        fix(game.actions.gainedRepThisRun, 3) + " rep.");
                } else {
                    that.updateGame(Math.floor(elapsed / that.options.interval), false);
                }
            } else {
                that.updateGame(1, false);
            }
            that.options.before = new Date().getTime();
        },

        updateGame: function(times, offline) {
            game.actions.run(times, offline);
            game.statistics.display();
            //game.production.run(times);
            this.display();
        },

        domInit: function() {
            $("#navbar-save").attr('onclick', 'game.save.save("user");');
            $("#fpsSlider").on("input change", function() {
                game.setFPS(this.value);
                $("#choosedFPS").html(game.options.fps);
            });

            $("#fpsSlider").val(game.options.fps);
            $("#choosedFPS").html(game.options.fps);

        },

        runGame: function() {
            this.gameInterval = window.setInterval(function() {
                game.coreLoop();
            }, game.options.interval);
        },

        stopGame: function() {
            window.clearInterval(this.gameInterval);
        },

        init: function() {
            window["game"] = this;
            window["log"] = console.info.bind(console, "BR-" + this.options.version + " :");
            window["warn"] = console.warn.bind(console);
            window["debug"] = console.debug.bind(console);

            require(['beautify', 'sidebar', 'notify', 'helper'], function() {
                log("----------");
                require(['actions', 'research-center', 'achievements', 'prestige', 'collections', 'save', 'statistics'], function() {
                    game.save.load();

                    if (localStorage.getItem((game.save.name + game.save.salt)) === null)
                        game.options.before = new Date().getTime();

                    log("----------");
                    require(['angular', 'bootstrap'], function() {

                        if (!game.options.firstTime && !game.options.softReset) {
                            game.options.pause = false;
                        } else if (game.options.firstTime) {
                            window.setTimeout(function() {
                                game.toggleModal('modal-newPlayer');
                            }, 1000);
                        } else if (game.options.softReset) {
                            window.setTimeout(function() {
                                game.toggleModal('modal-reset');
                            }, 1000);
                        };

                        game.domInit();

                        game.options.init = true;

                        log("Angular & Bootstrap init. Ready to play.");

                        game.setFPS(game.options.fps);
                    });
                });
            });
        }
    };

    return game.init();
});
