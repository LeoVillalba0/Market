define(['angular'], function() {
    var collections = {

        tiers: ['common', 'uncommon', 'rare', 'unique'],
        chances: [0.7, 0.85, 0.95, 1.00],
        categories: ['actions', 'production'],
        owned: new Array(),
        list: new Array(),
        startPrice: 1e17,
        increase: 1.55,

        randTier: function() {

            var randNum = Math.random().toFixed(3);

            if (randNum <= this.chances[0]) {
                tier = 0;
            } else if (randNum <= this.chances[1]) {
                tier = 1;
            } else if (randNum <= this.chances[2]) {
                tier = 2;
            } else {
                tier = 3;
            }

            return tier;
        },

        randItem: function(tier) {
            return this.list[tier][Math.floor(Math.random() * this.list[tier].length)];
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

        generateTestTenItems: function() {
            $("#generated-items").html("");
            for (i = 0; i < 10; i++) {
                var item = this.randItem(this.randTier());
                $("#generated-items").append(
                    '<li id="collection-item-' + (i + 1) + '" class="list-group-item">' +
                    this.categories[item.category] + ':<b> ' + item.name + '</b><span>Tier <b>' + this.tiers[item.tier] + '</b></span><br>' +
                    item.desc + '<br>' +
                    item.who + ' ' + item.effect + '<span>' + item.otherWho + ' ' + item.otherEffect +
                    '</li>'
                );
                log("Tier: " + item.tier + " Category: " + this.categories[item.category] + " Item: " + item.name);
            }
        },

        display: function() {

            log("display");

        },

        varInit: function() {

            // common items
            this.list[0] = new Array(
                new this.create("Gun I-I", 0, 0, "2% Money reward<span>2% reputation reward</span>", "totalRewardMultiplier", "*1.02", "totalReputationMultiplier", "*1.02"),
                new this.create("Gun I-II", 0, 0, "3% Money reward<span>3% reputation reward</span>", "totalRewardMultiplier", "*1.03", "totalReputationMultiplier", "*1.03"),
                new this.create("Gun I-III", 0, 0, "5% Money reward<span>5% reputation reward</span>", "totalRewardMultiplier", "*1.05", "totalReputationMultiplier", "*1.05"),

                new this.create("Dealer Stuff I-I", 0, 1, "2% Money reward<span></span>", "totalRewardMultiplier", "*1.02", "", ""),
                new this.create("Dealer Stuff I-II", 0, 1, "3% Money reward<span></span>", "totalRewardMultiplier", "*1.03", "", ""),
                new this.create("Dealer Stuff I-III", 0, 1, "5% Money reward<span></span>", "totalRewardMultiplier", "*1.05", "", "")
            );

            // uncommon items
            this.list[1] = new Array(

                new this.create("Gun II-I", 1, 0, "6% Money reward<span>6% reputation reward</span>", "totalRewardMultiplier", "*1.06", "totalReputationMultiplier", "*1.06"),
                new this.create("Gun II-II", 1, 0, "7% Money reward<span>7% reputation reward</span>", "totalRewardMultiplier", "*1.07", "totalReputationMultiplier", "*1.07"),
                new this.create("Gun II-III", 1, 0, "8% Money reward<span>8% reputation reward</span>", "totalRewardMultiplier", "*1.08", "totalReputationMultiplier", "*1.08"),

                new this.create("Dealer Stuff II-I", 1, 1, "6% Money reward<span></span>", "totalRewardMultiplier", "*1.06", "", ""),
                new this.create("Dealer Stuff II-II", 1, 1, "7% Money reward<span></span>", "totalRewardMultiplier", "*1.07", "", ""),
                new this.create("Dealer Stuff II-III", 1, 1, "8% Money reward<span></span>", "totalRewardMultiplier", "*1.08", "", "")
            );

            // rare items
            this.list[2] = new Array(
                new this.create("Gun III-I", 2, 0, "9% Money reward<span>9% reputation reward</span>", "totalRewardMultiplier", "*1.09", "totalReputationMultiplier", "*1.09"),
                new this.create("Gun III-II", 2, 0, "10% Money reward<span>10% reputation reward</span>", "totalRewardMultiplier", "*1.10", "totalReputationMultiplier", "*1.10"),
                new this.create("Gun III-III", 2, 0, "11% Money reward<span>11% reputation reward</span>", "totalRewardMultiplier", "*1.11", "totalReputationMultiplier", "*1.11"),

                new this.create("Dealer Stuff III-I", 2, 1, "9% Money reward<span></span>", "totalRewardMultiplier", "*1.09", "", ""),
                new this.create("Dealer Stuff III-II", 2, 1, "10% Money reward<span></span>", "totalRewardMultiplier", "*1.10", "", ""),
                new this.create("Dealer Stuff III-III", 2, 1, "11% Money reward<span></span>", "totalRewardMultiplier", "*1.11", "", "")
            );

            // unique items
            this.list[3] = new Array(
                new this.create("Gun IV-I", 3, 0, "12% Money reward<span>12% reputation reward</span>", "totalRewardMultiplier", "*1.12", "totalReputationMultiplier", "*1.12"),
                new this.create("Gun IV-II", 3, 0, "13% Money reward<span>13% reputation reward</span>", "totalRewardMultiplier", "*1.13", "totalReputationMultiplier", "*1.13"),
                new this.create("Gun IV-III", 3, 0, "14% Money reward<span>14% reputation reward</span>", "totalRewardMultiplier", "*1.14", "totalReputationMultiplier", "*1.14"),

                new this.create("Dealer Stuff IV-I", 3, 1, "12% Money reward<span></span>", "totalRewardMultiplier", "*1.12", "", ""),
                new this.create("Dealer Stuff IV-II", 3, 1, "13% Money reward<span></span>", "totalRewardMultiplier", "*1.13", "", ""),
                new this.create("Dealer Stuff IV-III", 3, 1, "14% Money reward<span></span>", "totalRewardMultiplier", "*1.14", "", "")
            );
        },

        domInit: function() {
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
