var kongregate;
var kongPlayer;
var onComplete;
var submitScore;
var kongDisplay;

function checkKong() {
    if (window.location.href.indexOf("kongregate.com") > -1)
        return true;
    else
        return false;
};

function kongInit() {
    var onKong = checkKong();

    if (onKong) {
        log("Player on Kongregate.");
        kongregateAPI.loadAPI(onComplete);

        onComplete = function() {
            kongregate = kongregateAPI.getAPI();
            kongPlayer = {
                name: kongregate.services.getUsername(),
                id: kongregate.services.getUserID(),
                token: kongregate.services.getGameAuthToken()
            }
        };

        submitScore = function() {
            if (checkKong()) {
                var money = Math.floor(game.totalMoney);
                kongregate.stats.submit("Money", money);
            };
        };

        kongDisplay = function() {
            if (checkKong()) {
                $("#kong-speech").css('display', 'none');
                $("#kong-player").css('display', 'block');
                $("#kong-player-h1").html("Welcome " + kongPlayer.name + ".");
                $("#kong-player-h2").html("Here is a special tab for Kongregate players. There will be Kreds items and specials features.");
            };
        };

        kongAngular = function() {
            kongDisplay();
        };

        log("Kongregate init.");
    };
};
