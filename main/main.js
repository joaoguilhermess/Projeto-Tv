const Left = document.querySelector(".left");
const LeftTitle = Left.querySelector(".title");
const LeftList = Left.querySelector(".list");

const Right = document.querySelector(".right");

var socket = io();

socket.on("connect", function() {
	socket.emit("windowOpen", function(index) {
		console.log(index);
	});
});

function iterate(container, list, prefix) {
	for (var i = 0; i < list.length; i++) {
		var k = document.createElement("div");

		k.textContent = prefix + "/" + list[i].name;

		container.append(k);

		if (list[i].type == "dir") {
			k.classList.add("dir");

			iterate(k, list[i].files, prefix + "/" + list[i].name);
		} else if(list[i].type == "file") {
			k.classList.add("file");

			k.onclick = function(event) {
				console.log(event.target.textContent);
			}
		}
	}
}

async function update() {
	var f = await fetch("dir");
	var list = await f.json();

	iterate(LeftList, list, ".");
}

update();