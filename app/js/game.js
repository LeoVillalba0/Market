var log = console.log.bind(console, "DEBUG:");

var game = {
	money: 0,
	totalMoney: 0,

	options: {
		fps: 10,
		interval: (1000/10),
		init: false,
		before: new Date().getTime(),
		after: new Date().getTime()
	},

	actions: {
		angularInit: false,
		list: ["Shooting", "Street fight", "Pickpocket", "Bank robbery", "Steal car", "Jewelry robbery"],
		inflation: [1.08, 1.10, 1.12, 1.14, 1.12, 1.10],
		progress: [],
		owned: [],
		price: [4, 120, 1500, 22500, 1000000, 22500000],
		pricePromo: [],
		reward: [1, 60, 1200, 15000, 950000, 15000000],
		rewardMultiplier: [],
		time: [3, 10, 30, 120, 600, 3600],
		timeMultiplier: []
	}
};

game.actions.getTime = function(index) {
	return (this.time[index] / this.timeMultiplier[index]);
};
game.actions.getReward = function(index) {
	return (this.owned[index] * this.reward[index] * this.rewardMultiplier[index]);
};
game.actions.getPrice = function(index) {
	var initialPrice = (this.price[index] * Math.pow(this.inflation[index], this.owned[index]));
	if (this.pricePromo[index] > 0)
		return (initialPrice * (this.pricePromo[index] / 100));
	else
		return (initialPrice);
};
game.actions.init = function() {
	for (var i = 0; i < this.list.length; i++) {
		this.progress.push(0);
		this.rewardMultiplier.push(1);
		this.timeMultiplier.push(1);
		this.pricePromo.push(0);
		this.owned.push(0);
		this.owned[0] = 1;

		$("#action-upgrade-" + (i+1)).attr('onclick', 'game.actions.upgrade(' + i + ');');
	}

	this.display();
};
game.actions.display = function() {
	for (var i = 0; i < this.list.length; i++) {
		var price = this.getPrice(i);
		var reward = this.getReward(i);
		var time = this.getTime(i);
		$("#action-name-" + (i+1)).html(this.list[i] + " (lvl. " + this.owned[i] + ")");
		$("#action-info-" + (i+1)).html("Earn $" + fix(reward) + " - " + fix(time) + " sec");
		$("#action-cost-" + (i+1)).html("Cost $" + fix(price));
		$("#action-progress-" + (i+1)).css('width', '50%');
	}
};
game.actions.upgrade = function(index) {
	var price = this.getPrice(index);
	if (game.money >= price) {
		game.money -= price;
		this.owned[index]++;
	};
	this.display();
};
game.actions.run = function(times) {
};

game.options.coreLoop = function() {
};
