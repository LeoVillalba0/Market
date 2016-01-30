define(['angular'], function() {
    var production = {
        list: ["Weed", "Meth", "Cocaine"],
        prices: [1e5, 15e7, 75e8],
        multipliers: new Array(),
        totalMultiplier: 1,
        stock: new Array(),
        invested: false,
        investPrice: 15e11,
        alert: [false, false, false],

        prod: {
            weed: new Array(),
			weedOwned: new Array(),
			weedPerSec: new Array(),
			meth: new Array(),
			methOwned: new Array(),
			methPerSec: new Array(),
			cocaine: new Array(),
			cocaineOwned: new Array(),
			cocainePerSec: new Array(),

            getWhat: function(drugIndex, buildIndex, type) {
                var drug = (game.production.list[drugIndex]).toLowerCase();
            	var want = type.toLowerCase();
            	var result = window["game"]["production"]["prod"][drug][buildIndex][want];
            	return result;
            },

            getDrugPerSec: function(drugIndex) {
                var drug = (game.production.list[drugIndex]).toLowerCase();
            	var part = window["game"]["production"]["prod"][drug + "PerSec"];
            	var amount = 0;
            	for (var i = 0; i < part.length; i++) {
            		amount += part[i]
            	};
            	return amount;
            },

            getReward: function(drugIndex, buildIndex) {
                var buildReward = game.production.prod.getWhat(drugIndex, buildIndex, 'reward');
            	return buildReward;
            },

            getRewardOwned: function(drugIndex, buildIndex) {
                var drug = (game.production.list[drugIndex]).toLowerCase();
            	var mainReward = game.production.prod.getWhat(drugIndex, buildIndex, 'reward');
            	var owned = window["game"]["production"]["prod"][drug + "Owned"][buildIndex];
            	return (mainReward * owned);
            },

            getPrice: function(drugIndex, buildIndex) {
                var drug = (game.production.list[drugIndex]).toLowerCase();
            	var buildPrice = game.production.prod.getWhat(drugIndex, buildIndex, 'price');
            	var buildInflation = game.production.prod.getWhat(drugIndex, buildIndex, 'inflation');
            	var owned = window["game"]["production"]["prod"][drug + "Owned"][buildIndex];
            	return (buildPrice * Math.pow(buildInflation, owned));
            },

            buy: function(drugIndex, buildIndex) {
                var price = this.getPrice(drugIndex, buildIndex);
            	if (game.money >= price) {
            		game.money -= price;
            		var drug = (game.production.list[drugIndex]).toLowerCase();
            		window["game"]["production"]["prod"][drug + "Owned"][buildIndex]++;
            		window["game"]["production"]["prod"][drug + "PerSec"][buildIndex] += this.getReward(drugIndex, buildIndex);
            		this.display();
            	};
            },

            run: function(times) {
                if (!game.options.pause) {
            		for (var i = 0; i < game.production.list.length; i++) {
                        if (!game.production.alert[i]) {
                			var gain = ((this.getDrugPerSec(i) * times) / game.options.fps)
                			window["game"]["production"]["stock"][i] += gain;
                        };
            		};
            	};
            },

            display: function() {
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
            		};
            	};
            }
        },

        sell: {
			weed: new Array(),
			weedOwned: new Array(),
			weedPerSec: new Array(),
			meth: new Array(),
			methOwned: new Array(),
			methPerSec: new Array(),
			cocaine: new Array(),
			cocaineOwned: new Array(),
			cocainePerSec: new Array(),

            getWhat: function(drugIndex, buildIndex, type) {
                var drug = (game.production.list[drugIndex]).toLowerCase();
            	var want = type.toLowerCase();
            	var result = window["game"]["production"]["sell"][drug][buildIndex][want];
            	return result;
            },

            getDealerSell: function(drugIndex, buildIndex) {
                var drug = (game.production.list[drugIndex]).toLowerCase();
            	var reward = window["game"]["production"]["sell"][drug][buildIndex]["reward"];
            	var owned = window["game"]["production"]["sell"][drug + "Owned"][buildIndex];
            	var result = (owned * reward);
            	return result;
            },

            getDrugPerSec: function(drugIndex) {
                var drug = (game.production.list[drugIndex]).toLowerCase();
            	var part = window["game"]["production"]["sell"][drug + "PerSec"];
            	var amount = 0;
            	for (var i = 0; i < part.length; i++) {
            		amount += part[i];
            	};
            	return amount;
            },

            getPrice: function(drugIndex, buildIndex) {
                var drug = (game.production.list[drugIndex]).toLowerCase();
            	var buildPrice = game.production.sell.getWhat(drugIndex, buildIndex, 'price');
            	var buildInflation = game.production.sell.getWhat(drugIndex, buildIndex, 'inflation');
            	var owned = window["game"]["production"]["sell"][drug + "Owned"][buildIndex];
            	return (buildPrice * Math.pow(buildInflation, owned));
            },

            getReward: function(drugIndex, buildIndex) {
                var buildReward = this.getWhat(drugIndex, buildIndex, 'reward');
            	return buildReward;
            },

            getSellAllPrice: function(drugIndex) {
                var sellPrice = game.production.getDrugReward(drugIndex);
                var newPrice = (25 * sellPrice) / 100;
                return newPrice;
            },

            sellAll: function(drugIndex) {
                var sellPrice = game.production.getDrugReward(drugIndex);
                var newPrice = (25 * sellPrice) / 100;
                var sold = newPrice * game.production.stock[drugIndex];
                game.production.stock[drugIndex] = 0;
                game.gainMoney(sold);
            },

            display: function() {
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
            		};
            	};
            },

            run: function(times) {
                if (!game.options.pause) {
            		for (var i = 0; i < game.production.list.length; i++) {
                        var drug = (game.production.list[i]).toLowerCase();
            			var drugPrice = game.production.getDrugReward(i);
            			var sold = ((this.getDrugPerSec(i) * times) / game.options.fps);
            			var canSell = ((game.production.prod.getDrugPerSec(i) * times) / game.options.fps);
            			var gain = (canSell * drugPrice);

                        if (game.production.alert[i] == false) {
                            if (sold > canSell) {
                                game.production.alert[i] = "notify";
                                if (game.production.alert[i] == "notify") {
                                    notify.pop("alert", "Production warning: you sell more " + drug + " than you can produce, selling for " + drug + " is disabled until you can sell as much as you produce.");
                                    game.production.alert[i] = true;
                                };
                            };
                            if (sold <= canSell) {
                                gain = (sold * drugPrice);
                                game.production.stock[i] -= sold;
                                game.gainMoney(gain);
                            };
                        } else {
                            if (sold <= canSell) {
                                notify.pop("success", "Production news: you now produce enough " + drug + " to sell it.");
                                game.production.alert[i] = false;
                            };
                        };
            		};
            	};
            },

            buy: function(drugIndex, buildIndex) {
                var price = this.getPrice(drugIndex, buildIndex);
            	if (game.money >= price) {
            		game.money -= price;
            		var drug = (game.production.list[drugIndex]).toLowerCase();
            		window["game"]["production"]["sell"][drug + "Owned"][buildIndex]++;
            		window["game"]["production"]["sell"][drug + "PerSec"][buildIndex] += this.getReward(drugIndex, buildIndex);
            		this.display();
            	};
            }
		},

        getDrugReward: function(drugIndex) {
            return ((this.prices[drugIndex] * this.multipliers[drugIndex]) * this.totalMultiplier);
        },

        invest: function() {
            if (game.money >= this.investPrice && !this.invested) {
        		game.money -= this.investPrice;
        		this.invested = true;

                $("#production-locked").fadeOut("slow", function() {
                    $("#production-unlocked").fadeIn("slow");
                });
        	};
        },

        create: function(name, price, reward, inflation) {
            this.name = name;
        	this.price = price;
        	this.reward = reward;
        	this.inflation = inflation;
        },

        display: function() {
            this.prod.display();
            this.sell.display();
        },

        displayDrugs: function() {
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
        		};
            };
        },

        run: function(times) {
            this.prod.run(times);
            this.sell.run(times);
        },

        varInit: function() {
            this.prod.weed = [
        	    new this.create("Backyard", 15e6, 0.5, 1.60),
        	    new this.create("Green House", 50e8, 2, 1.50),
        	    new this.create("Brazilian Farm", 150e12, 4, 1.30)
        	];
            this.prod.meth = [
        	    new this.create("Mobile RV Lab", 25e8, 0.5, 1.60),
        	    new this.create("Basement Lab", 150e10, 2, 1.50),
        	    new this.create("Professional Chemical Lab", 500e14, 4, 1.30)
        	];
            this.prod.cocaine = [
        	    new this.create("Small Farm", 75e10, 0.5, 1.60),
        	    new this.create("Bolivian Farm", 300e12, 2, 1.50),
        	    new this.create("Columbian Estate", 750e16, 4, 1.30)
        	];

            this.sell.weed = [
        	    new this.create("Backyard Dealer", 15e6, 0.5, 1.60),
        	    new this.create("Downtown Dealer", 50e8, 2, 1.50),
        	    new this.create("Nightclub Owner", 150e12, 4, 1.30)
        	];
            this.sell.meth = [
        	    new this.create("Dark Alley", 25e8, 0.5, 1.60),
        	    new this.create("Meth House", 150e10, 2, 1.50),
        	    new this.create("Mafia Associates", 500e14, 4, 1.30)
        	];
            this.sell.cocaine = [
        	    new this.create("Casino Owner", 75e10, 0.5, 1.60),
        	    new this.create("Executive's Club Chairman", 300e12, 2, 1.50),
        	    new this.create("Drug Trafficking Syndicate", 750e16, 4, 1.30)
        	];

            for (var i = 0; i < this.prod.weed.length; i++) {
        		this.prod.weedOwned.push(0);
        		this.prod.weedPerSec.push(0);
        		this.sell.weedOwned.push(0);
        		this.sell.weedPerSec.push(0);
        	};

        	for (var i = 0; i < this.prod.meth.length; i++) {
        		this.prod.methOwned.push(0);
        		this.prod.methPerSec.push(0);
        		this.sell.methOwned.push(0);
        		this.sell.methPerSec.push(0);
        	};

        	for (var i = 0; i < this.prod.cocaine.length; i++) {
        		this.prod.cocaineOwned.push(0);
        		this.prod.cocainePerSec.push(0);
        		this.sell.cocaineOwned.push(0);
        		this.sell.cocainePerSec.push(0);
        	};

            for (var i = 0; i < this.list.length; i++) {
        		this.stock.push(0);
        		this.multipliers.push(1);
        	};
        },

        domInit: function() {
            $("#production-invest").attr('onclick', 'game.production.invest();');

            if (this.invested) {
                $("#production-locked").css('display', 'none');
                $("#production-unlocked").css('display', 'block');
            };

            for (var i = 0; i < game.production.list.length; i++) {
                var sellAllPrice = this.sell.getSellAllPrice(i);
                var drug = (game.production.list[i]).toLowerCase();
                var forwhat = window["game"]["production"]["prod"][drug];

                $("#" + drug + '-sellall').attr('onclick', 'game.production.sell.sellAll(' + i + ');');
                $("#" + drug + '-sellall').html("Sell " + drug + " stock :<br>$" + fix(sellAllPrice, 0) + "/g")

                for (var e = 0; e < forwhat.length; e++) {
                    $("#production-" + drug + "-" + (e+1)).attr('onclick', 'game.production.prod.buy(' + i + ',' + e + ');');
                    $("#selling-" + drug + "-" + (e+1)).attr('onclick', 'game.production.sell.buy(' + i + ',' + e + ');');
                };
            };

            this.display();
        },

        angularInit: function() {
            this.domInit();
        },

        init: function() {
            this.varInit();

            window["game"]["production"] = this;
            log("Production init.");
        }
    };

    return production.init();
});
