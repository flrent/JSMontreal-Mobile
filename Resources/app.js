/*
 * A tabbed application, consisting of multiple stacks of windows associated with tabs in a tab group.  
 * A starting point for tab-based application with multiple top-level windows. 
 * Requires Titanium Mobile SDK 1.8.0+.
 * 
 * In app.js, we generally take care of a few things:
 * - Bootstrap the application with any data we need
 * - Check for dependencies like device type, platform version or network connection
 * - Require and open our top-level UI component
 *  
 */

//bootstrap and check dependencies
if (Ti.version < 1.8 ) {
	alert('Sorry - this application template requires Titanium Mobile SDK 1.8 or later');
}

// This is a single context application with mutliple windows in a stack
(function() {
	//determine platform and form factor and render approproate components
	var osname = Ti.Platform.osname,
		version = Ti.Platform.version,
		height = Ti.Platform.displayCaps.platformHeight,
		width = Ti.Platform.displayCaps.platformWidth;
	
	//considering tablet to have one dimension over 900px - this is imperfect, so you should feel free to decide
	//yourself what you consider a tablet form factor for android
	var isTablet = osname === 'ipad' || (osname === 'android' && (width > 899 || height > 899));
	
	var DAO = require('ui/common/DAO'),
		MD5 = require('lib/md5-min');
	

	var ApplicationTabGroup = require('ui/common/ApplicationTabGroup'),
		About = require('ui/common/About'),
		Meetup = require('ui/common/MeetupWindow'),
		MeetupsList = require('ui/common/MeetupsList');
		
	
	var md5 = new MD5();
	var Dao = new DAO(md5);
	
	Titanium.Analytics.featureEvent('app.open');
	

   if (Ti.Platform.osname === "android") {
		Titanium.UI.createNotification({
		    duration: 2000,
		    message: "Loading meetups..."
		}).show();
	}
	else {
		Dao.loginUser();
	}
	Dao.getMeetups(function(meetups) {
		Titanium.Analytics.featureEvent('app.getMeetups.succeeded');
		var tabs = new ApplicationTabGroup(Dao, About, Meetup, MeetupsList, meetups);
			tabs.open();
			
   		if (Ti.Platform.osname === "android") {
			tabs.addEventListener("open",function() {
				var activity = tabs.getActivity();
			    var actionBar = activity.actionBar;
			    if (actionBar) {
			        actionBar.title = "JavaScript Montreal";
			    }
			 });
		 }
	});
})();
