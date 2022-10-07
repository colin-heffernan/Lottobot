// Import classes
import fs from "fs";
import path from "path";
import { token } from "./config";
import { ExtendedClient } from "./classes/extendedClient";

// Create a new client instance
const client = new ExtendedClient();

// Command collection for command handler
const commandsPath = path.join(__dirname, "commands");
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith(".ts"));
for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	import(filePath).then(module => {
		const command = module.command;
		client.commands.set(command.data.name, command);
	});
}

// Event handler
const eventsPath = path.join(__dirname, "events");
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith(".ts"));
for (const file of eventFiles) {
	const filePath = path.join(eventsPath, file);
	import(filePath).then(module => {
		const event = module.event;
		if (event.once) {
			client.once(event.eventName, (...args) => event.execute(client, ...args));
		}
		else {
			client.on(event.eventName, (...args) => event.execute(client, ...args));
		}
	});
}

// Authenticate the bot
client.login(token);
