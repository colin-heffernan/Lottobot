export class Event {
	eventName: string;
	once: boolean;
	execute: (...args: any) => void;
	constructor(eventName: string, execute: (...args: any) => void, once: boolean) {
		this.eventName = eventName;
		this.execute = execute;
		this.once = once;
	}
}
