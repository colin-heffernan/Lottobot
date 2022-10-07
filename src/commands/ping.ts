import { CommandInteraction, SlashCommandBuilder } from "discord.js";
import { Command } from "../classes/command";

export const command = new Command(new SlashCommandBuilder().setName("ping").setDescription("Replies with \"Pong.\""),
	async function execute(interaction: CommandInteraction) {
		await interaction.reply("Pong.");
	},
);
