var FBDebugger = {
	fb_endpoint : 'https://developers.facebook.com/tools/debug/og/object?q=',
	page_url : '',

	sendToFacebook : function(info, tab) {
		var req = new XMLHttpRequest(),
			url = info.pageUrl,
			request_url = FBDebugger.fb_endpoint + encodeURIComponent(url);

		FBDebugger.page_url = url;

		req.open("GET", request_url, true);
	        req.onload = FBDebugger.onLoad;
	        req.onerror = function(e){
	    	    console.log(e);
	        };
	        
	    	req.send(null);
	},

	onLoad : function (e) {
		var notification = webkitNotifications.createNotification(
		  '',  
		  'Facebook debug successful!',
		  FBDebugger.page_url + ' was refreshed at Facebook.'
		);

		notification.show();
	}
}

chrome.contextMenus.create({
	"title": "Refresh page on Facebook",
	"contexts": ["page"],
	"id": "fbsend"
});

chrome.contextMenus.onClicked.addListener(FBDebugger.sendToFacebook);

