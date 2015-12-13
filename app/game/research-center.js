define([], function() {
    var research = {
        actions: {
            list: new Array(),
            bought: new Array()
        },

        create: function(name, desc, price, str, who, effect, type) {
            this.name = name;
        	this.desc = desc;
        	this.price = price;
        	this.str = str;
        	this.who = who;
        	this.effect = effect;
            this.type = type; // 0 = action 1 = production
        },

        buy: function(type, upgradeIndex) {
            switch (type) {
                case 0:
                var price = this.actions.list[upgradeIndex].price;
            	var what = this.actions.list[upgradeIndex].str;
            	var whoInWhat = this.actions.list[upgradeIndex].who;
            	var effect = this.actions.list[upgradeIndex].effect;

                if (game.money >= price && !this.actions.bought[upgradeIndex]) {
                    game.money -= price;
                    this.actions.bought[upgradeIndex] = true;

                    if (whoInWhat !== 'n') {
                        var value = window["game"]["actions"][what][whoInWhat];
                        window["game"]["actions"][what][whoInWhat] = eval(value + effect);
                    } else {
                        var value = window["game"]["actions"][what];
                        window["game"]["actions"][what] = eval(value + effect);
                    };

                    this.display();
            	};
                    break;
                case 1: // for production research upgrades
                    break;
            };
        },

        display: function() {
            for (var i = 0; i < this.actions.list.length; i++) {
        		var bought = this.actions.bought[i];
        		var html = {
        			name: this.actions.list[i].name,
        			desc: this.actions.list[i].desc,
        			price: this.actions.list[i].price
        		};

        		if (bought) {
        			$("#research-actions-upgrade-" + (i+1)).attr('class', 'list-group-item research-bought');
        			$("#research-actions-upgrade-" + (i+1)).html("<b>" + html.name + "</b><span>Owned</span><br>" + html.desc);
        		} else {
        			$("#research-actions-upgrade-" + (i+1)).html("<b>" + html.name + "</b><span>Cost $" + fix(html.price, 2) + "</span><br>" + html.desc);
        		};
        	};
        },

        varInit: function() {
            this.actions.list = [
                new this.create("Shooting I", "Shooting reward x3", 250000, "rewardMultiplier", "0", "*3", 0),
                new this.create("Street fight I", "Street fight reward x3", 750000, "rewardMultiplier", "1", "*3", 0),
                new this.create("Pickpocket I", "Pickpocket reward x3", 2500000, "rewardMultiplier", "2", "*3", 0),
                new this.create("Scammer I", "Scam reward x3", 5000000, "rewardMultiplier", "3", "*3", 0),
                new this.create("Steal car I", "Steal car reward x3", 25000000, "rewardMultiplier", "4", "*3", 0),
                new this.create("Jewelry robbery I", "Jewelry robbery reward x3", 500000000, "rewardMultiplier", "5", "*3", 0),
                new this.create("Hacking I", "Hacking reward x3", 10000000000, "rewardMultiplier", "6", "*3", 0),
                new this.create("Arms dealer I", "Arms sales reward x3", 50000000000, "rewardMultiplier", "7", "*3", 0),
                new this.create("All actions I", "All actions reward x3", 250000000000, "totalRewardMultiplier", "n", "*3", 0),
                new this.create("Shooting II", "Shooting reward x3", 1000000000000, "rewardMultiplier", "0", "*3", 0),
                new this.create("Street fight II", "Street fight reward x3", 25000000000000, "rewardMultiplier", "1", "*3", 0),
                new this.create("Pickpocket II", "Pickpocket reward x3", 50000000000000, "rewardMultiplier", "2", "*3", 0),
                new this.create("Scammer II", "Scam reward x3", 100000000000000, "rewardMultiplier", "3", "*3", 0),
                new this.create("Steal car II", "Steal car reward x3", 750000000000000, "rewardMultiplier", "4", "*3", 0),
                new this.create("Jewelry robbery II", "Jewelry robbery reward x3", 2500000000000000, "rewardMultiplier", "5", "*3", 0),
                new this.create("Hacking II", "Hacking reward x3", 10000000000000000, "rewardMultiplier", "6", "*3", 0),
                new this.create("Arms dealer II", "Arms sales reward x3", 20000000000000000, "rewardMultiplier", "7", "*3", 0),
                new this.create("All actions II", "All actions reward x3", 75000000000000000, "totalRewardMultiplier", "n", "*3", 0)
            ];

            for (var i = 0; i < this.actions.list.length; i++) {
                this.actions.bought.push(false);
            };
        },

        domInit: function() {
            for (var i = 0; i < this.actions.list.length; i++) {
                var height = $("body").height();

                $("#research-actions").append('<li id="research-actions-upgrade-' + (i+1) + '" class="list-group-item"></li>');
                $("#research-actions-upgrade-" + (i+1)).attr('onclick', 'game.research.buy(0, ' + i + ');');
                $("#research-actions").css({
                    'max-height': height + 'px',
                    'overflow-y': 'auto'
                });
            };

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
