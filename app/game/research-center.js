define(['angular'], function() {
    var research = {
        actions: {
            list: new Array(),
            bought: new Array(),
            upTypes: 10
        },

        getCurrent: function(type, Index) {
            var index;

            switch (type) {
                case 0:
                    for (var i = 0; i < this.actions.list.length; i++) {
                        if (!this.actions.bought[i] && this.actions.list[i].upType == Index) {
                            index = i;
                            i = this.actions.list.length;
                        };
                    };
                    break;
                case 1:
                    break;
            };

            return index;
        },

        getCheapest: function(type) {
            var index;
            var cheapest;

            switch (type) {
                case 0:
                    cheapest = 1e308; // max value in JS by default
                    for (var i = 0; i < this.actions.list.length; i++) {
                        if (!this.actions.bought[i] && this.actions.list[i].price < cheapest) {
                            cheapest = this.actions.list[i].price;
                            index = i;
                        };
                    };
                    break;
                case 1:
                    break;
            };

            return index;
        },

        countBought: function(type) {
            var bought = 0;

            switch (type) {
                case 0:
                    for (var i = 0; i < this.actions.bought.length; i++) {
                        if (this.actions.bought[i])
                            bought++;
                    };
                    break;
                case 1:
                    break;
            };

            return bought;
        },

        create: function(name, desc, price, str, who, effect, otherStr, otherWho, otherEffect, type, upType) {
            this.name = name;
            this.desc = desc;
            this.price = price;
            this.str = str;
            this.who = who;
            this.effect = effect;
            this.otherWho = otherWho;
            this.otherStr = otherStr;
            this.otherEffect = otherEffect;
            this.type = type;
            this.upType = upType;
        },

        buy: function(type, upgradeIndex) {
            switch (type) {
                case 0:
                    var price = this.actions.list[upgradeIndex].price;

                    var what = this.actions.list[upgradeIndex].str;
                    var whoInWhat = this.actions.list[upgradeIndex].who;
                    var effect = this.actions.list[upgradeIndex].effect;

                    var otherWhat = this.actions.list[upgradeIndex].otherStr;
                    var otherWhoInWhat = this.actions.list[upgradeIndex].otherWho;
                    var otherEffect = this.actions.list[upgradeIndex].otherEffect;

                    if (game.money >= price && !this.actions.bought[upgradeIndex]) {
                        game.money -= price;
                        this.actions.bought[upgradeIndex] = true;

                        if (whoInWhat !== 'n') {
                            var value = window["game"]["actions"][what][whoInWhat];
                            window["game"]["actions"][what][whoInWhat] = eval(value + effect);
                        } else {
                            var value2 = window["game"]["actions"][what];
                            window["game"]["actions"][what] = eval(value2 + effect);
                        };

                        if (otherWhat && otherWhoInWhat && otherEffect !== 'undefined') {
                            if (otherWhoInWhat !== 'n') {
                                var value3 = window["game"]["actions"][what][otherWhoInWhat];
                                window["game"]["actions"][otherWhat][otherWhoInWhat] = eval(value3 + otherEffect);
                            } else {
                                var value4 = window["game"]["actions"][otherWhat];
                                window["game"]["actions"][otherWhat] = eval(value4 + otherEffect);
                            };
                        };
                        game.collections.getItemDroppedByChance();
                        game.animateMenu('research');
                    };

                    game.actions.display();
                    break;
                case 1: // for production research upgrades
                    break;
            };

            this.display();
        },

        quickbuy: function(type, upgradeIndex) {
            var indexOfCheapest = this.getCheapest(type);
            return this.buy(type, indexOfCheapest);
        },

        display: function() {
            for (var i = 0; i < this.actions.upTypes; i++) {
                var index = game.research.getCurrent(0, i);
                var bought = this.countBought(0);
                var total = this.actions.bought.length;
                if (typeof this.actions.list[index] !== "undefined") {
                    var html = {
                        name: this.actions.list[index].name,
                        desc: this.actions.list[index].desc,
                        price: this.actions.list[index].price
                    };

                    $("#research-actions-upgrade-" + (i + 1)).html('<b>' + html.name + '</b><span>Cost <b>$' + fix(html.price, 2) + '</b></span><br>' + html.desc);
                    $("#research-actions-upgrade-" + (i + 1)).attr('onclick', 'game.research.buy(0, ' + index + ');');
                } else {
                    $("#research-actions-upgrade-" + (i + 1)).html('<b>All available Upgrades baught!</b>');
                };
                $("#research-actions-total").html("(" + bought + "/" + total + ")");

                $("#research-progress").css({
                    width: Math.round(bought / total * 100, 0) + '%'
                });
                $("#research-progress-info").html(Math.round(bought / total * 100, 0) + '%');
            };

        },

        varInit: function() {
            this.actions.list = [ // todo: fix when buying latest upgrade of each upType
                new this.create("Shooting I", "Shooting reward x3<span>Reputation reward x3</span>", 250000, "rewardMultiplier", "0", "*3", 'reputationMultiplier', "0", "*3", 0, 0),
                new this.create("Shooting II", "Shooting reward x3<span>Reputation reward x3</span>", 1000000000000, "rewardMultiplier", "0", "*3", 'reputationMultiplier', "0", "*3", 0, 0),

                new this.create("Fight club I", "Fight club reward x3<span>Reputation reward x3</span>", 750000, "rewardMultiplier", "1", "*3", 'reputationMultiplier', "1", "*3", 0, 1),
                new this.create("Fight club II", "Fight club reward x3<span>Reputation reward x3</span>", 25000000000000, "rewardMultiplier", "1", "*3", 'reputationMultiplier', "1", "*3", 0, 1),

                new this.create("Pickpocket I", "Pickpocket reward x3<span>Reputation reward x3</span>", 2500000, "rewardMultiplier", "2", "*3", 'reputationMultiplier', "2", "*3", 0, 2),
                new this.create("Pickpocket II", "Pickpocket reward x3<span>Reputation reward x3</span>", 50000000000000, "rewardMultiplier", "2", "*3", 'reputationMultiplier', "2", "*3", 0, 2),

                new this.create("Scammer I", "Scam reward x3<span>Reputation reward x3</span>", 5000000, "rewardMultiplier", "3", "*3", 'reputationMultiplier', "3", "*3", 0, 3),
                new this.create("Scammer II", "Scam reward x3<span>Reputation reward x3</span>", 100000000000000, "rewardMultiplier", "3", "*3", 'reputationMultiplier', "3", "*3", 0, 3),

                new this.create("Steal car I", "Steal car reward x3<span>Reputation reward x3</span>", 25000000, "rewardMultiplier", "4", "*3", 'reputationMultiplier', "4", "*3", 0, 4),
                new this.create("Steal car II", "Steal car reward x3<span>Reputation reward x3</span>", 750000000000000, "rewardMultiplier", "4", "*3", 'reputationMultiplier', "4", "*3", 0, 4),

                new this.create("Jewelry robbery I", "Jewelry robbery reward x3<span>Reputation reward x3</span>", 500000000, "rewardMultiplier", "5", "*3", 'reputationMultiplier', "5", "*3", 0, 5),
                new this.create("Jewelry robbery II", "Jewelry robbery reward x3<span>Reputation reward x3</span>", 2500000000000000, "rewardMultiplier", "5", "*3", 'reputationMultiplier', "5", "*3", 0, 5),

                new this.create("Hacking I", "Hacking reward x3<span>Reputation reward x3</span>", 10000000000, "rewardMultiplier", "6", "*3", 'reputationMultiplier', "6", "*3", 0, 6),
                new this.create("Hacking II", "Hacking reward x3<span>Reputation reward x3</span>", 10000000000000000, "rewardMultiplier", "6", "*3", 'reputationMultiplier', "6", "*3", 0, 6),

                new this.create("Arms dealer I", "Arms sales reward x3<span>Reputation reward x3</span>", 50000000000, "rewardMultiplier", "7", "*3", 'reputationMultiplier', "7", "*3", 0, 7),
                new this.create("Arms dealer II", "Arms sales reward x3<span>Reputation reward x3</span>", 20000000000000000, "rewardMultiplier", "7", "*3", 'reputationMultiplier', "7", "*3", 0, 7),

                new this.create("Dealer I", "Drugs sales reward x3<span>Reputation reward x3</span>", 50000000000, "rewardMultiplier", "8", "*3", 'reputationMultiplier', "8", "*3", 0, 8),
                new this.create("Dealer II", "Drugs sales reward x3<span>Reputation reward x3</span>", 20000000000000000, "rewardMultiplier", "8", "*3", 'reputationMultiplier', "8", "*3", 0, 8),

                new this.create("All actions I", "All actions reward x3<span>Reputation reward x3</span>", 250000000000, "totalRewardMultiplier", "n", "*3", 'totalReputationMultiplier', "n", "*3", 0, 9),
                new this.create("All actions II", "All actions reward x3<span>Reputation reward x3</span>", 75000000000000000, "totalRewardMultiplier", "n", "*3", 'totalReputationMultiplier', "n", "*3", 0, 9)
            ];

            for (var i = 0; i < this.actions.list.length; i++) {
                this.actions.bought.push(false);
            };
        },

        domInit: function() {
            for (var i = 0; i < this.actions.upTypes; i++) {
                $("#research-actions").append('<li id="research-actions-upgrade-' + (i + 1) + '" class="list-group-item"></li>');
                $("#research-actions-upgrade-" + (i + 1)).attr('onclick', 'game.research.buy(0, ' + i + ');');
            };

            var height = $("body").height();
            $("#research-actions").css({
                'max-height': (height - 200) + 'px',
                'overflow-y': 'auto'
            });

            this.display();
        },

        angularInit: function() {
            this.domInit();
        },

        init: function() {
            this.varInit();

            window["game"]["research"] = this;
            log("Research center init.");
        }
    };

    return research.init();
});
