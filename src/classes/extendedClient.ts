// Imports
import { Client, Collection, GatewayIntentBits } from "discord.js";
import { Command } from "./command";

// Export the ExtendedClient class
export class ExtendedClient extends Client {
	// Private properties
	private commands: Collection<string, Command>;
	private guildsFile: string;

	// Constructor
	constructor(guildsFile: string) {
		super({ intents: [GatewayIntentBits.Guilds] });
		this.commands = new Collection();
		this.guildsFile = guildsFile;
	}

	// Getter method for commands property
	public getCommands = () => {
		return this.commands;
	};

	// Setter method for commands property
	public setCommand = (commandName: string, command: Command) => {
		this.commands.set(commandName, command);
	};

	// Getter method for guildsFile property
	public getGuildsFile = () => {
		return this.guildsFile;
	};
}
