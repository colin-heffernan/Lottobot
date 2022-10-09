// Imports
import { CommandInteraction, SlashCommandBuilder } from "discord.js";
import { ExtendedClient } from "./extendedClient";

// Export the Command class
export class Command {
	// Private properties
	private data: SlashCommandBuilder;
	public execute: (client: ExtendedClient, interaction: CommandInteraction) => void;

	// Constructor
	constructor(data: SlashCommandBuilder, execute: (client: ExtendedClient, interaction: CommandInteraction) => void) {
		this.data = data;
		this.execute = execute;
	}

	// Getter method for data property
	public getData = () => {
		return this.data;
	};
}
