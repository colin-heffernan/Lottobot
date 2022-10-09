// Imports
import { Event } from "../classes/event";
import { ExtendedClient } from "../classes/extendedClient";

// Construct an Event object for the ready event
export const event = new Event("ready",
	// Define the execute function
	(client: ExtendedClient) => {
		client.user?.setActivity("the numbers");
		console.log(`Logged in as ${client.user?.tag}.`);
		console.log(`Monitoring ${client.getCommands().size} commands.`);
		console.log(`Monitoring ${client.guilds.cache.size} servers.`);
		console.log("Ready!");
	},
	true,
);
