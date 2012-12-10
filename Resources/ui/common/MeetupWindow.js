function MeetupWindow(Dao, meetup, title) {
	
	var self = Ti.UI.createWindow({
		title:title || 'Next JS Montreal Meetup',
	    barColor:'#049CDB', 
		backgroundColor:'#F8F8F8'
	});
		
	var scrollView = Ti.UI.createScrollView({
	  top:0,
	  contentHeight: 'auto',
	  contentWidth: Ti.Platform.displayCaps.platformWidth,
	  layout: 'vertical',
	  scrollType:'vertical'
	});
	
	var nb = Ti.UI.createLabel({
		text:"Meetup #"+meetup.num+" - "+meetup.on.slice(meetup.on.length-2,meetup.on.length)+"/"+meetup.on.slice(meetup.on.length-4,meetup.on.length-2)+"/"+meetup.on.slice(0,4),
		top:10,
		font:{
			fontSize:'13px',
			fontWeight:'bold'
		},
		left:10,
		color:'#2A2A2A'
	});
	
	var title = Ti.UI.createLabel({
		text:meetup.title,
		font:{
			fontSize:'30px'
		},
		height:'auto',
		left:10,
		color:'#049CDB'
	});
	
	var headline = Ti.UI.createLabel({
		text:meetup.blurb,
		font:{
			fontSize:'13px'
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
				fontSize:'13px'
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
				fontSize:'13px',
				fontWeight:'bold'
			},
			left:75,
			height:'auto',
			color:'#2A2A2A'
		});
		
		var speakerSynopsys = Ti.UI.createLabel({
			text:meetup.speakers[i].synopsis,
			font:{
				fontSize:'13px'
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
	
	self.add(scrollView);

	return self;
	
};

module.exports = MeetupWindow;
