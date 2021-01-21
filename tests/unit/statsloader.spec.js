import statsLoader from "@/stats-loader";
import { expect } from "chai";

describe("stats-loader.js", () => {
	it("loadStatsFromFile: loads stats in correctly from the playerStats2 file", done => {
		statsLoader.loadStatsFromFile(stats => {
			expect(stats.bodiesReported).to.equal(101);
			expect(stats.emergenciesCalled).to.equal(14);
			expect(stats.tasksCompleted).to.equal(1698);
			expect(stats.allTasksCompleted).to.equal(195);
			expect(stats.sabotagesFixed).to.equal(288);
			expect(stats.impostorKills).to.equal(216);
			expect(stats.timesMurdered).to.equal(206);
			expect(stats.timesEjected).to.equal(96);
			expect(stats.crewmateStreak).to.equal(6);
			expect(stats.timesImpostor).to.equal(120);
			expect(stats.timesCrewmate).to.equal(438);
			expect(stats.gamesStarted).to.equal(558);
			expect(stats.gamesFinished).to.equal(556);
			expect(stats.crewmateVoteWins).to.equal(208);
			expect(stats.crewmateTaskWins).to.equal(40);
			expect(stats.impostorVoteWins).to.equal(17);
			expect(stats.impostorKillsWins).to.equal(41);
			expect(stats.impostorSabotageWins).to.equal(10);
			done();
		}, "./tests/playerStats2");
	});
});
