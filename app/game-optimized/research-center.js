define([],function(){var research={actions:{list:new Array,bought:new Array,upTypes:10},getCurrent:function(e,t){var n;switch(e){case 0:for(var r=0;r<this.actions.list.length;r++)!this.actions.bought[r]&&this.actions.list[r].upType==t&&(n=r,r=this.actions.list.length);break;case 1:}return n},create:function(e,t,n,r,i,s,o,u,a,f,l){this.name=e,this.desc=t,this.price=n,this.str=r,this.who=i,this.effect=s,this.otherWho=u,this.otherStr=o,this.otherEffect=a,this.type=f,this.upType=l},buy:function(type,upgradeIndex){switch(type){case 0:var price=this.actions.list[upgradeIndex].price,what=this.actions.list[upgradeIndex].str,whoInWhat=this.actions.list[upgradeIndex].who,effect=this.actions.list[upgradeIndex].effect,otherWhat=this.actions.list[upgradeIndex].otherStr,otherWhoInWhat=this.actions.list[upgradeIndex].otherWho,otherEffect=this.actions.list[upgradeIndex].otherEffect;if(game.money>=price&&!this.actions.bought[upgradeIndex]){game.money-=price,this.actions.bought[upgradeIndex]=!0;if(whoInWhat!=="n"){var value=window.game.actions[what][whoInWhat];window.game.actions[what][whoInWhat]=eval(value+effect)}else{var value=window.game.actions[what];window.game.actions[what]=eval(value+effect)}if(otherWhat&&otherWhoInWhat&&otherEffect!=="undefined")if(otherWhoInWhat!=="n"){var value=window.game.actions[what][otherWhoInWhat];window.game.actions[otherWhat][otherWhoInWhat]=eval(value+otherEffect)}else{var value=window.game.actions[otherWhat];window.game.actions[otherWhat]=eval(value+otherEffect)}}break;case 1:}this.display()},display:function(){for(var e=0;e<this.actions.upTypes;e++){var t=game.research.getCurrent(0,e),n=this.actions.bought[e],r={name:this.actions.list[t].name,desc:this.actions.list[t].desc,price:this.actions.list[t].price};$("#research-actions-upgrade-"+(e+1)).html("<b>"+r.name+"</b><span>Cost <b>$"+fix(r.price,2)+"</b></span><br>"+r.desc),$("#research-actions-upgrade-"+(e+1)).attr("onclick","game.research.buy(0, "+t+");")}},varInit:function(){this.actions.list=[new this.create("Shooting I","Shooting reward x3<span>Reputation reward x3</span>",25e4,"rewardMultiplier","0","*3","reputationMultiplier","0","*3",0,0),new this.create("Shooting II","Shooting reward x3<span>Reputation reward x3</span>",1e12,"rewardMultiplier","0","*3","reputationMultiplier","0","*3",0,0),new this.create("Fight club I","Fight club reward x3<span>Reputation reward x3</span>",75e4,"rewardMultiplier","1","*3","reputationMultiplier","1","*3",0,1),new this.create("Fight club II","Fight club reward x3<span>Reputation reward x3</span>",25e12,"rewardMultiplier","1","*3","reputationMultiplier","1","*3",0,1),new this.create("Pickpocket I","Pickpocket reward x3<span>Reputation reward x3</span>",25e5,"rewardMultiplier","2","*3","reputationMultiplier","2","*3",0,2),new this.create("Pickpocket II","Pickpocket reward x3<span>Reputation reward x3</span>",5e13,"rewardMultiplier","2","*3","reputationMultiplier","2","*3",0,2),new this.create("Scammer I","Scam reward x3<span>Reputation reward x3</span>",5e6,"rewardMultiplier","3","*3","reputationMultiplier","3","*3",0,3),new this.create("Scammer II","Scam reward x3<span>Reputation reward x3</span>",1e14,"rewardMultiplier","3","*3","reputationMultiplier","3","*3",0,3),new this.create("Steal car I","Steal car reward x3<span>Reputation reward x3</span>",25e6,"rewardMultiplier","4","*3","reputationMultiplier","4","*3",0,4),new this.create("Steal car II","Steal car reward x3<span>Reputation reward x3</span>",75e13,"rewardMultiplier","4","*3","reputationMultiplier","4","*3",0,4),new this.create("Jewelry robbery I","Jewelry robbery reward x3<span>Reputation reward x3</span>",5e8,"rewardMultiplier","5","*3","reputationMultiplier","5","*3",0,5),new this.create("Jewelry robbery II","Jewelry robbery reward x3<span>Reputation reward x3</span>",25e14,"rewardMultiplier","5","*3","reputationMultiplier","5","*3",0,5),new this.create("Hacking I","Hacking reward x3<span>Reputation reward x3</span>",1e10,"rewardMultiplier","6","*3","reputationMultiplier","6","*3",0,6),new this.create("Hacking II","Hacking reward x3<span>Reputation reward x3</span>",1e16,"rewardMultiplier","6","*3","reputationMultiplier","6","*3",0,6),new this.create("Arms dealer I","Arms sales reward x3<span>Reputation reward x3</span>",5e10,"rewardMultiplier","7","*3","reputationMultiplier","7","*3",0,7),new this.create("Arms dealer II","Arms sales reward x3<span>Reputation reward x3</span>",2e16,"rewardMultiplier","7","*3","reputationMultiplier","7","*3",0,7),new this.create("Dealer I","Drugs sales reward x3<span>Reputation reward x3</span>",5e10,"rewardMultiplier","8","*3","reputationMultiplier","8","*3",0,8),new this.create("Dealer II","Drugs sales reward x3<span>Reputation reward x3</span>",2e16,"rewardMultiplier","8","*3","reputationMultiplier","8","*3",0,8),new this.create("All actions I","All actions reward x3<span>Reputation reward x3</span>",25e10,"totalRewardMultiplier","n","*3","totalReputationMultiplier","n","*3",0,9),new this.create("All actions II","All actions reward x3<span>Reputation reward x3</span>",75e15,"totalRewardMultiplier","n","*3","totalReputationMultiplier","n","*3",0,9)];for(var e=0;e<this.actions.list.length;e++)this.actions.bought.push(!1)},domInit:function(){for(var e=0;e<this.actions.upTypes;e++){var t=$("body").height();$("#research-actions").append('<li id="research-actions-upgrade-'+(e+1)+'" class="list-group-item"></li>'),$("#research-actions-upgrade-"+(e+1)).attr("onclick","game.research.buy(0, "+e+");")}this.display()},angularInit:function(){this.domInit()},init:function(){this.varInit(),window.game.research=this,log("Research center init.")}};return research.init()});