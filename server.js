import express from "express";
import Router from "./router.js";
import Util from "./util.js";

var app = express();

var server = http.createServer(app);

var io = new socketio.Server(server);

var windows = {};

io.on("connection", function(socket) {
	console.log("Connected:", socket.id);

	socket.windows = [];

	socket.on("windowOpen", function(callback) {
		callback();
	});

	socket.on("windowClose", function() {

	});

	socket.on("disconnect", function() {
		console.log("Disconnected:", socket.id);

		for (var i = 0; )
	});
});

app.get("/", function(req, res) {
	res.sendFile(path.join(__dirname, "main", "index.html"));
});

var cache = {};

function listDir(dir) {
	var files = fs.readdirSync(dir);

	var r = [];

	for (var i = 0; i < files.length; i++) {
		var stat = fs.lstatSync(path.join(dir, files[i]));

		if (stat.isDirectory()) {
			r.push({type: "dir", name: files[i], files: listDir(path.join(dir, files[i]))});
		} else {
			r.push({type: "file", name: files[i]});
		}
	}

	return r;
}

function verifyCache(dir) {
	var files = fs.readdirSync(dir);

	var r = false;

	for (var i = 0; i < files.length; i++) {
		var stat = fs.lstatSync(path.join(dir, files[i]));
		var time = stat.mtime.toLocaleString();

		if (stat.isDirectory()) {
			r = verifyCache(path.join(dir, files[i]));
		} else {
			if (cache[files[i]] != time) {
				cache[files[i]] = time;
				r = true;
			}	
		}
	}

	return r;
}

verifyCache(__dirname);

app.get("/reload", function(req, res) {
	return res.send({reload: verifyCache(__dirname)});
});

Router.Init();

server.listen(4000, function() {
	console.log("Ready");
});