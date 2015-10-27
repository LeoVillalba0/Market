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
		multipliers: [],
		stock: [],
		prod: {
			weed: [],
			weedOwned: [],
			weedPerSec: [],
			meth: [],
			methOwned: [],
			methPerSec: [],
			cocaine: [],
			cocaineOwned: [],
			cocainePerSec: []
		}
	}
};

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

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
	var drug = (this.list[drugIndex]).toLowerCase();
	var want = type.toLowerCase();
	var result = window["game"]["production"]["prod"][drug][buildIndex][want];
	return result;
};
game.production.getDrugReward = function(drugIndex) {
	return (this.prices[drugIndex] * this.multipliers[drugIndex]);
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
	this.prod.meth = [
		new game.production.build("Meth build 1", 250, 			0.5, 	1.60),
		new game.production.build("Meth build 2", 500000, 		2, 		1.50),
		new game.production.build("Meth build 3", 25000000, 	4, 		1.40)
	];
	this.prod.cocaine = [
		new game.production.build("Cocaine build 1", 250, 			0.5, 	1.60),
		new game.production.build("Cocaine build 2", 500000, 		2, 		1.50),
		new game.production.build("Cocaine build 3", 25000000, 		4, 		1.40)
	];

	for (var i = 0; i < this.prod.weed.length; i++) {
		this.prod.weedOwned.push(0);
		this.prod.weedPerSec.push(0);
	}
	for (var i = 0; i < this.prod.meth.length; i++) {
		this.prod.methOwned.push(0);
		this.prod.methPerSec.push(0);
	}
	for (var i = 0; i < this.prod.cocaine.length; i++) {
		this.prod.cocaineOwned.push(0);
		this.prod.cocainePerSec.push(0);
	}

	for (var i = 0; i < game.production.list.length; i++) {
		var drugIndex = (game.production.list[i]).toLowerCase();
		var forwhat = window["game"]["production"]["prod"][drugIndex];
		this.stock.push(0);
		this.multipliers.push(1);
		for (var e = 0; e < forwhat.length; e++) {
			$("#production-" + drugIndex + "-" + (e+1)).attr('onclick', 'game.production.prod.buy(' + i + ',' + e + ');');
		}
	};

	this.display();
};
game.production.display = function() {
	this.prod.display();

	for (var i = 0; i < this.list.length; i++) {
		var drug = (this.list[i]).toLowerCase();
		var forwhat = window["game"]["production"]["prod"][drug];
		for (var e = 0; e < forwhat.length; e++) {
			var html = {
				name: this.list[i],
				stock: this.stock[i],
				plus: this.prod.getDrugPerSec(i),
				price: this.getDrugReward(i)
			};
			$("#" + drug + "-stock").html(html.name + ": " + fix(html.stock, 2) + "g<br><small>(+" + fix(html.plus, 3) + "g/s ; - TODO)</small><br>" + "<small>($" + fix(html.price, 2) + "/g)</small>")
		}
	}
};
game.production.angularDisplay = function() {
	for (var i = 0; i < game.production.list.length; i++) {
		var drug = (game.production.list[i]).toLowerCase();
		var forwhat = window["game"]["production"]["prod"][drug];
		for (var e = 0; e < forwhat.length; e++) {
			$("#production-" + drug + "-" + (e+1)).attr('onclick', 'game.production.prod.buy(' + i + ',' + e + ');');
		}
	};
};
game.production.prod.getDrugPerSec = function(drugIndex) {
	var drug = (game.production.list[drugIndex]).toLowerCase();
	var str = (drug.toString() + "PerSec");
	var part = window["game"]["production"]["prod"][str];
	var amount = 0;
	for (var i = 0; i < part.length; i++) {
		amount += part[i]
	}
	return amount;
};
game.production.prod.getReward = function(drugIndex, buildIndex) {
	var buildReward = game.production.getWhat(drugIndex, buildIndex, 'reward');
	return (buildReward);
};
game.production.prod.getRewardOwned = function(drugIndex, buildIndex) {
	var drug = (game.production.list[drugIndex]).toLowerCase();
	var mainReward = game.production.getWhat(drugIndex, buildIndex, 'reward');
	var owned = window["game"]["production"]["prod"][drug + "Owned"][buildIndex];
	return (mainReward * owned);
};
game.production.prod.getPrice = function(drugIndex, buildIndex) {
	var drug = (game.production.list[drugIndex]).toLowerCase();
	var buildPrice = game.production.getWhat(drugIndex, buildIndex, 'price');
	var buildInflation = game.production.getWhat(drugIndex, buildIndex, 'inflation');
	var owned = window["game"]["production"]["prod"][drug + "Owned"][buildIndex];
	return (buildPrice * Math.pow(buildInflation, owned));
};
game.production.prod.display = function() {
	for (var i = 0; i < game.production.list.length; i++) {
		var drug = (game.production.list[i]).toLowerCase();
		var forwhat = window["game"]["production"]["prod"][drug];
		for (var e = 0; e < forwhat.length; e++) {
			var html = {
				name: forwhat[e].name,
				owned: window["game"]["production"]["prod"][drug + "Owned"],
				reward: this.getReward(i, e),
				price: this.getPrice(i, e)
			};
			$("#production-" + drug + "-" + (e+1)).html(html.name + '<span>' + html.owned[e] + ' owned</span><br>+' + fix(html.reward, 2) + 'g/sec' + '<span>$' + fix(html.price, 2) + '</span>');
		}
	}
};
game.production.prod.buy = function(drugIndex, buildIndex) {
	var price = this.getPrice(drugIndex, buildIndex);
	if (game.money >= price) {
		game.money -= price;
		var drug = (game.production.list[drugIndex]).toLowerCase();
		var owned = window["game"]["production"]["prod"][drug + "Owned"];
		window["game"]["production"]["prod"][drug + "Owned"][buildIndex]++;
		window["game"]["production"]["prod"][drug + "PerSec"][buildIndex] += this.getReward(drugIndex, buildIndex);
		this.display();
	}
};
game.production.prod.run = function(times) {
	for (var i = 0; i < game.production.list.length; i++) {
		var drug = (game.production.list[i]).toLowerCase();
		var forwhat = window["game"]["production"]["prod"][drug];
		for (var e = 0; e < forwhat.length; e++) {
			window["game"]["production"]["stock"][i] += (this.getRewardOwned(i, e) / game.options.fps);
		}
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
	game.production.prod.run(times);
};
game.options.display = function() {
	$(".navbar-brand").html("$" + fix(game.money) + " - lvl. 1");

	game.production.display();
};
game.options.init = function() {
	game.actions.init();
	game.production.init();

	// from stackoverflow.com/q/22570357/
	var controllerElement = $('.game-content');
	var controllerScope = angular.element(controllerElement).scope();
	controllerScope.setInt();
};
