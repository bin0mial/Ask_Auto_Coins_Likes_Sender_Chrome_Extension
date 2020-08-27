console.log("gooo");
chrome.runtime.onMessage.addListener(gotMessage);

function gotMessage(message, sender, sendResponse){
	console.log(message.txt);
	if(!isNaN(message.txt)&&window.location.hostname.includes("ask.fm")){
		if(!wait(message.txt)){
			sendResponse({
				response: "fail"
        });
		}
	}
}

function like(expand,likeLength){
	for(i =0; i<likeLength; i++){
		expand[i].click();
		
	}
	console.log("Done");
}
function wait(likeLength){
	var expand = document.querySelectorAll('[data-action="AnswerLikeToggle"]:not(.active)');
	if(likeLength>=expand.length){
		x=document.getElementsByClassName("item-page-next")
		x[0].click();
		console.log("Loaded");
		return 0;
	}
	else{
		like(expand,likeLength);
		return 1;
	}
}