// Imports
import { ExtendedClient } from "./extendedClient";

// Export the Event class
// TODO: Stop using type any for parameter args of execute
export class Event {
	// Private properties
	private eventName: string;
	private once: boolean;
	public execute: (client: ExtendedClient, ...args: any) => void;

	// Constructor
	constructor(eventName: string, execute: (client: ExtendedClient, ...args: any) => void, once: boolean) {
		this.eventName = eventName;
		this.execute = execute;
		this.once = once;
	}

	// Getter method for eventName property
	public getEventName = () => {
		return this.eventName;
	};

	// Getter method for once property
	public getOnce = () => {
		return this.once;
	};
}
