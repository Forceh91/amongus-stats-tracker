const fs = require("fs");
const electron = require("electron");

const EXPECTED_VERSION = 3;
const TRACKED_STAT_COUNT = 18;
const TOTAL_BYTES = TRACKED_STAT_COUNT * 4;

const stats = {
	bodiesReported: 0,
	emergenciesCalled: 0,
	tasksCompleted: 0,
	allTasksCompleted: 0,
	sabotagesFixed: 0,
	impostorKills: 0,
	timesMurdered: 0,
	timesEjected: 0,
	crewmateStreak: 0,
	timesImpostor: 0,
	timesCrewmate: 0,
	gamesStarted: 0,
	gamesFinished: 0,
	impostorVoteWins: 0,
	impostorKillsWins: 0,
	impostorSabotageWins: 0,
	crewmateVoteWins: 0,
	crewmateTaskWins: 0,
};

function loadStatsFromFile(callback) {
	// if someone knows how to do this better than this, please do so, lol.
	const app = electron.app || electron.remote.app;
	const APPDATA = app
		.getPath("userData")
		.replace("Roaming", "LocalLow/")
		.replace(app.getName(), "");

	const filePath = APPDATA.replace("Roaming", "LocalLow/") + "InnerSloth/Among Us/playerStats2";
	const fileData = [];
	const readStream = fs.createReadStream(filePath, { highWaterMark: 16 });
	readStream.on("data", data => {
		fileData.push(data);
	});

	readStream.on("end", () => {
		const buffer = Buffer.concat(fileData);
		const version = buffer.readUInt8(0);
		if (version !== EXPECTED_VERSION) throw "Unexpected stats version received";

		// we know that theres data every 4 byes, and we need to start at byte 1, going up to 18 * 4 (theres 18 stats options)
		const statNames = Object.keys(stats);
		for (let byte = 1, stat = 0; byte < TOTAL_BYTES; byte += 4, stat++) {
			stats[statNames[stat]] = parseInt(buffer.readUInt32LE(byte));
		}

		if (typeof callback === "function") callback(stats);
	});
}

export default { loadStatsFromFile };
