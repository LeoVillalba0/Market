define(['angular'], function() {
    var statistics = {

        cR: function(label, actual, thisRunVal, allTimeVal, col) {
            if (col && col === '1-2') {
                var html = "<tr>" +
                    "<th>" + label + "</th>" +
                    "<th>" + actual + "</th>" +
                    '<th colspan="2">' + thisRunVal + '</th>' +
                    "</tr>";
            } else if (col && col === '2-1') {
                var html = "<tr>" +
                    "<th>" + label + "</th>" +
                    '<th colspan="2">' + actual + '</th>' +
                    "<th>" + thisRunVal + "</th>" +
                    "</tr>";
            } else if (col && col === '3') {
                var html = "<tr>" +
                    "<th>" + label + "</th>" +
                    '<th colspan="3">' + actual + '</th>' +
                    "</tr>";
            } else {
                var html = "<tr>" +
                    "<th>" + label + "</th>" +
                    "<th>" + actual + "</th>" +
                    "<th>" + thisRunVal + "</th>" +
                    "<th>" + allTimeVal + "</th>" +
                    "</tr>";
            }

            return html;
        },

        cSH: function(label) {
            var html = "<tr>" +
                '<th colspan="4" style="text-decoration:underline;text-align:center">' + label + '</th>' +
                '</tr>';

            return html;
        },

        display: function() {
            $("#table-statistics tbody").html("");
            $("#table-statistics tbody").append(this.cR("Money", fix(game.money, 3), fix(game.totalMoney, 3), fix(game.allTimeMoney, 3)));
            $("#table-statistics tbody").append(this.cR("Reputation", fix(game.reputation, 3), fix(game.totalReputation, 3), fix(game.allTimeReputation, 3)));
            $("#table-statistics tbody").append(this.cR("Total Money Multiplier", '*' + fix(game.actions.totalRewardMultiplier, 3), '', ''));
            $("#table-statistics tbody").append(this.cR("Total Time Multiplier", '*' + fix(game.actions.totalTimeMultiplier, 3), '', ''));
            $("#table-statistics tbody").append(this.cR("Total Reputation Multiplier", '*' + fix(game.actions.totalReputationMultiplier, 3), '', ''));
            $("#table-statistics tbody").append(this.cSH("<b>ACTIONS</b>"));

            var aList = game.actions.list;
            for (var i = 0; i < aList.length; i++) {
                name = aList[i];
                reward = game.actions.getReward(i);
                perSec = game.actions.getPerSec(i);
                lvl = game.actions.owned[i];
                $("#table-statistics tbody").append(this.cR(name, 'Lvl: ' + lvl, '$' + fix(reward), '$' + fix(perSec) + '/Sec.'));
            }

        },

        varInit: function() {},

        domInit: function() {
            var height = $("body").height();
            this.display();
        },

        angularInit: function() {
            this.domInit();
        },

        init: function() {
            this.varInit();

            window["game"]["statistics"] = this;
            log("Statistics init.");
        }
    };

    return statistics.init();
});
