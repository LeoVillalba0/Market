// from stackoverflow.com/q/12944987/
var log = console.log.bind(console, "DEBUG:");

var game = {
	money: 0,
	totalMoney: 0,

	options: {
		fps: 20,
		interval: (1000/20),
		angularInit: false,
		before: new Date().getTime(),
		after: new Date().getTime()
	},

	actions: {
		list: ["Shooting", "Street fight", "Pickpocket", "Bank robbery", "Steal car", "Jewelry robbery"],
		inflation: [1.08, 1.10, 1.12, 1.14, 1.12, 1.10],
		progress: [],
		owned: [],
		price: [4, 120, 1500, 22500, 1000000, 15000000],
		pricePromo: [],
		reward: [1, 60, 1200, 15000, 950000, 10000000],
		rewardMultiplier: [],
		time: [3, 10, 30, 120, 600, 3600],
		timeMultiplier: []
	},

	production: {
		list: ["Weed", "Meth", "Cocaine"],
		prices: [50, 800, 4000],
		prod: {
			weed: [],
			weedOwned: [],
			meth: [],
			methOwned: [],
			cocaine: [],
			cocaineOwned: []
		},
		sell: {
			weed: [],
			meth: [],
			cocaine: [],
			multipliers: []
		}
	}
};

game.actions.gainMoney = function(amount) {
	game.money += amount;
	game.totalMoney += amount;
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

		if (this.owned[i] < 1)
			$("#action-upgrade-" + (i+1)).html("Unlock");
		else
			$("#action-upgrade-" + (i+1)).html("Upgrade");
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
	}
};
game.actions.angularDisplay = function() {
	for (var i = 0; i < this.list.length; i++) {
		var price = this.getPrice(i);
		var reward = this.getReward(i);
		var time = this.getTime(i);
		$("#action-upgrade-" + (i+1)).attr('onclick', 'game.actions.upgrade(' + i + ');');
		$("#action-name-" + (i+1)).html(this.list[i] + " (lvl. " + this.owned[i] + ")");
		$("#action-info-" + (i+1)).html("Earn $" + fix(reward) + " - " + fix(time) + " sec");
		$("#action-cost-" + (i+1)).html("Cost $" + fix(price));
	}
};
game.actions.upgrade = function(index) {
	var price = this.getPrice(index);
	if (game.money >= price) {
		game.money -= price;
		this.owned[index]++;
		$("#action-upgrade-" + (index+1)).html("Upgrade");
	};
	this.display();
};
game.actions.run = function(times) {
	for (var i = 0; i < this.list.length; i++) {
		if (this.owned[i] > 0) {
			var fps = game.options.fps;
			var time = this.getTime(i);
			var reward = this.getReward(i);
			this.progress[i] += times/fps;
			this.gainMoney(Math.floor(this.progress[i]/time) * reward);
			this.progress[i] %= time;
			var width = ((this.progress[i]/time) * 100)
			if (time < 0.1)
				width = 100;
			width = Math.max(width, 1);
			$("#action-progress-" + (i+1)).css('width', width + '%');
			$("#action-nb-" + (i+1)).html(Math.floor(width) + "%");
		};
	}
};

game.production.getWhat = function(drugIndex, buildIndex, type) {
	var part = (this.list[drugIndex]).toLowerCase();
	var anotherPart = '[' + buildIndex + ']';
	var want = (type).toLowerCase();
	var str = eval('this.prod.' + part + anotherPart + '.' + want);
	return str;
};
game.production.build = function(name, price, reward, inflation) {
	this.name = name;
	this.price = price;
	this.reward = reward;
	this.inflation = inflation;
};
game.production.init = function() {
	this.prod.weed = [
		new game.production.build("Weed build 1", 250, 			0.5, 	1.60),
		new game.production.build("Weed build 2", 500000, 		2, 		1.50),
		new game.production.build("Weed build 3", 25000000, 	4, 		1.40)
	];

	for (var i = 0; i < this.prod.weed.length; i++)
		this.prod.weedOwned.push(0);

	this.prod.meth = [
		new game.production.build("Meth build 1", 250, 			0.5, 	1.60),
		new game.production.build("Meth build 2", 500000, 		2, 		1.50),
		new game.production.build("Meth build 3", 25000000, 	4, 		1.40)
	];


	for (var i = 0; i < this.prod.meth.length; i++)
		this.prod.methOwned.push(0);

	this.prod.cocaine = [
		new game.production.build("Cocaine build 1", 250, 			0.5, 	1.60),
		new game.production.build("Cocaine build 2", 500000, 		2, 		1.50),
		new game.production.build("Cocaine build 3", 25000000, 		4, 		1.40)
	];


	for (var i = 0; i < this.prod.cocaine.length; i++)
		this.prod.cocaineOwned.push(0);

	this.display();
};
game.production.display = function() {
	this.prod.display();
};
game.production.prod.getReward = function(drugIndex, buildIndex) {
	var buildReward = game.production.getWhat(drugIndex, buildIndex, 'reward');
	return (buildReward);
};
game.production.prod.getPrice = function(drugIndex, buildIndex) {
	var buildPrice = game.production.getWhat(drugIndex, buildIndex, 'price');
	var buildInflation = game.production.getWhat(drugIndex, buildIndex, 'inflation');
	var part = (game.production.list[drugIndex]).toLowerCase();
	var anotherPart = '[' + buildIndex + ']';
	var owned = eval('game.production.prod.' + part + 'Owned' + anotherPart);
	return (buildPrice * Math.pow(buildInflation, owned));
};
game.production.prod.display = function() {
	for (var i = 0; i < game.production.list.length; i++) {
		var drugIndex = (game.production.list[i]).toLowerCase();
		var forwhat = eval('game.production.prod.' + drugIndex);
		for (var e = 0; e < forwhat.length; e++)
			$("#production-" + drugIndex + "-" + (e+1)).html(forwhat[e].name + '<span>' + game.production.prod.weedOwned[e] + ' owned</span><br>+' +
				fix(this.getReward(i, e)) + 'g/sec' + '<span>$' + fix(this.getPrice(i, e), 2) + '</span>');
	}
};

game.options.coreLoop = function() {
	var that = game.options;
	that.now = new Date().getTime();
	var elapsed = that.now - that.before;
	if (elapsed > that.interval)
		that.updateGame(Math.floor(elapsed/that.interval));
	else
		that.updateGame(1);
	that.before = new Date().getTime();
};
game.options.updateGame = function(times) {
	this.display();
	game.actions.run(times);
};
game.options.display = function() {
	$(".navbar-brand").html("$" + fix(game.money) + " - lvl. 1");
};
game.options.init = function() {
	game.actions.init();
	game.production.init();

	// from stackoverflow.com/q/22570357/
	var controllerElement = $('.game-content');
	var controllerScope = angular.element(controllerElement).scope();
	controllerScope.setInt();
};
