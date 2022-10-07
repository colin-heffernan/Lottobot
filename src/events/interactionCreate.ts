import { Interaction } from "discord.js";
import { Event } from "../classes/event";
import { ExtendedClient } from "../classes/extendedClient";

export const event = new Event("interactionCreate",
	async function execute(client: ExtendedClient, interaction: Interaction) {
		if (!interaction.isChatInputCommand()) return;
		const command = client.commands.get(interaction.commandName);
		if (!command) return;
		try {
			command.execute(interaction);
		}
		catch (error) {
			console.error(error);
			await interaction.reply({ content: "There was an error while executing this command." });
		}
	},
	false,
);
