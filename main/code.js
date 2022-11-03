class Code {
	constructor(socket, filename) {
		this.socket = socket;

		var context = this;
		this.socket.emit("windowOpen", function(result) {
			context.filename = filename;

			context.window = document.createElement("div");
			
			context.window.classList.add("window");

			Right.append(context.window);
		});
	}

	cursor(x, y) {

	}

	read(filename) {
		this.socket.emit("read", filename);
	}

	write(code, filename) {
		this.socket.emit("write", filename);
	}
}