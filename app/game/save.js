define(['angular'], function() {

    var save = {
        name: 'BR-S',
        salt: 'BRKey',

        saveInterval: undefined,

        save: function(from) {
            var toSave = {
                money: game.money,
                totalMoney: game.totalMoney,
                allTimeMoney: game.allTimeMoney,
                level: game.level,
                reputation: game.reputation,
                totalReputation: game.totalReputation,
                allTimeReputation: game.allTimeReputation,
                reputationNeed: game.reputationNeed,

                actionsProgress: game.actions.progress,
                actionsOwned: game.actions.owned,
                actionsRewardMultiplier: game.actions.rewardMultiplier,
                actionsTotalRewardMultiplier: game.actions.totalRewardMultiplier,
                actionsTimeMultiplier: game.actions.timeMultiplier,
                actionsTotalTimeMultiplier: game.actions.totalTimeMultiplier,
                actionsCurrentRep: game.actions.currentRep,

                researchActionsBought: game.research.actions.bought,

                collectionsOwned: game.collections.owned,

                optionsBefore: game.options.before,
                optionsFirstTime: game.options.firstTime,
                optionsVersion: game.options.version,
                optionsStarted: game.options.started
            };

            if (game.options.init)
                localStorage.setItem((this.name + this.salt), JSON.stringify(toSave));

            if (from == 'user')
                notify.pop("success", "Game successfully saved!");

            if (from !== 'silent')
                log("Game saved.");
        },

        load: function(from) {
            if (localStorage.getItem((this.name + this.salt)) === null) {
                notify.pop("alert", "No save found!");
            } else {
                var savegame = JSON.parse(localStorage.getItem((this.name + this.salt)));

                game.money = savegame.money;
                game.totalMoney = savegame.totalMoney;
                game.allTimeMoney = savegame.allTimeMoney;
                game.level = savegame.level;
                game.reputation = savegame.reputation;
                game.totalReputation = savegame.totalReputation;
                game.allTimeReputation = savegame.allTimeReputation;
                game.reputationNeed = savegame.reputationNeed;

                game.actions.progress = savegame.actionsProgress;
                game.actions.owned = savegame.actionsOwned;
                game.actions.rewardMultiplier = savegame.actionsRewardMultiplier;
                game.actions.totalRewardMultiplier = savegame.actionsTotalRewardMultiplier;
                game.actions.timeMultiplier = savegame.actionsTimeMultiplier;
                game.actions.totalTimeMultiplier = savegame.actionsTotalTimeMultiplier;
                game.actions.currentRep = savegame.actionsCurrentRep;

                game.research.actions.bought = savegame.researchActionsBought;

                game.options.before = savegame.optionsBefore;
                game.options.firstTime = savegame.optionsFirstTime;
                game.options.started = savegame.optionsStarted;

                game.collections.owned = savegame.collectionsOwned;

                this.saveChecker();
                game.research.display();

                if (from == 'user')
                    notify.pop("success", "Save-game successfully loaded!");

                if (from !== 'silent')
                    log("Savegame loaded.");
            };
        },

        saveChecker: function() {
            // need to do a smarter function

            var savegame = JSON.parse(localStorage.getItem((game.save.name + game.save.salt)));
            var saveIntervalID = this.save.saveInterval;

            if (savegame.optionsVersion !== game.options.version) {
                warn('Loading old savegame, the save may be corrupted.\n' +
                    'Old : v' + savegame.optionsVersion + ' - current : v' + game.options.version);

                for (var key in game) {
                    if (typeof game[key] !== "object" && typeof game[key] !== "function") {
                        if (game[key] == null || game[key] == undefined || isNaN(game[key]) == true) {
                            warn('bug for ' + key);
                            game[key] = 0;
                        };
                    };
                };

                for (var key in game.actions) {
                    if (typeof game.actions[key] !== "object" && typeof game.actions[key] !== "function") {
                        if (game.actions[key] == null || game.actions[key] == undefined || isNaN(game.actions[key]) == true) {
                            warn('bug for ' + key);
                            game.actions[key] = 0;
                        };
                    };
                };

                for (var key in game.achievements) {
                    if (typeof game.achievements[key] !== "object" && typeof game.achievements[key] !== "function") {
                        if (game.achievements[key] == null || game.achievements[key] == undefined || isNaN(game.achievements[key]) == true) {
                            warn('bug for ' + key);
                            game.achievements[key] = 0;
                        };
                    };
                };

                for (var key in game.collections) {
                    if (typeof game.collections[key] !== "object" && typeof game.collections[key] !== "function") {
                        if (game.collections[key] == null || game.collections[key] == undefined || isNaN(game.collections[key]) == true) {
                            warn('bug for ' + key);
                            game.collections[key] = 0;
                        };
                    };
                };

                for (var key in game.research.actions) {
                    if (typeof game.research.actions[key] !== "object" && typeof game.research.actions[key] !== "function") {
                        if (game.research.actions[key] == null || game.research.actions[key] == undefined || isNaN(game.research.actions[key]) == true) {
                            warn('bug for ' + key);
                            game.research.actions[key] = 0;
                        };
                    };
                };

                // for (var key in game.research.production) {
                //     if (typeof game.research.production[key] !== "object" && typeof game.research.production[key] !== "function") {
                //         if (game.research.production[key] == null || game.research.production[key] == undefined || isNaN(game.research.production[key]) == true) {
                //             warn('bug for ' + key);
                //             window.clearInterval(saveIntervalID);
                //             game.research.production[key] = 0;
                //         };
                //     };
                // };
            };
        },

        eventListenerSave: function() {
            game.save.save();
        },

        reset: function(yes, no) {
            var saveIntervalID = this.save.saveInterval;

            $("#options-reset").html("Really?");
            $("#options-yes, #options-no").show();
            $("#options-reset").addClass('really');

            if (yes) {
                window.clearInterval(saveIntervalID);
                window.removeEventListener("beforeunload", game.save.eventListenerSave, false);
                localStorage.removeItem((this.name + this.salt));
                window.history.pushState('', '', '/#/');
                window.location.reload();
            };

            if (no) {
                $("#options-reset").html("Hard-reset");
                $("#options-yes, #options-no").hide();
                $("#options-reset").removeClass('really');
            };
        },

        devReset: function() {
            var saveIntervalID = this.save.saveInterval;

            window.clearInterval(saveIntervalID);
            window.removeEventListener("beforeunload", game.save.eventListenerSave, false);
            localStorage.removeItem((this.name + this.salt));
            window.history.pushState('', '', '/#/');
            window.location.reload();
        },

        setInt: function() {
            this.saveInterval = window.setInterval(function() {
                game.save.save();
            }, 1000);

            log("Save interval set - ID " + this.saveInterval);
        },

        removeInt: function() {
            var saveIntervalID = this.saveInterval;

            window.clearInterval(saveIntervalID);
            log("Save interval removed.");
        },

        init: function() {
            this.setInt();
            window["game"]["save"] = this;
            window.addEventListener("beforeunload", game.save.eventListenerSave, false);

            log("Save init.");
        }
    };

    return save.init();
});
