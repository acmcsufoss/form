import { TIMEZONES } from './data';

export function getTimezoneByID(id: string) {
	return TIMEZONES.find((timezone) => timezone.id === id);
}
