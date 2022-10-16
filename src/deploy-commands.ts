// Imports
import fs from "fs";
import path from "path";
import { Routes } from "discord.js";
import { REST } from "@discordjs/rest";
import { clientId, guildId, token } from "./config.json";

// Declare and initialize variables that will be used later
(async () => {
	const commands: string[] = [];
	const commandsPath = path.join(__dirname, "commands");
	const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith(".ts"));

	// Populate the commands array with commands from the ./commands/ directory
	for (const file of commandFiles) {
		const filePath = path.join(commandsPath, file);
		await import(filePath).then(module => {
			const command = module.command;
			commands.push(command.getData().toJSON());
		});
	}

	// Honestly, I'm not entirely sure what happens after here
	// TODO: Stop using any for data type
	const rest = new REST({ version: "10" }).setToken(token);

	await (async () => {
		try {
			console.log(`Started refreshing ${commands.length} application commands.`);
			const data: any = await rest.put(
				Routes.applicationGuildCommands(clientId, guildId),
				{ body: commands },
			);
			console.log(`Successfully registered ${data.length} application commands.`);
		}
		catch (error) {
			console.error(error);
		}
	})();
})();
