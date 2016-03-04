define(['angular'], function() {

    var save = {
        name: 'BR-S',
        salt: 'BRKey',

        saveInterval: undefined,

        saveVars: [
            'money',
            'totalMoney',
            'allTimeMoney',
            'level',
            'reputation',
            'totalReputation',
            'allTimeReputation',
            'reputationNeed',
            'actions.progress',
            'actions.owned',
            'actions.rewardMultiplier',
            'actions.totalRewardMultiplier',
            'actions.timeMultiplier',
            'actions.totalTimeMultiplier',
            'actions.currentRep',
            'research.actions.bought',
            'collections.owned',
            'options.before',
            'options.firstTime',
            'options.softReset',
            'options.version',
            'options.started',
            'options.countReset',
            'options.fps'
        ],

        softResetSaveVars: [
            'allTimeMoney',
            'allTimeReputation',
            'reputation',
            'level',
            'collections.owned',
            'options.started',
            'options.firstTime',
            'options.softReset',
            'actions.totalRewardMultiplier',
            'actions.totalTimeMultiplier',
            'actions.totalReputationMultiplier',
            'options.countReset'
        ],

        setObjValByPath: function(obj, val, path) {
            path = path.split('.');
            for (i = 0; i < path.length - 1; i++)
                obj = obj[path[i]];

            obj[path[i]] = val;
        },

        getObjValByPath: function(obj, path) {
            var res = path.split('.').reduce(function(val, idx) {
                return val[idx]
            }, obj)
            return res;
        },

        save: function(from) {

            var toSave = new Object();

            for (i = 0; i < this.saveVars.length; i++) {
                toSave[this.saveVars[i]] = this.getObjValByPath(game, this.saveVars[i]);
            }

            if (game.options.init)
                localStorage.setItem((this.name + this.salt), JSON.stringify(toSave));

            if (from == 'user')
                notify.pop("success", "Game successfully saved!");

            if (from !== 'silent')
                log("Game saved.");
        },

        checkExists: function(varToCheck) {
            if (typeof varToCheck === 'undefined' || varToCheck === null)
                return false;
            else
                return true;

        },

        load: function(from) {

            if (localStorage.getItem((this.name + this.salt)) === null) {
                notify.pop("alert", "No save found!");
            } else {
                var savegame = JSON.parse(localStorage.getItem((this.name + this.salt)));

                for (x = 0; x < this.saveVars.length; x++) {
                    saveVar = this.saveVars[x];
                    val = savegame[saveVar];
                    if (this.checkExists(val)) this.setObjValByPath(game, val, this.saveVars[x]);
                }

                game.research.display();

                if (from == 'user')
                    notify.pop("success", "Save-game successfully loaded!");

                if (from !== 'silent')
                    log("Savegame loaded.");
            };
        },

        eventListenerSave: function() {
            game.save.save();
        },

        softResetSave: function() {
            var toSave = new Object();

            // reset Multipliers
            game['actions']['totalReputationMultiplier'] = 1;
            game['actions']['totalRewardMultiplier'] = 1;
            game['actions']['totalTimeMultiplier'] = 1;
            game['options']['countReset'] += 1;

            // recalculate multipliers and set all items active
            game.collections.prepareSoftReset();

            // now save needed vars
            for (y = 0; y < this.softResetSaveVars.length; y++) {
                toSave[this.softResetSaveVars[y]] = this.getObjValByPath(game, this.softResetSaveVars[y]);
            };
            localStorage.removeItem((game.save.name + game.save.salt));

            localStorage.setItem((this.name + this.salt), JSON.stringify(toSave));
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
