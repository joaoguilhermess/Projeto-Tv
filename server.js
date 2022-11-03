const socketio = require("socket.io");
const express = require("express");
const path = require("path");
const http = require("http");
const fs = require("fs");

var app = express();

var server = http.createServer(app);

var io = new socketio.Server(server);

io.on("connection", function(socket) {
	console.log("Connected:", socket.id);

	socket.on("disconnect", function() {
		console.log("Disconnected:", socket.id);
	});
});

app.get("/", function(req, res) {
	res.sendFile(path.join(__dirname, "public", "index.html"));
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

app.get("/dir", function(req, res) {
	res.send(listDir(path.join(__dirname, "playground")));
});

app.get("/read/*", function(req, res) {
	var name = req.url.split("/")[1];
	console.log(name);

	var file = fs.readFileSync(name);
});

app.post("/write/*", function(req, res) {
	var name = req.url.split("/")[1];
	console.log(name);

	var files = fs.writeFileSync(name);
});

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

app.get("/reload.js", function(req, res) {
	return res.sendFile(path.join(__dirname, "public", "reload.js"));
});

app.get("/reload.css", function(req, res) {
	return res.sendFile(path.join(__dirname, "public", "reload.css"));
});

app.get("/main.js", function(req, res) {
	return res.sendFile(path.join(__dirname, "public", "main.js"));
});

app.get("/code.js", function(req, res) {
	return res.sendFile(path.join(__dirname, "public", "code.js"));
});

app.get("/style.css", function(req, res) {
	return res.sendFile(path.join(__dirname, "public", "style.css"));
});

app.get("/whitney.woff", function(req, res) {
	return res.sendFile(path.join(__dirname, "public", "whitney.woff"));
});

app.get("/keyboard", function(req, res) {
	return res.sendFile(path.join(__dirname, "public", "keyboard.html"));
});

app.get("/keyboard.css", function(req, res) {
	return res.sendFile(path.join(__dirname, "public", "keyboard.css"));
});

app.get("/keyboard.js", function(req, res) {
	return res.sendFile(path.join(__dirname, "public", "keyboard.js"));
});

app.get("/socket.io.js", function(req, res) {
	return res.sendFile(path.join(__dirname, "public", "socket.io.js"));
});

app.get("/socket.io.js.map", function(req, res) {
	return res.sendFile(path.join(__dirname, "public", "socket.io.js.map"));
});

server.listen(4000, function() {
	console.log("Ready");
});