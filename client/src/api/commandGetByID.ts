import api from '../shared/api';
import { CommandWithKeywords } from '../types/CommandWithKeywords';

interface CommandGetByIDOptions {
  commandID: CommandWithKeywords['id'];
}

const commandGetByID = (options: CommandGetByIDOptions) =>
  api.get<CommandWithKeywords>(`/command/${options.commandID.toString()}`);

export default commandGetByID;
