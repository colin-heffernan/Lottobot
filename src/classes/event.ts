import { ExtendedClient } from "./extendedClient";

export class Event {
	eventName: string;
	once: boolean;
	execute: (client: ExtendedClient, ...args: any) => void;
	constructor(eventName: string, execute: (client: ExtendedClient, ...args: any) => void, once: boolean) {
		this.eventName = eventName;
		this.execute = execute;
		this.once = once;
	}
}
