import api from '../shared/api';
import { CommandWithKeywords } from '../types/CommandWithKeywords';

const commandGetAll = () => api.get<CommandWithKeywords[]>('/command');

export default commandGetAll;
