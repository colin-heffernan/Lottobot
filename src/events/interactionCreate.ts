// Imports
import { Interaction } from "discord.js";
import { Event } from "../classes/event";
import { ExtendedClient } from "../classes/extendedClient";

// Construct an Event object for the interactionCreate event
export const event = new Event("interactionCreate",
	// Define the execute function
	async (client: ExtendedClient, interaction: Interaction) => {
		// If the interaction is not a chat command, do nothing
		if (!interaction.isChatInputCommand()) return;

		// Get the command from the collection of commands
		const command = client.getCommands().get(interaction.commandName);

		// If the command does not exist, do nothing
		if (!command) return;

		// Try to execute the command
		try {
			command.execute(client, interaction);
		}

		// Return negatively on error
		catch (error) {
			console.error(error);
			await interaction.reply({ content: "There was an error while executing this command.", ephemeral: true });
		}
	},
	false,
);
