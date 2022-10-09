// Imports
import { CommandInteraction, SlashCommandBuilder } from "discord.js";
import { Command } from "../classes/command";
import { ExtendedClient } from "../classes/extendedClient";

// Construct a Command object for the ping command
export const command = new Command(new SlashCommandBuilder().setName("ping").setDescription("Replies with \"Pong.\""),
	// Define the execute function
	async (client: ExtendedClient, interaction: CommandInteraction) => {
		// Reply to the command
		await interaction.reply({ content: "Pong.", ephemeral: true });
	},
);
