var style = document.createElement("link");

style.type = "text/css";
style.rel = "stylesheet";
style.href = "reload.css";

document.head.append(style);

const ReloaderContainer = document.createElement("div");
ReloaderContainer.classList.add("reloading");
ReloaderContainer.classList.add("hidden");

ReloaderContainer.textContent = "Reloading...";

document.body.append(ReloaderContainer);

setInterval(async function() {
	var f = await fetch("/reload");
	var r = await f.json();

	if (r.reload) {
		ReloaderContainer.classList.toggle("hidden");

		setTimeout(function() {
			window.location.reload();
		}, 500);
	}
}, 1000);