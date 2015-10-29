// Load the API
var kongregate;
kongregateAPI.loadAPI(onComplete);

// Callback function
function onComplete(){
  kongregate = kongregateAPI.getAPI();
}
