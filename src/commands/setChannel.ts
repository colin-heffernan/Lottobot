// Imports
import { CommandInteraction, SlashCommandBuilder } from "discord.js";
import { Command } from "../classes/command";
import { ExtendedClient } from "../classes/extendedClient";
import fs from "fs";

// Construct a Command object for the enroll command
export const command = new Command(new SlashCommandBuilder().setName("set-channel").setDescription("ADMIN: Set the server's announcement channel."),
	// Define the execute function
	async (client: ExtendedClient, interaction: CommandInteraction) => {
		// Get thhe data from the guilds file
		const dataFromJson = fs.readFile(client.getGuildsFile(), "utf-8", async (err, data) => {
			// On error, print to console and return
			if (err) {
				console.log(`Error reading file:\n\n${err}`);
				return 1;
			}

			// Parse the JSON data
			const json = await JSON.parse(data);

			// If the command wasn't sent in a guild, return
			if (!interaction.guild || !interaction.channel) {
				await interaction.reply({ content: "This command was not sent in a server text channel!", ephemeral: true });
				return 2;
			}

			// If the command somehow has no sender, return
			if (!interaction.memberPermissions || !interaction.memberPermissions.has("Administrator")) {
				await interaction.reply({ content: "You don't have permission to send this command!", ephemeral: true });
				return 3;
			}

			// If the guild is not in the data, add it
			if (!Object.keys(json.guilds).includes(interaction.guild.id)) {
				console.log("Guild not in list, adding...");
				await Object.defineProperty(json.guilds, interaction.guild.id, {
					enumerable: true,
					value: {
						"channel": "",
						"people": {},
					},
				});
			}


			// If the user is not in the data, add him/her/them
			if (json.guilds[interaction.guild.id].channel !== interaction.channel.id) {
				console.log("Different channel detected, setting...");
				await Object.defineProperty(json.guilds[interaction.guild.id], "channel", {
					enumerable: true,
					value: interaction.channel.id,
				});
			}
			else {
				console.log("This is already the server's selected channel.");
			}

			// Write to the file
			const dataToJson = JSON.stringify(json, null, 2);
			fs.writeFile(client.getGuildsFile(), dataToJson, () => {
				console.log("File written.");
				interaction.reply({ content: "Announcement channel set!", ephemeral: true });
			});
			return 0;
		});
	},
);
