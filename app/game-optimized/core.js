define([],function(){var e={money:0,totalMoney:0,allTimeMoney:0,level:1,reputation:0,totalReputation:0,allTimeReputation:0,reputationNeed:100,moneyActions:new Array,repActions:new Array,options:{fps:20,interval:50,angularInit:!1,init:!1,pause:!0,firstTime:!0,menu:"navbar",before:(new Date).getTime(),now:(new Date).getTime(),started:(new Date).getTime(),version:.001},getObjLength:function(e){var t=0,n;for(n in e)e.hasOwnProperty(n)&&t++;return t},scope:function(e){return angular.element(e).scope()},togglePause:function(){this.options.pause=!this.options.pause,this.options.pause?notify.pop("alert","<strong>Game paused...</strong>"):notify.pop("alert","<strong>Game un-paused.</strong>")},gainMoney:function(e){this.money+=e,this.totalMoney+=e,this.allTimeMoney+=e},gainRep:function(e){this.reputation+=e,this.totalReputation+=e,this.allTimeReputation+=e},repLevelUp:function(){if(this.reputation>=this.reputationNeed)while(this.reputation>=this.reputationNeed)this.level++,this.reputation-=this.reputationNeed,this.reputationNeed=Math.floor(100*Math.pow(1.3,this.level))},menuSwitch:function(e){this.options.menu=e,this.menuType()},menuType:function(){var e=this.options.menu;e=="sidebar"?($('li[id^="navbar-menu"]').fadeOut("fast",function(){$("#navbar-sidebarmenu").fadeIn("fast")}),sidebar.activated=!0):($("#navbar-sidebarmenu").fadeOut("fast",function(){$('li[id^="navbar-menu"]').fadeIn("fast")}),sidebar.activated=!1)},animateMenu:function(e){var t=".navbar-menu-"+e;$(t).addClass("glow").delay(1e3).queue(function(){$(this).removeClass("glow").dequeue()})},toggleModal:function(){this.options.firstTime&&($("#modal-newPlayer").modal({keyboard:!1,backdrop:"static"}),$("#modal-newPlayer").fadeIn("slow"))},closeModal:function(){this.options.firstTime&&(this.options.firstTime=!1,e.options.pause=!1,window.setTimeout(function(){$("#modal-newPlayer").remove()},3e3))},display:function(){$("#sidebar-version").html("v"+this.options.version),$(".navbar-brand").html("$"+beautify.fix(e.money)+" - reputation lvl. "+this.level+" <small>("+fix(this.reputation,0)+"/"+fix(this.reputationNeed,0)+")")},coreLoop:function(){var t=this.game;t.options.now=(new Date).getTime();var n=t.options.now-t.options.before;n>t.options.interval?n>1e3?(t.updateGame(Math.floor(n/t.options.interval),!0),notify.pop("success","While you were offline, you gained:<br>$"+fix(e.actions.gainedMoneyThisRun,3)+"<br>"+fix(e.actions.gainedRepThisRun,3)+" rep.")):t.updateGame(Math.floor(n/t.options.interval),!1):t.updateGame(1,!1),t.options.before=(new Date).getTime()},updateGame:function(t,n){e.actions.run(t,n),e.statistics.display(),this.display()},domInit:function(){$("#navbar-save").attr("onclick",'game.save.save("user");')},init:function(){window.game=this,window.log=console.info.bind(console,"BR-"+this.options.version+" :"),window.warn=console.warn.bind(console),window.debug=console.debug.bind(console),require(["beautify","sidebar","notify","helper"],function(){log("----------"),require(["actions","research-center","achievements","prestige","collections","save","statistics"],function(){e.save.load(),localStorage.getItem(e.save.name+e.save.salt)===null&&(e.options.before=(new Date).getTime()),log("----------"),require(["angular","bootstrap"],function(){e.options.firstTime?window.setTimeout(function(){e.toggleModal()},1e3):e.options.pause=!1,e.domInit(),e.options.init=!0,log("Angular & Bootstrap init. Ready to play.")})})})}};return e.init()});