define(['angular'], function() {

    var save = {
        name: 'BR-S',
        salt: 'BRKey',

        saveInterval: undefined,

        save: function(from) {
            var toSave = {
                money: game.money,
                totalMoney: game.totalMoney,
                level: game.level,
                reputation: game.reputation,
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
                optionsFirstTime: game.options.firstTime
            };

            if (game.options.init)
                localStorage.setItem((this.name + this.salt), JSON.stringify(toSave));

            if (from == 'user')
                notify.pop("success", "Game successfully saved!");

            log("Game saved.");
        },

        load: function(from) {
            if (localStorage.getItem((this.name + this.salt)) === null) {
                notify.pop("alert", "No save found!");
            } else {
                var savegame = JSON.parse(localStorage.getItem((this.name + this.salt)));

                game.money = savegame.money;
                game.totalMoney = savegame.totalMoney;
                game.level = savegame.level;
                game.reputation = savegame.reputation;
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

                game.collections.owned = savegame.collectionsOwned;

                game.research.display();

                if (from == 'user')
                    notify.pop("success", "Save-game successfully loaded!");

                log("Savegame loaded.");
            };
        },

        eventListenerSave: function() {
            game.save.save();
        },

        reset: function(yes, no) {
            $("#options-reset").html("Really?");
            $("#options-yes, #options-no").show();
            $("#options-reset").addClass('really');

            if (yes) {
                this.saveInterval = undefined;
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

        setInt: function() {
            this.saveInterval = window.setInterval(function() {
                game.save.save();
            }, 1000);
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
