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
                $("#kong-speech-1, #kong-speech-2").css('display', 'none');
            };
        };

        kongAngular = function() {
            if (checkKong()) {
                $("#kong-speech-1, #kong-speech-2").css('display', 'none');
            }
        };

        kongDisplay();
    };
};
