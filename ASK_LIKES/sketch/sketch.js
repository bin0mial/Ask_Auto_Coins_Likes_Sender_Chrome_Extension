function setup(){
	noCanvas();
	var used = false;
	let numInput = select('#inputLikes');
	let userinput= select('#buttonLikes');
	userinput.mousePressed(startSending);
	numInput.changed(startSending);
	/*numInput.keypress(function(e) {
    if(e.which == 13)  {
        startSending();
    }
}); */
	function startSending(){
		if(used)return;
		used = true;
		let params = {
			active: true,
			currentWindow: true
		}
		chrome.tabs.query(params,sendMsg);
		function sendMsg(tabs){
			console.log(tabs);
			let msg={
					txt: numInput.value()
				}
			console.log(numInput.value());
			chrome.tabs.sendMessage(tabs[0].id, msg,function(response){
				if(response.response=="fail"){
					used =false;
					console.log("reapeted");
					setTimeout(startSending,2000);
				}
				else if(response.response=="max"){
					console.log("max done");
					used = false;
				}
				else{
					console.log("done");
					used = false;
				}
			});
		}
	}
}