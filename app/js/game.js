var game = {
	money: 0,
	totalMoney: 0,

	options: {
		fps: 20,
		interval: (1000/20),
		angularInit: false,
		before: new Date().getTime(),
		after: new Date().getTime(),
		version: 0.001
	},

	upgrades: {
		actions: {
			list: [],
			bought: []
		},
		production: {
			list: [],
			bought: []
		}
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
		totalRewardMultiplier: 1,
		time: [3, 10, 30, 120, 600, 3600],
		timeMultiplier: [],
		totalTimeMultiplier: 1
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
		},
		sell: {
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

// from stackoverflow.com/q/12944987/
var debug = console.log.bind(console, "DEBUG:");
var log = console.info.bind(console, "BR-v" + game.options.version + ":");

// from stackoverflow.com/q/1026069/
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

game.upgrades.create = function(name, desc, price, str, who, effect) {
	this.name = name;
	this.desc = desc;
	this.price = price;
	this.str = str;
	this.who = who;
	this.effect = effect;
};
game.upgrades.init = function() {
	this.actions.list = [
		new game.upgrades.create("Shooting upgrade", 		"Shooting reward x3", 			25000, 		"rewardMultiplier", 		"0", "*3"),
		new game.upgrades.create("Street fight upgrade", 	"Street fight reward x3", 		75000, 		"rewardMultiplier", 		"1", "*3"),
		new game.upgrades.create("Pickpocket upgrade", 		"Pickpocket reward x3", 		150000, 	"rewardMultiplier", 		"2", "*3"),
		new game.upgrades.create("Bank robbery upgrade", 	"Bank robbery reward x3", 		500000, 	"rewardMultiplier", 		"3", "*3"),
		new game.upgrades.create("Steal car upgrade", 		"Steal car reward x3", 			2500000, 	"rewardMultiplier", 		"4", "*3"),
		new game.upgrades.create("Jewelry robbery upgrade", "Jewelry robbery reward x3", 	10000000,	"rewardMultiplier", 		"5", "*3"),
		new game.upgrades.create("All actions upgrade",		"All actions reward x3",		50000000,	"totalRewardMultiplier", 	"n", "*3"),
		new game.upgrades.create("Shooting upgrade", 		"Shooting reward x3", 			100000000, 		"rewardMultiplier", 		"0", "*3"),
		new game.upgrades.create("Street fight upgrade", 	"Street fight reward x3", 		250000000, 		"rewardMultiplier", 		"1", "*3"),
		new game.upgrades.create("Pickpocket upgrade", 		"Pickpocket reward x3", 		500000000, 		"rewardMultiplier", 		"2", "*3"),
		new game.upgrades.create("Bank robbery upgrade", 	"Bank robbery reward x3", 		2500000000, 	"rewardMultiplier", 		"3", "*3"),
		new game.upgrades.create("Steal car upgrade", 		"Steal car reward x3", 			7500000000, 	"rewardMultiplier", 		"4", "*3"),
		new game.upgrades.create("Jewelry robbery upgrade", "Jewelry robbery reward x3", 	25000000000,	"rewardMultiplier", 		"5", "*3"),
		new game.upgrades.create("All actions upgrade",		"All actions reward x3",		50000000000,	"totalRewardMultiplier", 	"n", "*3")
	];

	for (var i = 0; i < this.actions.list.length; i++) {
		this.actions.bought.push(false);
		$("#upgrades-actions").append('<li id="upgrades-actions-upgrade-' + (i+1) + '" class="list-group-item"></li>');
		$("#upgrades-actions-upgrade-" + (i+1)).attr('onclick', 'game.upgrades.actions.buy(' + i + ');');
	};

	this.production.list = [
		new game.upgrades.create("Weed upgrade", 	"Weed reward x3", 		500, 	"multipliers", "0", "*3"),
		new game.upgrades.create("Meth upgrade", 	"Meth reward x3", 		2500, 	"multipliers", "1", "*3"),
		new game.upgrades.create("Cocaine upgrade",	"Cocaine reward x3",	10000,	"multipliers", "2", "*3")
	];

	for (var i = 0; i < this.production.list.length; i++) {
		this.production.bought.push(false);
		$("#upgrades-production").append('<li id="upgrades-production-upgrade-' + (i+1) + '" class="list-group-item"></li>');
		$("#upgrades-production-upgrade-" + (i+1)).attr('onclick', 'game.upgrades.production.buy(' + i + ');');
	};

	this.display();

	log("Game upgrades init.");
};
game.upgrades.display = function() {
	this.actions.display();
	this.production.display();
};
game.upgrades.angularDisplay = function() {
	for (var i = 0; i < this.actions.list.length; i++) {
		$("#upgrades-actions").append('<li id="upgrades-actions-upgrade-' + (i+1) + '" class="list-group-item"></li>');
		$("#upgrades-actions-upgrade-" + (i+1)).attr('onclick', 'game.upgrades.actions.buy(' + i + ');');
	};

	this.actions.display();

	for (var i = 0; i < this.production.list.length; i++) {
		$("#upgrades-production").append('<li id="upgrades-production-upgrade-' + (i+1) + '" class="list-group-item"></li>');
		$("#upgrades-production-upgrade-" + (i+1)).attr('onclick', 'game.upgrades.production.buy(' + i + ');');
	};

	this.production.display();
};

game.upgrades.actions.buy = function(upgradeIndex) {
	var price = this.list[upgradeIndex].price;
	var what = this.list[upgradeIndex].str;
	var whoInWhat = this.list[upgradeIndex].who;
	var effect = this.list[upgradeIndex].effect;

	if (game.money >= price && !this.bought[upgradeIndex]) {
		if (whoInWhat !== "n") {
			var value = window["game"]["actions"][what][whoInWhat];
			game.money -= price;
			this.bought[upgradeIndex] = true;
			window["game"]["actions"][what][whoInWhat] = eval(value + effect);
			this.display();
		} else {
			var value = window["game"]["actions"][what];
			game.money -= price;
			this.bought[upgradeIndex] = true;
			window["game"]["actions"][what] = eval(value + effect);
			this.display();
		};
	};
};
game.upgrades.actions.display = function() {
	for (var i = 0; i < this.list.length; i++) {
		var bought = this.bought[i];
		var html = {
			name: this.list[i].name,
			desc: this.list[i].desc,
			price: this.list[i].price
		};

		if (bought) {
			$("#upgrades-actions-upgrade-" + (i+1)).attr('class', 'list-group-item upgrade-bought');
			$("#upgrades-actions-upgrade-" + (i+1)).html(html.name + "<span>Owned</span><br>" + html.desc);
		} else {
			$("#upgrades-actions-upgrade-" + (i+1)).html(html.name + "<span>Cost $" + fix(html.price, 2) + "</span><br>" + html.desc);
		};
	}
};
game.upgrades.production.buy = function(upgradeIndex) {
	var price = this.list[upgradeIndex].price;
	var what = this.list[upgradeIndex].str;
	var whoInWhat = this.list[upgradeIndex].who;
	var effect = this.list[upgradeIndex].effect;

	if (game.money >= price && !this.bought[upgradeIndex]) {
		var value = window["game"]["production"][what][whoInWhat];
		game.money -= price;
		this.bought[upgradeIndex] = true;
		window["game"]["production"][what][whoInWhat] = eval(value + effect);
		this.display();
	};
};
game.upgrades.production.display = function() {
	for (var i = 0; i < this.list.length; i++) {
		var bought = this.bought[i];
		var html = {
			name: this.list[i].name,
			desc: this.list[i].desc,
			price: this.list[i].price
		};

		if (bought) {
			$("#upgrades-production-upgrade-" + (i+1)).attr('class', 'list-group-item upgrade-bought');
			$("#upgrades-production-upgrade-" + (i+1)).html(html.name + "<span>Owned</span><br>" + html.desc);
		} else {
			$("#upgrades-production-upgrade-" + (i+1)).html(html.name + "<span>Cost $"+ fix(html.price, 2) + '</span><br>' + html.desc);
		};
	};
};

game.actions.gainMoney = function(amount) {
	game.money += amount;
	game.totalMoney += amount;
};
game.actions.getTime = function(index) {
	return ((this.time[index] / this.timeMultiplier[index]) / this.totalTimeMultiplier);
};
game.actions.getReward = function(index) {
	return ((this.owned[index] * this.reward[index] * this.rewardMultiplier[index]) * this.totalRewardMultiplier);
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

	log("Game actions init.");
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
			if (time < 0.15)
				width = 100;
			width = Math.max(width, 1);
			$("#action-progress-" + (i+1)).css('width', width + '%');
			$("#action-nb-" + (i+1)).html(Math.floor(width) + "%");
		};
	}
};

game.production.build = function(name, price, reward, inflation) {
	this.name = name;
	this.price = price;
	this.reward = reward;
	this.inflation = inflation;
};
game.production.init = function() {
	this.prod.weed = [
		new game.production.build("Backyard", 					250, 			0.5, 	1.60),
		new game.production.build("Green House", 				500000, 		2, 		1.50),
		new game.production.build("Brazilian Farm",				25000000, 		4, 		1.30)
	];
	this.prod.meth = [
		new game.production.build("Mobile RV Lab", 				1000000, 		0.5, 	1.60),
		new game.production.build("Basement Lab", 				750000000, 		2, 		1.50),
		new game.production.build("Professional Chemical Lab", 	50000000000, 	4, 		1.30)
	];
	this.prod.cocaine = [
		new game.production.build("Small Farm", 				25000000000, 	0.5, 	1.60),
		new game.production.build("Bolivian Farm", 				750000000000, 	2, 		1.50),
		new game.production.build("Columbian Estate", 			2500000000000, 	4, 		1.30)
	];

	this.sell.weed = [
		new game.production.build("Backyard Dealer", 			250, 			0.5, 	1.60),
		new game.production.build("Downtown Dealer", 			500000, 		2, 		1.50),
		new game.production.build("Nightclub Owner", 			25000000, 		4, 		1.30)
	];
	this.sell.meth = [
		new game.production.build("Dark Alley", 				1000000, 		0.5, 	1.60),
		new game.production.build("Meth House", 				750000000, 		2, 		1.50),
		new game.production.build("Mafia Associates", 			50000000000, 	4, 		1.30)
	];
	this.sell.cocaine = [
		new game.production.build("Casino Owner", 				25000000000, 	0.5, 	1.60),
		new game.production.build("Executive's Club Chairman", 	750000000000, 	2, 		1.50),
		new game.production.build("Drug Trafficking Syndicate",	2500000000000, 	4, 		1.30)
	];

	for (var i = 0; i < this.prod.weed.length; i++) {
		this.prod.weedOwned.push(0);
		this.prod.weedPerSec.push(0);
		this.sell.weedOwned.push(0);
		this.sell.weedPerSec.push(0);
	}
	for (var i = 0; i < this.prod.meth.length; i++) {
		this.prod.methOwned.push(0);
		this.prod.methPerSec.push(0);
		this.sell.methOwned.push(0);
		this.sell.methPerSec.push(0);
	}
	for (var i = 0; i < this.prod.cocaine.length; i++) {
		this.prod.cocaineOwned.push(0);
		this.prod.cocainePerSec.push(0);
		this.sell.cocaineOwned.push(0);
		this.sell.cocainePerSec.push(0);
	}

	for (var i = 0; i < game.production.list.length; i++) {
		var drug = (game.production.list[i]).toLowerCase();
		var forwhat = window["game"]["production"]["prod"][drug];
		this.stock.push(0);
		this.multipliers.push(1);

		for (var e = 0; e < forwhat.length; e++) {
			$("#production-" + drug + "-" + (e+1)).attr('onclick', 'game.production.prod.buy(' + i + ',' + e + ');');
			$("#selling-" + drug + "-" + (e+1)).attr('onclick', 'game.production.sell.buy(' + i + ',' + e + ');');
		}
	};

	this.display();

	log("Game production init.");
};
game.production.display = function() {
	this.prod.display();
	this.sell.display();

	for (var i = 0; i < this.list.length; i++) {
		var drug = (this.list[i]).toLowerCase();
		var forwhat = window["game"]["production"]["prod"][drug];
		for (var e = 0; e < forwhat.length; e++) {
			var html = {
				name: this.list[i],
				stock: this.stock[i],
				plus: this.prod.getDrugPerSec(i),
				minus: this.sell.getDrugPerSec(i),
				price: this.getDrugReward(i)
			};

			$("#" + drug + "-stock").html(html.name + ": " + fix(html.stock, 2) + "g<br><small>(+" + fix(html.plus, 3) + "g/s ; -" + fix(html.minus, 3) + "g/s)</small><br>" + "<small>($" + fix(html.price, 2) + "/g)</small>")
		}
	}
};
game.production.angularDisplay = function() {
	for (var i = 0; i < game.production.list.length; i++) {
		var drug = (game.production.list[i]).toLowerCase();
		var forwhat = window["game"]["production"]["prod"][drug];

		for (var e = 0; e < forwhat.length; e++) {
			$("#production-" + drug + "-" + (e+1)).attr('onclick', 'game.production.prod.buy(' + i + ',' + e + ');');
			$("#selling-" + drug + "-" + (e+1)).attr('onclick', 'game.production.sell.buy(' + i + ',' + e + ');');
		}
	};
};
game.production.getDrugReward = function(drugIndex) {
	return (this.prices[drugIndex] * this.multipliers[drugIndex]);
};

game.production.sell.getWhat = function(drugIndex, buildIndex, type) {
	var drug = (game.production.list[drugIndex]).toLowerCase();
	var want = type.toLowerCase();
	var result = window["game"]["production"]["sell"][drug][buildIndex][want];
	return result;
};
game.production.sell.getDealerSell = function(drugIndex, buildIndex) {
	var drug = (game.production.list[drugIndex]).toLowerCase();
	var reward = window["game"]["production"]["sell"][drug][buildIndex]["reward"];
	var owned = window["game"]["production"]["sell"][drug + "Owned"][buildIndex];
	var result = (owned * reward);
	return result;
};
game.production.sell.getDrugPerSec = function(drugIndex) {
	var drug = (game.production.list[drugIndex]).toLowerCase();
	var part = window["game"]["production"]["sell"][drug + "PerSec"];
	var amount = 0;
	for (var i = 0; i < part.length; i++) {
		amount += part[i];
	}
	return amount;
};
game.production.sell.getPrice = function(drugIndex, buildIndex) {
	var drug = (game.production.list[drugIndex]).toLowerCase();
	var buildPrice = game.production.sell.getWhat(drugIndex, buildIndex, 'price');
	var buildInflation = game.production.sell.getWhat(drugIndex, buildIndex, 'inflation');
	var owned = window["game"]["production"]["sell"][drug + "Owned"][buildIndex];
	return (buildPrice * Math.pow(buildInflation, owned));
};
game.production.sell.getReward = function(drugIndex, buildIndex) {
	var buildReward = this.getWhat(drugIndex, buildIndex, 'reward');
	return (buildReward);
};
game.production.sell.gainMoney = function(amount) {
	game.money += amount;
	game.totalMoney += amount;
};
game.production.sell.display = function() {
	for (var i = 0; i < game.production.list.length; i++) {
		var drug = (game.production.list[i]).toLowerCase();
		var forwhat = window["game"]["production"]["sell"][drug];
		for (var e = 0; e < forwhat.length; e++) {
			var html = {
				name: forwhat[e].name,
				owned: window["game"]["production"]["sell"][drug + "Owned"],
				reward: this.getReward(i, e),
				price: this.getPrice(i, e)
			};
			$("#selling-" + drug + "-" + (e+1)).html(html.name + '<span>' + html.owned[e] + ' owned</span><br>Sell ' + fix(html.reward, 2) + 'g/sec' + '<span>$' + fix(html.price, 2) + '</span>');
		}
	}
};
game.production.sell.run = function(times) {
	for (var i = 0; i < 1; i++) {
		var drugPrice = game.production.getDrugReward(i);
		var sold = ((this.getDrugPerSec(i) * times) / game.options.fps);
		var gain = (sold * drugPrice);
		if (sold > game.production.stock[i]) {
			sold = game.production.stock[i];
		}
		game.production.stock[i] -= sold;
		this.gainMoney(gain);
	}
};
game.production.sell.buy = function(drugIndex, buildIndex) {
	var price = this.getPrice(drugIndex, buildIndex);
	if (game.money >= price) {
		game.money -= price;
		var drug = (game.production.list[drugIndex]).toLowerCase();
		window["game"]["production"]["sell"][drug + "Owned"][buildIndex]++;
		window["game"]["production"]["sell"][drug + "PerSec"][buildIndex] += this.getReward(drugIndex, buildIndex);
		this.display();
	}
};

game.production.prod.getWhat = function(drugIndex, buildIndex, type) {
	var drug = (game.production.list[drugIndex]).toLowerCase();
	var want = type.toLowerCase();
	var result = window["game"]["production"]["prod"][drug][buildIndex][want];
	return result;
};
game.production.prod.getDrugPerSec = function(drugIndex) {
	var drug = (game.production.list[drugIndex]).toLowerCase();
	var part = window["game"]["production"]["prod"][drug + "PerSec"];
	var amount = 0;
	for (var i = 0; i < part.length; i++) {
		amount += part[i]
	}
	return amount;
};
game.production.prod.getReward = function(drugIndex, buildIndex) {
	var buildReward = game.production.prod.getWhat(drugIndex, buildIndex, 'reward');
	return (buildReward);
};
game.production.prod.getRewardOwned = function(drugIndex, buildIndex) {
	var drug = (game.production.list[drugIndex]).toLowerCase();
	var mainReward = game.production.prod.getWhat(drugIndex, buildIndex, 'reward');
	var owned = window["game"]["production"]["prod"][drug + "Owned"][buildIndex];
	return (mainReward * owned);
};
game.production.prod.getPrice = function(drugIndex, buildIndex) {
	var drug = (game.production.list[drugIndex]).toLowerCase();
	var buildPrice = game.production.prod.getWhat(drugIndex, buildIndex, 'price');
	var buildInflation = game.production.prod.getWhat(drugIndex, buildIndex, 'inflation');
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
		window["game"]["production"]["prod"][drug + "Owned"][buildIndex]++;
		window["game"]["production"]["prod"][drug + "PerSec"][buildIndex] += this.getReward(drugIndex, buildIndex);
		this.display();
	}
};
game.production.prod.run = function(times) {
	for (var i = 0; i < game.production.list.length; i++) {
		var gain = ((this.getDrugPerSec(i) * times) / game.options.fps)
		window["game"]["production"]["stock"][i] += gain;
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
	game.production.sell.run(times);
};
game.options.display = function() {
	$(".navbar-brand").html("$" + fix(game.money));

	game.production.display();
};
game.options.init = function() {
	game.actions.init();
	game.production.init();
	game.upgrades.init();

	// from stackoverflow.com/q/22570357/
	var controllerElement = $('.game-content');
	var controllerScope = angular.element(controllerElement).scope();
	controllerScope.setInt();

	kongInit();
	log("Game sucessfully loaded.");
};
