import { CommandInteraction, SlashCommandBuilder } from "discord.js";

export class Command {
	data: SlashCommandBuilder;
	execute: (interaction: CommandInteraction) => void;
	constructor(data: SlashCommandBuilder, execute: (interaction: CommandInteraction) => void) {
		this.data = data;
		this.execute = execute;
	}
}
