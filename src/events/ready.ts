import { pickWinner } from "../pickWinner";
import { Event } from "../classes/event";
import { ExtendedClient } from "../classes/extendedClient";

export const event = new Event("ready",
	function execute(client: ExtendedClient) {
		client.user?.setActivity("the numbers");
		console.log(`Logged in as ${client.user?.tag}.`);
		console.log(`Monitoring ${client.commands.size} commands.`);
		console.log(`Monitoring ${client.guilds.cache.size} servers.`);
		console.log("Ready!");

		setInterval(() => {
			const date = new Date();
			if (date.getHours() == 15 && date.getMinutes() == 32) {
				pickWinner(client);
			}
		}, 60000);
	},
	true,
);
