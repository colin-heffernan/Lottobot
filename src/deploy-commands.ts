import fs from "fs";
import path from "path";
import { Routes } from "discord.js";
import { REST } from "@discordjs/rest";
import { clientId, guildId, token } from "./config";

const commands = [];
const commandsPath = path.join(__dirname, "commands");
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith(".ts"));

for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const { command } = require(filePath);
	commands.push(command.data.toJSON());
}

const rest = new REST({ version: "10" }).setToken(token);

rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: commands })
	.then((data: unknown) => console.log(`Successfully registered ${data.length} application commands.`))
	.catch(console.error);
