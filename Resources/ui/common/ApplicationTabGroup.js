function ApplicationTabGroup(Dao, About, Meetup,MeetupsList, meetups) {
	//create module instance
	var self = Ti.UI.createTabGroup();
	
	//create app tabs
	var win1 = new Meetup(Dao,meetups[0]),
		win2 = new About("About");
		win3 = new MeetupsList(Dao,Meetup,meetups);
	
	var day = new Date().getDay().toString().length==1 ? "0"+new Date().getDay() : new Date().getDay(),
		month = new Date().getMonth()+1,
		year = new Date().getFullYear();
		month = month.toString().length==1 ? "0"+month : month;
		
	var today = year.toString()+month.toString()+day.toString();
	
	
	if(Ti.Platform.osname!="android") {
		var tab1 = Ti.UI.createTab({
			title: today>meetups[0].on ? "Last Meetup" : "Next meetup",
			icon: '/images/team.png',
			window: win1
		});
		win1.containingTab = tab1;
		
		var tab2 = Ti.UI.createTab({
			title: "About",
			icon: '/images/locate.png',
			window: win2
		});
		win2.containingTab = tab2;
		
		var tab3 = Ti.UI.createTab({
			title: "Archives",
			icon: '/images/calendar.png',
			window: win3
		});
		win3.containingTab = tab3;
		
	}
	else {
		
		var tab1 = Ti.UI.createTab({
			title: today>meetups[0].on ? "Last Meetup" : "Next meetup",
			window: win1
		});
		win1.containingTab = tab1;
		
		var tab2 = Ti.UI.createTab({
			title: "About",
			window: win2
		});
		win2.containingTab = tab2;
		
		var tab3 = Ti.UI.createTab({
			title: "Archives",
			window: win3
		});
		win3.containingTab = tab3;
	}
	

	self.addTab(tab1);
	self.addTab(tab2);
	self.addTab(tab3);
	return self;
};

module.exports = ApplicationTabGroup;
