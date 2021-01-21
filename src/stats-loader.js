const fs = require("fs");
const electron = require("electron");
const electronStore = require("electron-store");
const store = new electronStore();

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
	crewmateVoteWins: 0,
	crewmateTaskWins: 0,
	impostorVoteWins: 0,
	impostorKillsWins: 0,
	impostorSabotageWins: 0,
};

function loadStatsFromFile(callback, url) {
	if (!url) {
		// if someone knows how to do this better than this, please do so, lol.
		const app = electron.app || electron.remote.app;
		url =
			app
				.getPath("userData")
				.replace("Roaming", "LocalLow/")
				.replace(app.getName(), "") + "InnerSloth/Among Us/playerStats2";
	}

	const filePath = url;
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

		saveTrendAsOfGame();

		if (typeof callback === "function") callback(stats);
	});
}

function saveTrendAsOfGame() {
	let currentTrends = store.get("trend") || [];

	// see if this games started is there
	const existingGameIx = currentTrends.findIndex(trendItem => trendItem.game === stats.gamesStarted);
	if (existingGameIx !== -1) return;

	// its not so store games completed, games won, impostor wins, crewmate wins
	currentTrends.push({
		game: stats.gamesStarted,
		wins: stats.impostorVoteWins + stats.impostorKillsWins + stats.impostorSabotageWins + stats.crewmateVoteWins + stats.crewmateTaskWins,
		crewmateWins: stats.crewmateVoteWins + stats.crewmateTaskWins,
		impostorWins: stats.impostorVoteWins + stats.impostorKillsWins + stats.impostorSabotageWins,
	});

	currentTrends = currentTrends.slice(-5);
	store.set("trend", currentTrends);
}

function getTrends() {
	return store.get("trend") || [];
}

export default { loadStatsFromFile, getTrends };
