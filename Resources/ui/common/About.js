function About(title) {
	
	var self = Ti.UI.createWindow({
		title:title,
		backgroundColor:'#F8F8F8',
	    barColor:'#049CDB'
	});
	
	
	var scrollView = Ti.UI.createScrollView({
		  top:0,
		  contentHeight: 'auto',
		  contentWidth: Ti.Platform.displayCaps.platformWidth,
		  layout: 'vertical',
		  scrollType:'vertical'
	});
	
	var labelWhere = Ti.UI.createLabel({
		text:"Where is it ?",
		font:{
			fontSize:'30dp'
		},
		height:70,
		left:10,
		color:'#049CDB'
	});
	scrollView.add(labelWhere);
	
	
	if(Ti.Platform.osname!="android") {
				
		var cakeMail = Titanium.Map.createAnnotation({
			latitude:45.475206,
			longitude:-73.580782,
			title:"Cake Mail Offices",
			subtitle:'4020 Rue Saint-Ambroise #145 Montreal,QC H4C 2C7',
			pincolor:Titanium.Map.ANNOTATION_PURPLE,
			animate:true
		});
		
		//
		// CREATE MAP VIEW
		//
		var mapview = Titanium.Map.createView({
			mapType: Titanium.Map.STANDARD_TYPE,
			region: {latitude:45.475206, longitude:-73.580782, latitudeDelta:0.01, longitudeDelta:0.01},
			animate:true,
			regionFit:true,
			userLocation:true,
			height:170,
			annotations:[cakeMail]
		});
	
		scrollView.add(mapview);
		mapview.selectAnnotation(cakeMail);
	}
	var locationHeader = Ti.UI.createLabel({
		text:"We now meet at the Cakemail offices.",
		font:{
			fontSize:'13dp'
		},
		top:10,
		left:10,
		color:'#2A2A2A'
	});
	scrollView.add(locationHeader);
	
	var address = Ti.UI.createLabel({
		text:"4020 Rue Saint-Ambroise #145 Montreal,QC",
		font:{
			fontSize:'13dp'
		},
		left:10,
		top:10,
		color:'#049CDB'
	});
	scrollView.add(address);
	
	var instructions = [
		{text:'Take the metro to Place-Saint-Henri (orange line)'},
		{text:'Take the Saint-Ferdinand exit on the left'},
		{text:'Walk down Saint-Ferdinand St. until Saint-Ambroise St'},
		{text:'Cross the street and the building will be on your left'},
		{text:'You can also get out at Lionel Groulx and go down Atwater until you hit Ste-Ambroise and go right (westward)'},
	];
	for(var i = 0; i<instructions.length;i++) {
		scrollView.add(Ti.UI.createLabel({
			text:"- "+instructions[i].text,
			font:{
				fontSize:'13dp'
			},
			left:10,
			color:'#2A2A2A'
		}));
	}
	scrollView.add(Ti.UI.createLabel({
		text:"This app has been created by Florent Lamoureux as a demo for the #26 meetup.",
		font:{
			fontSize:'11dp'
		},
		left:10,
		top:30,
		height:'auto',
		color:'#2A2A2A'
	}));
	
	var website = Titanium.UI.createButton({
		title:'Go to the official website for more informations',
		font:{fontSize:'12dp',fontFamily:'Helvetica Neue'},
		height:60,
		width:'100%',
	    backgroundColor: "#049CDB",
	    color: '#ffffff',
	    top:'30dp',
	    backgroundImage: 'none'
	});
	
	website.addEventListener('click', function(e)
	{
		Titanium.Analytics.featureEvent('app.goToWebsite');
		Titanium.Platform.openURL('http://js-montreal.org');
	});
	scrollView.add(website);
	
	self.add(scrollView);
	
	
	
	return self;
};

module.exports = About;
