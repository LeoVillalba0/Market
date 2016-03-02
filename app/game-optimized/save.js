define(["angular"],function(){var e={name:"BR-S",salt:"BRKey",saveInterval:undefined,saveVars:["money","totalMoney","allTimeMoney","level","reputation","totalReputation","allTimeReputation","reputationNeed","actions.progress","actions.owned","actions.rewardMultiplier","actions.totalRewardMultiplier","actions.timeMultiplier","actions.totalTimeMultiplier","actions.currentRep","research.actions.bought","collections.owned","options.before","options.firstTime","options.version","options.started"],setObjValByPath:function(e,t,n){n=n.split(".");for(i=0;i<n.length-1;i++)e=e[n[i]];e[n[i]]=t},getObjValByPath:function(e,t){var n=t.split(".").reduce(function(e,t){return e[t]},e);return n},save:function(e){var t=new Object;for(i=0;i<this.saveVars.length;i++)t[this.saveVars[i]]=this.getObjValByPath(game,this.saveVars[i]);game.options.init&&localStorage.setItem(this.name+this.salt,JSON.stringify(t)),e=="user"&&notify.pop("success","Game successfully saved!"),e!=="silent"&&log("Game saved.")},checkExists:function(e){return typeof e=="undefined"||e===null?!1:!0},load:function(e){if(localStorage.getItem(this.name+this.salt)===null)notify.pop("alert","No save found!");else{var t=JSON.parse(localStorage.getItem(this.name+this.salt));for(x=0;x<this.saveVars.length;x++)saveVar=this.saveVars[x],val=t[saveVar],this.checkExists(val)&&this.setObjValByPath(game,val,this.saveVars[x]);game.research.display(),e=="user"&&notify.pop("success","Save-game successfully loaded!"),e!=="silent"&&log("Savegame loaded.")}},eventListenerSave:function(){game.save.save()},reset:function(e,t){var n=this.save.saveInterval;$("#options-reset").html("Really?"),$("#options-yes, #options-no").show(),$("#options-reset").addClass("really"),e&&(window.clearInterval(n),window.removeEventListener("beforeunload",game.save.eventListenerSave,!1),localStorage.removeItem(this.name+this.salt),window.history.pushState("","","/#/"),window.location.reload()),t&&($("#options-reset").html("Hard-reset"),$("#options-yes, #options-no").hide(),$("#options-reset").removeClass("really"))},devReset:function(){var e=this.save.saveInterval;window.clearInterval(e),window.removeEventListener("beforeunload",game.save.eventListenerSave,!1),localStorage.removeItem(this.name+this.salt),window.history.pushState("","","/#/"),window.location.reload()},setInt:function(){this.saveInterval=window.setInterval(function(){game.save.save()},1e3),log("Save interval set - ID "+this.saveInterval)},removeInt:function(){var e=this.saveInterval;window.clearInterval(e),log("Save interval removed.")},init:function(){this.setInt(),window.game.save=this,window.addEventListener("beforeunload",game.save.eventListenerSave,!1),log("Save init.")}};return e.init()});