function DAO(md5) {
	var dao = {
		md5:md5
	};
	
	
	dao.urls = {
		meetups:"http://js-montreal.org/meetups.json",
		gravatar:"http://www.gravatar.com/avatar/"
	};
	
	dao.getMeetups = function(callback) {
		var ajax = Ti.Network.createHTTPClient({
		     onload : function(e) {
		         if(callback) callback(JSON.parse(this.responseText));
		     },
		     onerror : function(e) {
		     	alert('erreur');
		         Ti.API.debug(e.error);
		     },
		     timeout : 5000
		});
		ajax.open("GET", this.urls.meetups);
		ajax.send();
	};
	
	dao.getGravatarPicture = function(email) {
		return this.urls.gravatar+this.md5(email);
	};
	return dao;
};

module.exports = DAO;
