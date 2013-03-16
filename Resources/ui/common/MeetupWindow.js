function MeetupWindow(Dao, meetup, title) {
	
	var self = Ti.UI.createWindow({
		title:title || 'Next JS Montreal Meetup',
	    barColor:'#049CDB', 
	    backgroundImage:'none',
		backgroundColor:'#F8F8F8'
	});
	var home = title ? false : true;
	
	var scrollView = Ti.UI.createScrollView({
	  top:0,
	  contentHeight: 'auto',
	  contentWidth: 'auto',
	  layout: 'vertical',
	  scrollType:'vertical'
	});
	
	var day = new Date().getDay().toString().length==1 ? "0"+new Date().getDay() : new Date().getDay(),
		month = new Date().getMonth()+1,
		year = new Date().getFullYear();
		month = month.toString().length==1 ? "0"+month : month;
		
	var today = year.toString()+month.toString()+day.toString();
	
	var present = Titanium.UI.createButton({
		title:'Come show us something at the next meetup !',
		font:{fontSize:'12dp',fontFamily:'Helvetica Neue'},
		height:30,
		width:'100%',
	    backgroundColor: "#049CDB",
	    color: '#ffffff',
	    backgroundImage: 'none'
	});

	present.addEventListener("click", function() {
		var presentWindow = Ti.UI.createWindow({title:'Present',barColor:'#049CDB'});
		var webview = Ti.UI.createWebView({
			scalesPageToFit:true,
			url:'http://js-montreal.org/present'
		});
		presentWindow.add(webview);
		
		if(Ti.Platform.osname != "android") {
			var close = Ti.UI.createButton({title:'Close'});
				close.addEventListener("click", function() {
					presentWindow.close();
				});
			presentWindow.setRightNavButton(close);
		}
		presentWindow.open({modal:true});
	});
	
	if(home && today>meetup.on) {
		self.title = "Last JS Montreal Meetup";
		scrollView.add(present);
	}
		
	var nb = Ti.UI.createLabel({
		text:"Meetup #"+meetup.num+" - "+meetup.on.slice(meetup.on.length-2,meetup.on.length)+"/"+meetup.on.slice(meetup.on.length-4,meetup.on.length-2)+"/"+meetup.on.slice(0,4),
		top:10,
		font:{
			fontSize:'13dp',
			fontWeight:'bold'
		},
		left:10,
		color:'#2A2A2A'
	});
	
	var title = Ti.UI.createLabel({
		text:meetup.title,
		font:{
			fontSize:'30dp'
		},
		height:'auto',
		left:10,
		color:'#049CDB'
	});
	
	var headline = Ti.UI.createLabel({
		text:meetup.blurb,
		font:{
			fontSize:'13dp'
		},
		left:10,
		height:'auto',
		color:'#2A2A2A'
	});
	
	
	scrollView.add(nb);
	scrollView.add(title);
	scrollView.add(headline);
	
	for(var i=0;i<meetup.speakers.length;i++) {
		var leftImg;
		if(Ti.Platform.osname === "android") {
			leftImg=10;
		}
		else {
			leftImg=0;
		}
		var speakerPicture = Ti.UI.createImageView({
			image: Dao.getGravatarPicture(meetup.speakers[i].email),
			height:60,
			left:leftImg,
			top:20
		});	

		
		var speakerTitle = Ti.UI.createLabel({
			text:meetup.speakers[i].title,
			font:{
				fontSize:'13dp'
			},
			height:'auto',
			left:75,
			top:-60,
			color:'#049CDB'
		});
		
		
		var speakerName = Ti.UI.createLabel({
			text:meetup.speakers[i].name,
			top:0,
			font:{
				fontSize:'13dp',
				fontWeight:'bold'
			},
			left:75,
			height:'auto',
			color:'#2A2A2A'
		});
		
		var speakerSynopsys = Ti.UI.createLabel({
			text:meetup.speakers[i].synopsis,
			font:{
				fontSize:'13dp'
			},
			top:10,
			left:75,
			height:'auto',
			width:'75%',
			color:'#2A2A2A'
		});
		
		scrollView.add(speakerPicture);
		scrollView.add(speakerTitle);
		scrollView.add(speakerName);
		scrollView.add(speakerSynopsys);
	}
	
	if (today<=meetup.on && home && meetup.speakers.length==1) {
		present.title = "Looks like there's space for one more presentation!";
		present.top=10;
		present.height=60;
		scrollView.add(present);
	}
	self.add(scrollView);

	
	self.addEventListener("open", function() {
	   if (Ti.Platform.osname === "android") {
	        if (! self.activity) {
	            Ti.API.error("Can't access action bar on a lightweight window.");
	        } else {
	            actionBar = self.activity.actionBar;
	            if (actionBar) {
	            	actionBar.backgroundImage='/images/bgTab.png';
	            	actionBar.displayHomeAsUp = true;
	                actionBar.onHomeIconItemSelected = function() {
	                    self.close();
	                };
	            }
	        }
	    }
	});


	return self;
	
};

module.exports = MeetupWindow;
