var kongregate;
kongregateAPI.loadAPI(onComplete);

function onComplete() {
    kongregate = kongregateAPI.getAPI();
    log("Kongregate API loaded");
}
