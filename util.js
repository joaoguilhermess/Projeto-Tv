import path from "path";
import url from "url";

const CurrentDir = path.dirname(url.fileURLToPath(import.meta.url));

export default class Util {

	static ResolvePath(...args) {
		return path.join(CurrentDir, ...args);
	}
}