define(['angular'], function() {

    var save = {
        name: 'BR-S',
        salt: 'BRKey',

        save: function(from) {
            var toSave = {
                money: game.money,
                totalMoney: game.totalMoney,
                level: game.level,
                reputation: game.reputation,
                reputationNeed: game.reputationNeed,
                actions: game.actions,
                research: game.research,
                options: game.options
            };

            localStorage.setItem((this.name + this.salt), JSON.stringify(toSave));

            if (from == 'user') {
                notify.pop("success", "Game successfully saved!");
            };

            log("Game saved.");
        },

        load: function() {
            if (localStorage.getItem((this.name + this.salt)) === null) {
                notify.pop("alert", "No save found!");
            } else {
                var savegame = JSON.parse(localStorage.getItem((this.name + this.salt)));

                game.money = savegame.money;
                game.totalMoney = savegame.totalMoney;
                game.level = savegame.level;
                game.reputation = savegame.reputation;
                game.reputationNeed = savegame.reputationNeed;

                game.actions.progress = savegame.actions.progress;
                game.actions.owned = savegame.actions.owned;
                game.actions.rewardMultiplier = savegame.actions.rewardMultiplier;
                game.actions.totalRewardMultiplier = savegame.actions.totalRewardMultiplier;
                game.actions.timeMultiplier = savegame.actions.timeMultiplier;
                game.actions.totalTimeMultiplier = savegame.actions.totalTimeMultiplier;
                game.actions.currentRep = savegame.actions.currentRep;
                game.actions.reputationDivider = savegame.actions.reputationDivider;

                game.research.actions.bought = savegame.research.actions.bought;

                game.options.before = savegame.options.before;
                game.options.firstTime = savegame.options.firstTime;

                game.research.display();

                notify.pop("success", "Save-game successfully loaded!");

                log("Game loaded.");
            };
        },

        reset: function(yes, no) {
            $("#options-reset").html("Really?");
            $("#options-yes, #options-no").show();
            $("#options-reset").addClass('really');

            if (yes) {
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
            window.setInterval(function() {
                game.save.save();
            }, 300000); // 5 min
        },

        init: function() {
            this.setInt();
            window["game"]["save"] = this;

            log("Save init.");
        }
    };

    return save.init();
});
