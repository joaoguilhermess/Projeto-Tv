import Util from "./util.js";

export default class Router {

	app;

	static Init(app) {
		this.app = app;

		this.ReloadScript();
		this.MainPage();
		this.KeyboardPage();
		this.SocketIoScript();
	}

	static Registry(dir, filename, url) {
		this.app.get(url || filename, function(req, res) {
			res.sendFile(Util.ResolvePath(dir, filename));
		});
	}

	static RegistryScript(url, fun) {
		this.app.get(url, fun);
	}

	static ReloadScript() {
		var script = function(dir) {
			var files = fs.readdirSync(Util.CurrentDir);

			var r = false;

			for (var i = 0; i < files.length; i++) {
				var fileStats = fs.lstatSync(Util.ResolvePath(files[i]));
				var lastEdit = fileStats.mtime.toLocaleString();

				if (fileStats.isDirectory()) {
					r = script();
				} else {

				}
			}
		};

		this.RegistryScript("/reload", script);
		this.Registry("reload", "reload.js");
		this.Registry("reload", "reload.css");
	}

	static MainPage() {
		this.Registry("main", "index.html", "/");
		this.Registry("main", "style.css");
		this.Registry("main", "main.js");
		this.Registry("main", "code.js");
		this.Registry("main", "whitney.woff");
	}

	static KeyboardPage() {
		this.Registry("keyboard", "keyboard.html", "/keyboard");
		this.Registry("keyboard", "keyboard.css");
		this.Registry("keyboard", "keyboard.js");
	}

	static SocketIoScript() {
		this.Registry("socketio", "socket.io.js");
		this.Registry("socketio", "socket.io.js.map");
	}
}