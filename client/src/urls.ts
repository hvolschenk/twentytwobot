export type CommandParams = { commandID: string };
export const command = (commandID: string = ':commandID') =>
  `/commands/${commandID}`;
export const commandCreate = (): string => '/commands/create';
export const commandEdit = (commandID: string = ':commandID'): string =>
  `/commands/${commandID}/edit`;
export const commands = () => '/commands';

export const root = () => '/';

export const timers = () => '/timers';

// -----------------------------------------------------------------------------
// Helper methods
// These are ONLY necessary because of the sillyness of `react-router@6`
// https://github.com/remix-run/react-router/issues/8035
// -----------------------------------------------------------------------------
export const urlLayout = (url: string): string => `${url}/*`;
export const urlRelative = (url: string, parent: string): string =>
  url.replace(parent, '');
