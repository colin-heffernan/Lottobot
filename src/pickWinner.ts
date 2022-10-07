import { ExtendedClient } from "./classes/extendedClient";
import fs from "fs";

export async function pickWinner(client: ExtendedClient) {
	const dataFromTally = fs.readFile("./tally.json", async (err, data) => {
		if (err) {
			console.error(err);
		}
		else {
			/* const tally = JSON.parse(data); */
			parseData(data);
		}
	});
}

function parseData(data: Buffer) {
	console.log(data);
}
