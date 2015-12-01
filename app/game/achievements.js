define([], function() {
    var achievements = {
        actions: {
            list: new Array(),
            complete: new Array()
        },

        create: function(name, type, desc, desc2, part, reqName, reqValue, changeName, changeValue) {
            this.name = name;
        	this.type = type;
        	this.desc = desc;
        	this.desc2 = desc2;
        	this.part = part; // actions or production for example
        	this.reqName = reqName;
        	this.reqValue = reqValue;
        	this.changeName = changeName;
        	this.changeValue = changeValue;
        },

        popup: function() {
        },

        getCurrent: function(type, Index) {
            var index;
            switch (type) {
                case 0: // type 0 is for actions
                	for (var i = 0; i < this.actions.list.length; i++) {
                		if (!this.actions.complete[i] && this.actions.list[i].type == Index) {
                			index = i;
                			i = this.actions.list.length;
                		};
                	};
                    break;
                case 1: // type 1 is for production
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
        	var changeNameIndex = changeName.substring(changeName.indexOf('[') + 1, changeName.indexOf(']'));
        	var actual = window["game"][part][changeName.substring(0, changeName.indexOf('['))][changeNameIndex];
        	window["game"][part][changeName.substring(0, changeName.indexOf('['))][changeNameIndex] = eval(actual + changeValue);
        	this.display();
        },

        loop: function() {
            for (var i = 0; i < this.actions.list.length; i++) {
        		if (game.achievements.isComplete(i, 'actions') && !this.actions.complete[i]) {
        			game.achievements.achieve(i, 'actions');
        			this.actions.complete[i] = true;
        		};
        	};

            this.display();
        },

        display: function() {
            for (var i = 0; i < game.actions.list.length; i++) {
                var index = this.getCurrent(0, i);
                var html = {
                    name: this.actions.list[index].name,
                    desc: this.actions.list[index].desc,
                    desc2: this.actions.list[index].desc2
                };

                $("#achievements-actions-" + (i+1)).html("<b>" + html.name + ":</b><span>" + html.desc + "</span><br>" + html.desc2);
            };
        },

        varInit: function() {
            this.actions.list = [
        		new this.create("Shooter I", 0, "Shooting at level 25", "Shooting speed x2", "actions", "owned[0]", 25, "timeMultiplier[0]", "*2"),
        		new this.create("Shooter II", 0, "Shooting at level 50", "Shooting speed x2", "actions", "owned[0]", 50, "timeMultiplier[0]", "*2"),

        		new this.create("Fighter I", 1, "Street fight at level 25", "Street fight speed x2", "actions", "owned[1]", 25, "timeMultiplier[1]", "*2"),
        		new this.create("Fighter II", 1, "Street fight at level 50", "Street fight speed x2", "actions", "owned[1]", 50, "timeMultiplier[1]", "*2"),

        		new this.create("Pickpocket I", 2, "Pickpocket at level 25", "Pickpocket speed x2", "actions", "owned[2]", 25, "timeMultiplier[2]", "*2"),
        		new this.create("Pickpocket II", 2, "Pickpocket at level 50", "Pickpocket speed x2", "actions", "owned[2]", 50, "timeMultiplier[2]", "*2"),

        		new this.create("Scammer I", 3, "Scamm at level 25", "Scamm speed x2", "actions", "owned[3]", 25, "timeMultiplier[3]", "*2"),
        		new this.create("Scammer II", 3, "Scamm at level 50", "Scamm speed x2", "actions", "owned[3]", 50, "timeMultiplier[3]", "*2"),

        		new this.create("Car dealer I", 4, "Steal car at level 25", "Steal car speed x2", "actions", "owned[4]", 25, "timeMultiplier[4]", "*2"),
        		new this.create("Car dealer II", 4, "Steal car at level 50", "Steal car speed x2", "actions", "owned[4]", 50, "timeMultiplier[4]", "*2"),

        		new this.create("Robber I", 5, "Jewelry robbery at level 25", "Jewelry robbery speed x2", "actions", "owned[5]", 25, "timeMultiplier[5]", "*2"),
        		new this.create("Robber II", 5, "Jewelry robbery at level 50", "Jewelry robbery speed x2", "actions", "owned[5]", 50, "timeMultiplier[5]", "*2"),

        		new this.create("Hacker I", 6, "Hacking at level 25", "Hacking speed x2", "actions", "owned[6]", 25, "timeMultiplier[6]", "*2"),
        		new this.create("Hacker II", 6, "Hacking at level 50", "Hacking speed x2", "actions", "owned[6]", 50, "timeMultiplier[6]", "*2"),

        		new this.create("Arms dealers I", 7, "Arms sales at level 25", "Arms sales speed x2", "actions", "owned[7]", 25, "timeMultiplier[7]", "*2"),
        		new this.create("Arms dealers II", 7, "Arms sales at level 50", "Arms sales speed x2", "actions", "owned[7]", 50, "timeMultiplier[7]", "*2")
        	];

            for (var i = 0; i < this.actions.list.length; i++) {
                this.actions.complete.push(false);
            };
        },

        domInit: function() {
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
