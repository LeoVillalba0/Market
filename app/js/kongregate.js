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
    var params = "kongregate_user_id=" + kongPlayer.id + "&kongregate_game_auth_token=" + kongPlayer.token;
    kongregateAPI.embedFrame("kongregate-game.php?" + params, "kongdiv");
    log("Kongregate player : " + kongPlayer);
};
