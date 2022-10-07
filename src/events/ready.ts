import { Client } from "discord.js";
import { Event } from "../classes/event";

export const event = new Event("ready",
	function execute(client: Client) {
		console.log(`Logged in as ${client.user?.tag}.`);
		console.log(`Watching ${client.guilds.cache.size} servers.`);
		console.log("Ready!");
	},
	true,
);
