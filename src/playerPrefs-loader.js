const fs = require("fs");
const electron = require("electron");

const prefs = {
	name: "",
};

function loadPlayerPrefsFromFile(callback, url) {
	if (!url) {
		// if someone knows how to do this better than this, please do so, lol.
		const app = electron.app || electron.remote.app;
		url =
			app
				.getPath("userData")
				.replace("Roaming", "LocalLow/")
				.replace(app.getName(), "") + "InnerSloth/Among Us/playerPrefs";
	}

	const file = fs.readFile(url, "utf-8", (error, data) => {
		if (!data || !data.length) return;
		const splitData = data.split(",");
		prefs.name = splitData[0];

		if (typeof callback === "function") callback(prefs);
	});

	if (file) fs.close();
}

export default { loadPlayerPrefsFromFile };
