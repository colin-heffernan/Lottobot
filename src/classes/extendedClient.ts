import { Client, Collection, GatewayIntentBits } from "discord.js";
import { Command } from "./command";

export class ExtendedClient extends Client {
	public commands: Collection<string, Command> = new Collection();
	constructor() {
		super({ intents: [GatewayIntentBits.Guilds] });
	}
}
