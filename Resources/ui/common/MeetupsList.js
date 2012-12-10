function MeetupsList(Dao,Meetup,meetups) {
	
	var self = Ti.UI.createWindow({
		title:'Archive',
	    barColor:'#049CDB', 
		backgroundColor:'#F8F8F8'
	});
	var rows = [];
	for(var i=0;i<meetups.length;i++) {
		var speaks="";
		
		for(var j=0;j<meetups[i].speakers.length;j++) {
			speaks+=meetups[i].speakers[j].title
		}
		
		var row = Ti.UI.createTableViewRow({
			title:meetups[i].num +" - " + meetups[i].title,
			color:'#2A2A2A',
			backgroundColor:'#F8F8F8',
			filterCriteria: meetups[i].title+" "+speaks
		});
		row.height = 50;
		row.meetup = meetups[i];
	
		rows.push(row);
	}
	var tableView = Titanium.UI.createTableView({
		filterAttribute:'filterCriteria',
		allowsSelection:true,
		search:Titanium.UI.createSearchBar({
			hintText:'Recherchez un meetup',
		    barColor:'#049CDB', 
		    showCancel:true,
		    height:43,
		    top:0,
		}),
		data:rows
	});
	self.add(tableView);
	
	tableView.addEventListener("click", function(evt) {
		self.containingTab.open(new Meetup(Dao, evt.row.meetup, evt.row.meetup.title));
		
	});
	return self;
};

module.exports = MeetupsList;