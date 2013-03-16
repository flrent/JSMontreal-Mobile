function DAO(md5) {
	var dao = {
		md5:md5
	};
	
	var Cloud = require('ti.cloud');
	
	
	dao.urls = {
		meetups:"http://js-montreal.org/meetups.json",
		gravatar:"http://www.gravatar.com/avatar/"
	};
	
	dao.getMeetups = function(callback) {
     	if(!Ti.Network.online) {
			var dialog = Ti.UI.createAlertDialog({
			    message: "You need Internet access to use this app",
			    ok: 'Ok',
			    title: "No connection"
		 	});
		 	dialog.show();
			Titanium.Analytics.featureEvent('app.getMeetups.error');
     	}
     	else {
			var ajax = Ti.Network.createHTTPClient({
			     onload : function(e) {
			         if(callback) callback(JSON.parse(this.responseText));
			     },
			     onerror : function(e) {
		     		if(!Ti.Network.online) {
		     			alert("No internet...");
		     		}
			         Ti.API.debug(e.error);
					Titanium.Analytics.featureEvent('app.getMeetups.error');
			     },
			     timeout : 5000
			});
			ajax.open("GET", this.urls.meetups);
			ajax.send();
		};
	}
	
	dao.getGravatarPicture = function(email) {
		return this.urls.gravatar+this.md5(email);
	};
	
	
	
	
	 
	
	dao.loginUser = function() {		
		Cloud.Users.login({
		    login: 'jsmontreal',
		    password: 'jsmontreal'
		}, function (e) {
			Ti.API.log("LOGIN");
			Ti.API.log(JSON.stringify(e));
			
			if (e.success) {
				dao.user = e.users[0];
			 	dao.getDeviceToken();
		    } else {
		        alert("Error :"+e.message);
		    }
		});
	};
	
	dao.getDeviceToken = function(){
		
		Titanium.Network.registerForPushNotifications({
        	types: [
	            Titanium.Network.NOTIFICATION_TYPE_BADGE,
	            Titanium.Network.NOTIFICATION_TYPE_ALERT,
	            Titanium.Network.NOTIFICATION_TYPE_SOUND
	        ],
		    success:function(e) {
		        dao.deviceToken = e.deviceToken;
		        
		        Ti.API.log("deviceToken = "+dao.deviceToken);
		        
		        dao.registerForPush();
		    },
		    error:function(e) {
				Ti.API.log("ERROR DEVICETOKEN");
				Ti.API.log(JSON.stringify(e));
		        Ti.API.log("Error: "+e.message);
		    },
		    callback:function(e) {
				var dialog = Ti.UI.createAlertDialog({
				    message: e.data.alert,
				    ok: 'Ok',
				    title: "News"
			 	});
			 	dialog.show();
		        Ti.API.log("push notification received"+JSON.stringify(e.data));
		    }
	    });
	    
  	};
	dao.registerForPush = function(){
		
	    Cloud.PushNotifications.subscribe({
	        channel: 'news',
	        type:'ios',
	        device_token: dao.deviceToken
	    }, function (e) {
	        if (e.success) {
	            Ti.API.log('Success :'+((e.error && e.message) || JSON.stringify(e)));
	        } else {
	            Ti.API.log('Error:' + ((e.error && e.message) || JSON.stringify(e)));
	        }
	    });
	};
	
	return dao;
};

module.exports = DAO;
