define(['angular'], function() {
    var collections = {
        tiers: ['common', 'uncommon', 'rare', 'unique'],
        chances: [0.75, 0.9, 0.95, 1.00],
        categories: ['actions', 'production'],
        names: {
            actions: {
                common: ['Desolation', 'Lightning', 'Moonsight', 'Dragonstrike', 'Peacekeeper', 'Betty', 'Ole Betsy', 'Limbo', 'Interrogator', 'Harmony', 'Apocalypse',
                        'Stormbringer', 'Shadowfury', 'Retirement', 'Deathbringer', 'Legionaire', 'Deadeye', 'Birthmark', 'Despair', 'Hatred', 'Echo', "Hope's End",
                        'Sunshine', 'Piety', 'Endbringer', 'Damnation', 'Requiem', 'Fury', 'Crash', 'The Light', 'Injection', 'Rigormortis', 'Eveningstar', 'Destruction'],
                uncommon: ['Warrior Rifle', 'Defender Carbine', 'Corroded Blaster', "Knight's Fall", 'Corroded Blaster', 'Massive Repeater', 'Wrathful Carbine', 'Savage Longrifle',
                            'Phantom Rifle', 'Reincarnated Repeater', 'Hero Sniper', 'Yearning Rifle', 'Warped Sniper', "Warrior's Carbine", 'Bloodied Shooter'],
                rare: ['Silent Silver Shooter', 'Roaring Golden Blaster', 'Vile Ebon Shooter', 'Trooper Ivory Fusil', 'Frenzied Iron Repeater', 'Lightning Stainless Rifle',
                        'Dire Steel Launcher', 'Ghostly Bronze Sniper', 'Phantom Fiberglass Rifle', 'Refined Silver Longrifle'],
                unique: ['Remorse, Memory Of Infinite Trials', 'Widow Maker, Scepter Of Vengeance', 'Limbo, Sculptor Of Twisted Visions', 'King Of Nines, Butcher Of The Immortal',
                        'Dreamhunter, Soul Of Summoning', 'Deadeye, Voice Of Conquered Worlds', 'Termination, Call Of Shadow Strikes', 'Brutality, Bringer Of Shifting Sands',
                        'Salvation, Boon Of The Summoner', 'Burn, Repeater Of The Insane', 'Justifier, Protector Of Traitors', 'Shadowmoon, Disposer Of The Basilisk']
            },
            production: {
                common: [],
                uncommon: [],
                rare: [],
                unique: []
            },
        },
        owned: new Array(),
        list: new Array(),
        startPrice: 1e17,
        startRep: 1e5,
        increasePrice: 1.55,
        increaseRep: 1.55,
        chanceEarningItem: 0.02,
        chanceEarningItemMultiplier: 1.00,

        getRandTier: function() {
            var randNum = Math.random().toFixed(3);

            if (randNum <= this.chances[0])
                tier = 0;
            else if (randNum <= this.chances[1])
                tier = 1;
            else if (randNum <= this.chances[2])
                tier = 2;
            else
                tier = 3;

            return tier;
        },

        getRandItem: function(tier) {
            return this.list[tier][Math.floor(Math.random() * this.list[tier].length)];
        },

        getTableColor: function(tier) {
            var color;

            switch (tier) {
                case 'common':
                    color = ''
                    break;
                case 'uncommon':
                    color = 'info';
                    break;
                case 'rare':
                    color = 'success';
                    break;
                case 'unique':
                    color = 'warning';
                    break;
            };

            return color;
        },

        getItemDroppedByChance: function() {
            var randNum = Math.random().toFixed(3);
            var chance = this.chanceEarningItemMultiplier * this.chanceEarningItem;
            if (randNum <= chance) {
                this.earnItem();
                game.animateMenu('collections');
                return true;
            }
            return false;
        },

        create: function(name, tier, category, desc, who, effect, otherWho, otherEffect) {
            this.name = name;
            this.tier = tier;
            this.category = category;
            this.desc = desc;
            this.who = who;
            this.effect = effect;
            this.otherWho = otherWho;
            this.otherEffect = otherEffect;
        },

        addRandomItem: function() {
            var item = this.getRandItem(this.getRandTier());

            var tierNamesLength = window["game"]["collections"]["names"][this.categories[item.category]][game.collections.tiers[item.tier]].length;
            item.name = window["game"]["collections"]["names"][this.categories[item.category]][game.collections.tiers[item.tier]][Math.floor(Math.random() * tierNamesLength)];

            switch (item.category) {
                // actions
                case 0:
                    var totalReputationMultiplier = game.actions.totalReputationMultiplier;
                    var totalRewardMultiplier = game.actions.totalRewardMultiplier;
                    window["game"]["actions"][item.who] = window["game"]["actions"][item.who] * item.effect;
                    window["game"]["actions"][item.otherWho] = window["game"]["actions"][item.otherWho] * item.otherEffect;
                    break;
                    // production
                case 1:
                    break;
            }
            this.owned.reverse();
            this.owned[(this.owned.length)] = item;
            this.owned.reverse();
        },

        earnItem: function(pay) {
            switch (pay) {
                case 'money':
                    var price = (this.startPrice * Math.pow(this.increasePrice, this.owned.length));
                    if (game.money >= price) {
                        game.money -= price;
                        this.addRandomItem();
                        this.display();
                        return true;
                    };
                    return false;
                    break;
                case 'rep':
                    var rep = (this.startRep * Math.pow(this.increaseRep, this.owned.length));
                    if (game.reputation >= rep) {
                        game.reputation -= rep;
                        this.addRandomItem();
                        this.display();
                        return true;
                    };
                    return false;
                    break;
                default:
                    this.addRandomItem();
                    break;
            };

            this.display();
        },

        display: function() {
            this.categories.forEach(function(cat) {
                $("#collection-" + cat + "-tbody").html("");
            });

            if (typeof this.owned == "object") { // an array is considered as an object
                if (this.owned.length > 0) {
                    this.owned.forEach(function(item) {
                        var category = game.collections.categories[item.category];
                        var color = game.collections.getTableColor(game.collections.tiers[item.tier]);

                        $("#collection-" + category + "-tbody").append(
                            '<tr class="' + color + '">' +
                            '<th>' + capF(game.collections.tiers[item.tier]) + '</th>' +
                            '<td>' + item.name + '</td>' +
                            '<td>' + item.desc + '</td>' +
                            '</tr>'
                        );
                    });
                };
            };
        },

        varInit: function() {
            // common items
            this.list[0] = new Array(
                // actions items
                new this.create("COMMON 1", 0, 0, "+2% money reward +2% rep. reward</span>", "totalRewardMultiplier", "1.02", "totalReputationMultiplier", "1.02"),
                new this.create("COMMON 2", 0, 0, "+3% money reward +3% rep. reward</span>", "totalRewardMultiplier", "1.03", "totalReputationMultiplier", "1.03"),
                new this.create("COMMON 3", 0, 0, "+4% money reward +4% rep. reward</span>", "totalRewardMultiplier", "1.04", "totalReputationMultiplier", "1.04"),
                new this.create("COMMON 4", 0, 0, "+5% money reward +5% rep. reward</span>", "totalRewardMultiplier", "1.05", "totalReputationMultiplier", "1.05"),
                new this.create("COMMON 5", 0, 0, "+6% money reward +6% rep. reward</span>", "totalRewardMultiplier", "1.06", "totalReputationMultiplier", "1.06"),
                new this.create("COMMON 6", 0, 0, "+7% money reward +7% rep. reward</span>", "totalRewardMultiplier", "1.07", "totalReputationMultiplier", "1.07"),
                new this.create("COMMON 7", 0, 0, "+8% money reward +8% rep. reward</span>", "totalRewardMultiplier", "1.08", "totalReputationMultiplier", "1.08"),
                new this.create("COMMON 8", 0, 0, "+9% money reward +9% rep. reward</span>", "totalRewardMultiplier", "1.09", "totalReputationMultiplier", "1.09"),

                // production items
                new this.create("Dealer Stuff I-I", 0, 1, "+2% money reward", "totalRewardMultiplier", "1.02", "", ""),
                new this.create("Dealer Stuff I-II", 0, 1, "+3% money reward", "totalRewardMultiplier", "1.03", "", ""),
                new this.create("Dealer Stuff I-III", 0, 1, "+5% money reward", "totalRewardMultiplier", "1.05", "", "")
            );

            // uncommon items
            this.list[1] = new Array(
                new this.create("UNCOMMON 1", 1, 0, "+10% money reward +10% rep. reward", "totalRewardMultiplier", "1.10", "totalReputationMultiplier", "1.10"),
                new this.create("UNCOMMON 2", 1, 0, "+12% money reward +12% rep. reward", "totalRewardMultiplier", "1.12", "totalReputationMultiplier", "1.12"),
                new this.create("UNCOMMON 3", 1, 0, "+14% money reward +14% rep. reward", "totalRewardMultiplier", "1.14", "totalReputationMultiplier", "1.14"),

                new this.create("Dealer Stuff II-I", 1, 1, "+6% money reward", "totalRewardMultiplier", "1.06", "", ""),
                new this.create("Dealer Stuff II-II", 1, 1, "+7% money reward", "totalRewardMultiplier", "1.07", "", ""),
                new this.create("Dealer Stuff II-III", 1, 1, "+8% money reward", "totalRewardMultiplier", "1.08", "", "")
            );

            // rare items
            this.list[2] = new Array(
                new this.create("RARE 1", 2, 0, "+16% money reward +16% rep. reward", "totalRewardMultiplier", "1.16", "totalReputationMultiplier", "1.16"),
                new this.create("RARE 2", 2, 0, "+18% money reward +18% rep. reward", "totalRewardMultiplier", "1.18", "totalReputationMultiplier", "1.18"),
                new this.create("RARE 3", 2, 0, "+20% money reward +20% rep. reward", "totalRewardMultiplier", "1.20", "totalReputationMultiplier", "1.20"),

                new this.create("Dealer Stuff III-I", 2, 1, "9% money reward", "totalRewardMultiplier", "1.09", "", ""),
                new this.create("Dealer Stuff III-II", 2, 1, "10% money reward", "totalRewardMultiplier", "1.10", "", ""),
                new this.create("Dealer Stuff III-III", 2, 1, "11% money reward", "totalRewardMultiplier", "1.11", "", "")
            );

            // unique items
            this.list[3] = new Array(
                new this.create("UNIQUE 1", 3, 0, "+22% money reward +22% rep. reward", "totalRewardMultiplier", "1.22", "totalReputationMultiplier", "1.22"),
                new this.create("UNIQUE 2", 3, 0, "+24% money reward +24% rep. reward", "totalRewardMultiplier", "1.24", "totalReputationMultiplier", "1.24"),
                new this.create("UNIQUE 3", 3, 0, "+26% money reward +26% rep. reward", "totalRewardMultiplier", "1.26", "totalReputationMultiplier", "1.26"),

                new this.create("Dealer Stuff IV-I", 3, 1, "+12% money reward", "totalRewardMultiplier", "*1.12", "", ""),
                new this.create("Dealer Stuff IV-II", 3, 1, "+13% money reward", "totalRewardMultiplier", "*1.13", "", ""),
                new this.create("Dealer Stuff IV-III", 3, 1, "+14% money reward", "totalRewardMultiplier", "*1.14", "", "")
            );
        },

        domInit: function() {
            var height = $("body").height();

            $("#collection-actions, #collection-production").css({
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

            window["game"]["collections"] = this;
            log("Collections init.");
        }
    };

    return collections.init();
});
