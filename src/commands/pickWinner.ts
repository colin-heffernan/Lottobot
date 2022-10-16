// Imports
import { CommandInteraction, SlashCommandBuilder } from "discord.js";
import { Command } from "../classes/command";
import { ExtendedClient } from "../classes/extendedClient";
import fs from "fs";

// Construct a Command object for the pick-winner command
export const command = new Command(new SlashCommandBuilder().setName("pick-winner").setDescription("ADMIN: Select a winner from everyone enrolled in the server."),
	// Define the execute function
	async (client: ExtendedClient, interaction: CommandInteraction) => {
		// Get the data from the guilds file
		const dataFromJson = fs.readFile(client.getGuildsFile(), "utf-8", async (err, data) => {
			// On error, print to console and return
			if (err) {
				console.log(`Error reading file:\n\n${err}`);
				return 1;
			}

			// Parse the tally data
			const json = await JSON.parse(data);

			// If the interaction wasn't sent in a guild, reply negatively and return
			if (!interaction.guild) {
				await interaction.reply({ content: "This command was not sent in a server!", ephemeral: true });
				return 2;
			}

			// If the user doesn't have sufficient perms, reply negatively and return
			if (!interaction.memberPermissions || !interaction.memberPermissions.has("Administrator")) {
				await interaction.reply({ content: "You don't have permission to send this command!", ephemeral: true });
				return 3;
			}

			// Get a list of guilds that the bot recognizes
			const guildKeyArray = Object.keys(json.guilds);

			// If the bot doesn't recognize the guild, reply negatively and return
			if (!guildKeyArray.includes(interaction.guild.id)) {
				await interaction.reply({ content: "This server is not recognized!", ephemeral: true });
				return 4;
			}

			// Get the dict of people in the guild
			const peopleDict = await json.guilds[interaction.guild.id].people;

			// Get an array from the keys of the dict
			const peopleKeyArray = Object.keys(peopleDict);

			// Build an array of enrolled people
			const peopleArray: string[] = [];
			for (let i = 0; i < peopleKeyArray.length; i++) {
				if (peopleDict[peopleKeyArray[i]].enrolled) {
					peopleArray.push(peopleKeyArray[i]);
				}
			}

			// If the people array is empty, reply negatively and return
			if (peopleArray.length == 0) {
				await interaction.reply({ content: "Nobody is enrolled!", ephemeral: true });
				return 5;
			}

			// Pick a winner from the key array
			const peopleWinnerID = peopleArray[Math.floor(Math.random() * peopleArray.length)];

			// Try to find the channel to send the winner in
			const interactionGuild = interaction.guild;
			const announcementChannel = interactionGuild.channels.cache.get(json.guilds[interaction.guild.id].channel);

			// If the channel doesn't exist, reply negatively and return
			if (!announcementChannel || (announcementChannel.type != 0 && announcementChannel.type != 5)) {
				await interaction.reply({ content: "The announcement channel can't be used.", ephemeral: true });
				return 6;
			}

			// Send the announcement
			await announcementChannel.send(`The winner is <@!${peopleWinnerID}>!`);

			// Reply positively and return
			await interaction.reply({ content: "Command successful!", ephemeral: true });
			return 0;
		});
	},
);
