$(document).ready(function(){
  let display = {
    online: (json) => {
      let imgLink = json.stream.channel.logo;
      let descriptionText = json.stream.channel.status;
      let channelName = json.stream.channel.display_name;
      let channelLink = json.stream.channel.url;
      let backgroundImg = json.stream.channel.profile_banner;
      let onlineDiv = "<img src='" + imgLink + "' id='img'><p id='paragraph'><a href='" + channelLink + "' target='_blank'>" + channelName + "</a><br>" + descriptionText;
      $("#" + channelName).html(onlineDiv);
  },
    offline: (json) => {
      $.ajax({
         url: json._links.channel,
         dataType: 'json',
         success: function (data){
           let offlineImage = data.logo;
           let user = data.display_name;
           let offlineDiv = "<img src='" + offlineImage + "' id='img'><p id='paragraph'><a href='https://www.twitch.tv/" + user + "' target='_blank'>" + user + "</a><br>This stream is currently Offline</p>";
           $("#" + user).html(offlineDiv);
         },
         error: () =>  {console.log("error my friend")},
         headers: {
          'Client-ID': '6kh1v38tmp3h12sikz3yfutln87ipzs'
         }
      });
    },
    noAccount: (user) =>  {
         var noAccountDiv = "<img id='img' src='http://placehold.it/120x120'><p id='paragraph'><a href='https://www.twitch.tv/" + user + "' target='_blank'>" + user + "</a><br>The account cannot be found</p>";
          $("#" + user).html(noAccountDiv);
  }
  };
  
  let jsonCheck = (json) => {
    
    if (json.stream === null) {
      display.offline(json);
    }
    else {
      display.online(json);  
    }
  };
  
  let ajaxCall = (queryAddress, user) => {
	$.ajax({
	     url: queryAddress + user,
	     dataType: 'json',
	     success: jsonCheck,
	     error: display.noAccount(user),
	     headers: {
	      'Client-ID': '6kh1v38tmp3h12sikz3yfutln87ipzs'
	     }
    });
  };

  Promise.all([
    ajaxCall("https://api.twitch.tv/kraken/streams/", "ESL_SC2"),
    ajaxCall("https://api.twitch.tv/kraken/streams/", "OgamingSC2"),
    ajaxCall("https://api.twitch.tv/kraken/streams/", "cretetion"),
    ajaxCall("https://api.twitch.tv/kraken/streams/", "freecodecamp"),
    ajaxCall("https://api.twitch.tv/kraken/streams/", "storbeck"),
    ajaxCall("https://api.twitch.tv/kraken/streams/", "brunofin")
    ])
  
});
  
/*
all display methods are now inside an object, the way things are displayed is not the best but it works (using actual js to create, modify and append elements instead of using a string variable would be best I think), it will stay like this for now. 
I managed to get a much cleaner code compared to previous versions, but it is still messy in a few ways, Im sure it can be done much better. Even so I managed to learn a lot about promises, ecmascript6, mvc model, closures and a lot of other stuff while making this project.

todo: Work the front-end!!!!!, of course x_X
*/