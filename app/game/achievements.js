define(['angular'], function() {
    var achievements = {
        actions: {
            list: new Array(),
            complete: new Array()
        },

        create: function(name, type, desc, desc2, part, reqName, reqValue, changeName, changeValue, rep) {
            this.name = name;
            this.type = type;
            this.desc = desc;
            this.desc2 = desc2;
            this.part = part; // actions or production for example
            this.reqName = reqName;
            this.reqValue = reqValue;
            this.changeName = changeName;
            this.changeValue = changeValue;
            this.rep = rep;
        },

        getCurrent: function(type, Index) {
            var index;
            switch (type) {
                case 0:
                    for (var i = 0; i < this.actions.list.length; i++) {
                        if (!this.actions.complete[i] && this.actions.list[i].type == Index) {
                            index = i;
                            i = this.actions.list.length;
                        };
                    };
                    break;
                case 1:
                    // todo with production
                    break;
            };
            return index;
        },

        isComplete: function(index, part) {
            var need = window["game"]["achievements"][part]["list"][index]["reqValue"];
            var reqName = window["game"]["achievements"][part]["list"][index]["reqName"];
            var reqNameIndex = reqName.substring(reqName.indexOf('[') + 1, reqName.indexOf(']'));
            var actual = window["game"][part][reqName.substring(0, reqName.indexOf('['))][reqNameIndex];
            return actual >= need;
        },

        achieve: function(index, part) {
            var changeValue = window["game"]["achievements"][part]["list"][index]["changeValue"];
            var changeName = window["game"]["achievements"][part]["list"][index]["changeName"];

            if (changeName !== "") {
                var changeNameIndex = changeName.substring(changeName.indexOf('[') + 1, changeName.indexOf(']'));
                var actual = window["game"][part][changeName.substring(0, changeName.indexOf('['))][changeNameIndex];
                window["game"][part][changeName.substring(0, changeName.indexOf('['))][changeNameIndex] = eval(actual + changeValue); // eval is evil!
            }

            var rep = window["game"]["achievements"][part]["list"][index]["rep"];
            if (rep !== 0) {
                var repActual = window["game"]["reputation"];
                window["game"]["reputation"] += rep;
            }

            this.display();
            game.collections.getItemDroppedByChance();
            game.animateMenu('achievements');

            var name = window["game"]["achievements"][part]["list"][index]["name"];
            var effect = window["game"]["achievements"][part]["list"][index]["desc2"];
            notify.pop("success", "Achievement earned : " + name + "<br>" + effect);
        },

        countCompleted: function(type) {
            var completed = 0;

            switch (type) {
                case 0:
                    for (var i = 0; i < this.actions.complete.length; i++) {
                        if (this.actions.complete[i])
                            completed++;
                    };
                    break;
                case 1:
                    break;
            };

            return completed;
        },

        loop: function(initial) {
            for (var i = 0; i < this.actions.list.length; i++) {
                if (initial === true) {
                    if (game.achievements.isComplete(i, 'actions')) {
                        this.actions.complete[i] = true;
                    }
                } else {
                    if (game.achievements.isComplete(i, 'actions') && !this.actions.complete[i]) {
                        game.achievements.achieve(i, 'actions');
                        this.actions.complete[i] = true;
                    }
                }
            };

            this.display();
        },

        display: function() {
            for (var i = 0; i < game.actions.list.length; i++) {
                var index = this.getCurrent(0, i);
                var owned = this.countCompleted(0);
                var total = this.actions.list.length;
                var repHtmlText = "";
                if (typeof this.actions.list[index] !== "undefined") {
                    var html = {
                        name: this.actions.list[index].name,
                        desc: this.actions.list[index].desc,
                        desc2: this.actions.list[index].desc2,
                        rep: this.actions.list[index].rep
                    };

                    if (html.rep !== 0) repHtmlText = "<span>+" + fix(html.rep, 0) + " rep.</span>";

                    $("#achievements-actions-" + (i + 1)).html(
                        "<b>" + html.name + ":</b><span>" + html.desc + "</span><br>" +
                        html.desc2 +
                        repHtmlText
                    );
                } else {
                    $("#achievements-actions-" + (i + 1)).html('<b>All available Achivements earned!</b>');
                }

                $("#achievements-actions-total").html("(" + owned + "/" + total + ")");

            };
        },

        varInit: function() {
            this.actions.list = [
                new this.create("Shooter I", 0, "Shooting at level 25", "Shooting speed x2", "actions", "owned[0]", 25, "timeMultiplier[0]", "*2", 10),
                new this.create("Shooter II", 0, "Shooting at level 50", "Shooting speed x2", "actions", "owned[0]", 50, "timeMultiplier[0]", "*2", 20),
                new this.create("Shooter III", 0, "Shooting at level 75", "Chance of getting item", "actions", "owned[0]", 75, "", "", 0),
                new this.create("Shooter IV", 0, "Shooting at level 100", "Shooting speed x2", "actions", "owned[0]", 100, "timeMultiplier[0]", "*2", 30),
                new this.create("Shooter V", 0, "Shooting at level 125", "Chance of getting item", "actions", "owned[0]", 125, "", "", 0),
                new this.create("Shooter VI", 0, "Shooting at level 150", "Chance of getting item", "actions", "owned[0]", 150, "", "", 0),
                new this.create("Shooter VII", 0, "Shooting at level 175", "Chance of getting item", "actions", "owned[0]", 175, "", "", 0),
                new this.create("Shooter VIII", 0, "Shooting at level 200", "Shooting speed x2", "actions", "owned[0]", 200, "timeMultiplier[0]", "*2", 40),
                new this.create("Shooter IX", 0, "Shooting at level 300", "Shooting speed x2", "actions", "owned[0]", 300, "timeMultiplier[0]", "*2", 50),
                new this.create("Shooter X", 0, "Shooting at level 400", "Shooting speed x2", "actions", "owned[0]", 400, "timeMultiplier[0]", "*2", 60),
                new this.create("Shooter XI", 0, "Shooting at level 500", "Shooting reward x3", "actions", "owned[0]", 500, "rewardMultiplier[0]", "*3", 70),

                new this.create("Fighter I", 1, "Street fight at level 25", "Street fight speed x2", "actions", "owned[1]", 25, "timeMultiplier[1]", "*2", 15),
                new this.create("Fighter II", 1, "Street fight at level 50", "Street fight speed x2", "actions", "owned[1]", 50, "timeMultiplier[1]", "*2", 25),
                new this.create("Fighter III", 1, "Street fight at level 100", "Street fight speed x2", "actions", "owned[1]", 100, "timeMultiplier[1]", "*2", 35),
                new this.create("Fighter IV", 1, "Street fight at level 200", "Street fight speed x2", "actions", "owned[1]", 200, "timeMultiplier[1]", "*2", 45),
                new this.create("Fighter V", 1, "Street fight at level 300", "Street fight speed x2", "actions", "owned[1]", 300, "timeMultiplier[1]", "*2", 55),
                new this.create("Fighter VI", 1, "Street fight at level 400", "Street fight speed x2", "actions", "owned[1]", 400, "timeMultiplier[1]", "*2", 65),
                new this.create("Fighter VII", 1, "Street fight at level 500", "Street fight reward x3", "actions", "owned[1]", 500, "rewardMultiplier[1]", "*3", 75),

                new this.create("Pickpocket I", 2, "Pickpocket at level 25", "Pickpocket speed x2", "actions", "owned[2]", 25, "timeMultiplier[2]", "*2", 20),
                new this.create("Pickpocket II", 2, "Pickpocket at level 50", "Pickpocket speed x2", "actions", "owned[2]", 50, "timeMultiplier[2]", "*2", 30),
                new this.create("Pickpocket III", 2, "Pickpocket at level 100", "Pickpocket speed x2", "actions", "owned[2]", 100, "timeMultiplier[2]", "*2", 40),
                new this.create("Pickpocket IV", 2, "Pickpocket at level 200", "Pickpocket speed x2", "actions", "owned[2]", 200, "timeMultiplier[2]", "*2", 50),
                new this.create("Pickpocket V", 2, "Pickpocket at level 300", "Pickpocket speed x2", "actions", "owned[2]", 300, "timeMultiplier[2]", "*2", 60),
                new this.create("Pickpocket VI", 2, "Pickpocket at level 400", "Pickpocket speed x2", "actions", "owned[2]", 400, "timeMultiplier[2]", "*2", 70),
                new this.create("Pickpocket VII", 2, "Pickpocket at level 500", "Pickpocket reward x3", "actions", "owned[2]", 500, "rewardMultiplier[2]", "*3", 80),

                new this.create("Scammer I", 3, "Scamm at level 25", "Scamm speed x2", "actions", "owned[3]", 25, "timeMultiplier[3]", "*2", 25),
                new this.create("Scammer II", 3, "Scamm at level 50", "Scamm speed x2", "actions", "owned[3]", 50, "timeMultiplier[3]", "*2", 35),
                new this.create("Scammer III", 3, "Scamm at level 100", "Scamm speed x2", "actions", "owned[3]", 100, "timeMultiplier[3]", "*2", 45),
                new this.create("Scammer IV", 3, "Scamm at level 200", "Scamm speed x2", "actions", "owned[3]", 200, "timeMultiplier[3]", "*2", 55),
                new this.create("Scammer V", 3, "Scamm at level 300", "Scamm speed x2", "actions", "owned[3]", 300, "timeMultiplier[3]", "*2", 65),
                new this.create("Scammer VI", 3, "Scamm at level 400", "Scamm speed x2", "actions", "owned[3]", 400, "timeMultiplier[3]", "*2", 75),
                new this.create("Scammer VII", 3, "Scamm at level 500", "Scamm reward x3", "actions", "owned[3]", 500, "rewardMultiplier[3]", "*3", 85),

                new this.create("Car dealer I", 4, "Steal car at level 25", "Steal car speed x2", "actions", "owned[4]", 25, "timeMultiplier[4]", "*2", 30),
                new this.create("Car dealer II", 4, "Steal car at level 50", "Steal car speed x2", "actions", "owned[4]", 50, "timeMultiplier[4]", "*2", 40),
                new this.create("Car dealer III", 4, "Steal car at level 100", "Steal car speed x2", "actions", "owned[4]", 100, "timeMultiplier[4]", "*2", 50),
                new this.create("Car dealer IV", 4, "Steal car at level 200", "Steal car speed x2", "actions", "owned[4]", 200, "timeMultiplier[4]", "*2", 60),
                new this.create("Car dealer V", 4, "Steal car at level 300", "Steal car speed x2", "actions", "owned[4]", 300, "timeMultiplier[4]", "*2", 70),
                new this.create("Car dealer VI", 4, "Steal car at level 400", "Steal car speed x2", "actions", "owned[4]", 400, "timeMultiplier[4]", "*2", 80),
                new this.create("Car dealer VII", 4, "Steal car at level 500", "Steal car reward x3", "actions", "owned[4]", 500, "rewardMultiplier[4]", "*3", 90),

                new this.create("Robber I", 5, "Jewelry robbery at level 25", "Jewelry robbery speed x2", "actions", "owned[5]", 25, "timeMultiplier[5]", "*2", 35),
                new this.create("Robber II", 5, "Jewelry robbery at level 50", "Jewelry robbery speed x2", "actions", "owned[5]", 50, "timeMultiplier[5]", "*2", 45),
                new this.create("Robber III", 5, "Jewelry robbery at level 100", "Jewelry robbery speed x2", "actions", "owned[5]", 100, "timeMultiplier[5]", "*2", 55),
                new this.create("Robber IV", 5, "Jewelry robbery at level 200", "Jewelry robbery speed x2", "actions", "owned[5]", 200, "timeMultiplier[5]", "*2", 65),
                new this.create("Robber V", 5, "Jewelry robbery at level 300", "Jewelry robbery speed x2", "actions", "owned[5]", 300, "timeMultiplier[5]", "*2", 75),
                new this.create("Robber VI", 5, "Jewelry robbery at level 400", "Jewelry robbery speed x2", "actions", "owned[5]", 400, "timeMultiplier[5]", "*2", 85),
                new this.create("Robber VII", 5, "Jewelry robbery at level 500", "Jewelry robbery reward x3", "actions", "owned[5]", 500, "rewardMultiplier[5]", "*3", 95),

                new this.create("Hacker I", 6, "Hacking at level 25", "Hacking speed x2", "actions", "owned[6]", 25, "timeMultiplier[6]", "*2", 40),
                new this.create("Hacker II", 6, "Hacking at level 50", "Hacking speed x2", "actions", "owned[6]", 50, "timeMultiplier[6]", "*2", 50),
                new this.create("Hacker III", 6, "Hacking at level 100", "Hacking speed x2", "actions", "owned[6]", 100, "timeMultiplier[6]", "*2", 60),
                new this.create("Hacker IV", 6, "Hacking at level 200", "Hacking speed x2", "actions", "owned[6]", 200, "timeMultiplier[6]", "*2", 70),
                new this.create("Hacker V", 6, "Hacking at level 300", "Hacking speed x2", "actions", "owned[6]", 300, "timeMultiplier[6]", "*2", 80),
                new this.create("Hacker VI", 6, "Hacking at level 400", "Hacking speed x2", "actions", "owned[6]", 400, "timeMultiplier[6]", "*2", 90),
                new this.create("Hacker VII", 6, "Hacking at level 500", "Hacking reward x3", "actions", "owned[6]", 500, "rewardMultiplier[6]", "*3", 100),

                new this.create("Arms dealers I", 7, "Arms sales at level 25", "Arms sales speed x2", "actions", "owned[7]", 25, "timeMultiplier[7]", "*2", 45),
                new this.create("Arms dealers II", 7, "Arms sales at level 50", "Arms sales speed x2", "actions", "owned[7]", 50, "timeMultiplier[7]", "*2", 55),
                new this.create("Arms dealers III", 7, "Arms sales at level 100", "Arms sales speed x2", "actions", "owned[7]", 100, "timeMultiplier[7]", "*2", 65),
                new this.create("Arms dealers IV", 7, "Arms sales at level 200", "Arms sales speed x2", "actions", "owned[7]", 200, "timeMultiplier[7]", "*2", 75),
                new this.create("Arms dealers V", 7, "Arms sales at level 300", "Arms sales speed x2", "actions", "owned[7]", 300, "timeMultiplier[7]", "*2", 85),
                new this.create("Arms dealers VI", 7, "Arms sales at level 400", "Arms sales speed x2", "actions", "owned[7]", 400, "timeMultiplier[7]", "*2", 95),
                new this.create("Arms dealers VII", 7, "Arms sales at level 500", "Arms sales reward x3", "actions", "owned[7]", 500, "rewardMultiplier[7]", "*3", 105),

                new this.create("Drugs sales I", 8, "Drugs sales at level 25", "Drugs sales speed x2", "actions", "owned[8]", 25, "timeMultiplier[8]", "*2", 50),
                new this.create("Drugs sales II", 8, "Drugs sales at level 50", "Drugs sales speed x2", "actions", "owned[8]", 50, "timeMultiplier[8]", "*2", 60),
                new this.create("Drugs sales III", 8, "Drugs sales at level 100", "Drugs sales speed x2", "actions", "owned[8]", 100, "timeMultiplier[8]", "*2", 70),
                new this.create("Drugs sales IV", 8, "Drugs sales at level 200", "Drugs sales speed x2", "actions", "owned[8]", 200, "timeMultiplier[8]", "*2", 80),
                new this.create("Drugs sales V", 8, "Drugs sales at level 300", "Drugs sales speed x2", "actions", "owned[8]", 300, "timeMultiplier[8]", "*2", 90),
                new this.create("Drugs sales VI", 8, "Drugs sales at level 400", "Drugs sales speed x2", "actions", "owned[8]", 400, "timeMultiplier[8]", "*2", 100),
                new this.create("Drugs sales VII", 8, "Drugs sales at level 500", "Drugs sales reward x3", "actions", "owned[8]", 500, "rewardMultiplier[8]", "*3", 110)
            ];

            for (var i = 0; i < this.actions.list.length; i++) {
                this.actions.complete.push(false);
            };
        },

        domInit: function() {
            for (var i = 0; i < game.actions.list.length; i++) {
                $("#achievements-actions").append('<li id="achievements-actions-' + (i + 1) + '" class="list-group-item achievement"></li>');
            };

            var height = $("body").height();
            $("#achievements-actions").css({
                'max-height': (height - 200) + 'px',
                'overflow-y': 'auto'
            });

            this.loop(true);
            this.display();
        },

        angularInit: function() {
            this.domInit();
        },

        init: function() {
            this.varInit();

            window["game"]["achievements"] = this;
            log("Achievements init.");
        }
    };

    return achievements.init();
});
