const express = require("express");
const socketio = require("socket.io");
const http = require("http");
const path = require("path");
const fs = require("fs");

var app = express();

var server = http.createServer(app);

var cache = {};

function verifyCache() {
	var files = fs.readdirSync(__dirname);
	var d = false;
	for (var i = 0; i < files.length; i++) {
		if (files[i] != path.basename(__filename)) {
			var file = fs.readFileSync(files[i]).toString();
			if (cache[files[i]] != file) {
				d = true;
				cache[files[i]] = file;
			}
		}
	}
	return d;
}

verifyCache();

app.get("/", function(req, res) {
	res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/read/\*", function(req, res) {

});

app.post("/write/\*", function(req, res) {

});

app.get("/reload", function(req, res) {
	res.send({reload: verifyCache()});
});

var io = new socketio.Server(server);

io.on("connection", function(socket) {
	console.log("C:", socket.id);
	socket.on("disconnet", function () {
		console.log("D:", socket.id);
	});
});

server.listen(4000, function() {
	console.log("Ready");
});
