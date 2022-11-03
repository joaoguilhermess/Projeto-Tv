var socket = new Socket(io);

var hold = {};

socket.on("connect", function() {
	console.log(document.title, "Connected");

	var keys = document.querySelectorAll(".key");

	for (var i = 0; i < keys.length; i++) {
		keys[i].onclick = function(event) {
			socket.input("key", event.target.textContent);
		};
	}
});