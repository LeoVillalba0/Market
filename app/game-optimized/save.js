define(["angular"],function(){var e={name:"BR-S",salt:"BRKey",save:function(e){var t={money:game.money,totalMoney:game.totalMoney,level:game.level,reputation:game.reputation,reputationNeed:game.reputationNeed,actions:game.actions,research:game.research,options:game.options};localStorage.setItem(this.name+this.salt,JSON.stringify(t)),e=="user"&&notify.pop("success","Game successfully saved!"),log("Game saved.")},load:function(e){if(localStorage.getItem(this.name+this.salt)===null)notify.pop("alert","No save found!");else{var t=JSON.parse(localStorage.getItem(this.name+this.salt));game.money=t.money,game.totalMoney=t.totalMoney,game.level=t.level,game.reputation=t.reputation,game.reputationNeed=t.reputationNeed,game.actions.progress=t.actions.progress,game.actions.owned=t.actions.owned,game.actions.rewardMultiplier=t.actions.rewardMultiplier,game.actions.totalRewardMultiplier=t.actions.totalRewardMultiplier,game.actions.timeMultiplier=t.actions.timeMultiplier,game.actions.totalTimeMultiplier=t.actions.totalTimeMultiplier,game.actions.currentRep=t.actions.currentRep,game.actions.reputationDivider=t.actions.reputationDivider,game.research.actions.bought=t.research.actions.bought,game.options.before=t.options.before,game.options.firstTime=t.options.firstTime,game.research.display(),e=="user"&&notify.pop("success","Save-game successfully loaded!"),log("Savegame loaded.")}},eventListenerSave:function(){game.save.save()},reset:function(e,t){$("#options-reset").html("Really?"),$("#options-yes, #options-no").show(),$("#options-reset").addClass("really"),e&&(window.removeEventListener("beforeunload",game.save.eventListenerSave,!1),localStorage.removeItem(this.name+this.salt),window.history.pushState("","","/#/"),window.location.reload()),t&&($("#options-reset").html("Hard-reset"),$("#options-yes, #options-no").hide(),$("#options-reset").removeClass("really"))},setInt:function(){window.setInterval(function(){game.save.save()},3e5)},init:function(){this.setInt(),window.game.save=this,window.addEventListener("beforeunload",game.save.eventListenerSave,!1),log("Save init.")}};return e.init()});