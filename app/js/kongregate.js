if (window.location.href.indexOf("kongregate.com") > -1) {
    var kongregate;
    var kongPlayer;

    kongregateAPI.loadAPI(onComplete);

    function onComplete() {
        kongregate = kongregateAPI.getAPI();
        kongPlayer = {
            name: kongregate.services.getUsername(),
            id: kongregate.services.getUserID(),
            token: kongregate.services.getGameAuthToken()
        }
    };

    function submitScore() {
        var money = Math.floor(game.totalMoney);
        kongregate.stats.submit("Money", money);
    };
};
