import URLBuilder from '../../shared/URLBuilder';

export const command = (id: string = ':commandID'): string => id;
export const create = (): string => 'new';
export const update = (id: string = ':commandID'): string => `${id}/update`;

export default new URLBuilder('/commands');
