define([], function() {
    var actions = {
        list: ["Shooting", "Fight Club", "Pickpocket", "Scam", "Car Theft", "Theft of Jewels", "Hacking", "Arms Sales", "Drugs Sales"],
		inflation: [1.09, 1.15, 1.15, 1.14, 1.13, 1.12, 1.11, 1.10, 1.09],
		progress: new Array(),
		owned: new Array(),
		price: [4, 92, 2116, 48668, 1119364, 25745372, 592143556, 13619301788, 313243941124],
		pricePromo: new Array(),
		reward: [1, 23, 529, 12167, 279841, 6436343, 148035889, 3404825447, 78310985281],
		rewardMultiplier: new Array(),
		totalRewardMultiplier: 1,
		time: [1.5, 3, 6, 12, 24, 96, 384, 1536, 6144],
		timeMultiplier: new Array(),
		totalTimeMultiplier: 1,
        buy: 1,

        getTime: function(index) {
            return ((this.time[index] / this.timeMultiplier[index]) / this.totalTimeMultiplier);
        },

        getReward: function(index) {
            return ((this.owned[index] * this.reward[index] * this.rewardMultiplier[index]) * this.totalRewardMultiplier);
        },

        getPrice: function(index) {
            var initial = (this.price[index] * Math.pow(this.inflation[index], this.owned[index]));
        	if (this.pricePromo[index] > 0)
        		return (initial * (this.pricePromo[index] / 100));
        	else
        		return initial;
        },

        getPerSec: function(index) {
            var reward = this.getReward(index);
        	var time = this.getTime(index);
        	return (reward / time);
        },

        multiplier: function() {
            switch (this.buy) {
                case 1:
                this.buy = 10;
                    break;
                case 10:
                this.buy = 100;
                    break;
                case 100:
                this.buy = 250;
                    break;
                case 250:
                this.buy = 1;
                    break;
            };

            this.display();
        },

        upgrade: function(index) {
            var price = this.getPrice(index);
            var buy = this.buy;

            if (buy > 1) {
                for (var i = 0; i < buy; i++)
                    this.upgradeOnce(index);
            }
            else
                this.upgradeOnce(index);
        },

        upgradeOnce: function(index) {
            var price = this.getPrice(index);

            if (game.money < price)
                return;
            else {
                game.money -= price;
                this.owned[index]++;
            };
            this.display();
            game.achievements.loop();
            $("#action-upgrade-" + (index+1)).html("Upgrade");
        },

        run: function(times) {
            if (!game.options.pause) {
        		for (var i = 0; i < this.list.length; i++) {
        			if (this.owned[i] > 0) {
        				var fps = game.options.fps;
        				var time = this.getTime(i);
        				var reward = this.getReward(i);

        				this.progress[i] += times/fps;
        				game.gainMoney(Math.floor(this.progress[i]/time) * reward);

        				this.progress[i] %= time;

        				var width = ((this.progress[i]/time) * 100);

        				if (time < 0.15)
        					width = 100;

        				width = Math.max(width, 1);

        				$("#action-progress-" + (i+1)).css('width', width + '%');
        				$("#action-progress-" + (i+1) + "-info").html(Math.floor(width) + "%");
        			};
        		};
        	};
        },

        display: function() {
            for (var i = 0; i < this.list.length; i++) {
        		var price = this.displayPrice(i);
        		var reward = this.getReward(i);
        		var time = this.getTime(i);
        		var perSec = this.getPerSec(i);
                var totalPrice = this.displayPrice(i);

        		$("#action-name-" + (i+1)).html(this.list[i] + " (lvl. " + this.owned[i] + ")");
        		$("#action-info-" + (i+1)).html("+$" + fix(reward) + " <span>($" + fix(perSec, 3) + "/sec)</span><br>" + fix(time) + " sec");
        		$("#action-cost-" + (i+1)).html("Cost $" + fix(price));
        	};

            $("#action-buy-button").html("Buy x" + this.buy);
        },

        displayPrice: function(i) {
            var amount = this.buy;
            var owned = this.owned[i];
            var totalPrice = 0;
            var totalOwned = amount + this.owned[i];

            while (totalOwned > owned) {
                amount--;
                totalOwned = amount + owned;
                totalPrice += (this.price[i] * Math.pow(this.inflation[i], totalOwned));;
            };

            return totalPrice;
        },

        varInit: function() {
            for (var i = 0; i < this.list.length; i++) {
                this.progress.push(0);
        		this.rewardMultiplier.push(1);
        		this.timeMultiplier.push(1);
        		this.pricePromo.push(0);
        		this.owned.push(0);
        		this.owned[0] = 1;
            };
        },

        domInit: function() {
            for (var i = 0; i < this.list.length; i++) {
                $("#action-upgrade-" + (i+1)).attr('onclick', 'game.actions.upgrade(' + i + ');');

        		if (this.owned[i] < 1)
        			$("#action-upgrade-" + (i+1)).html("Unlock");
        		else
        			$("#action-upgrade-" + (i+1)).html("Upgrade");

                this.display();
            };
        },

        angularInit: function() {
            this.domInit();
        },

        init: function() {
            this.varInit();

            window["game"]["actions"] = this;
            log("Actions init.");
        }
    };

    return actions.init();
});
