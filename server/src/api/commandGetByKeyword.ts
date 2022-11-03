import api from '../shared/api';
import { CommandWithKeywords } from '../types/CommandWithKeywords';

interface CommandGetByKeywordOptions {
  keyword: string;
}

const commandGetByKeyword = (options: CommandGetByKeywordOptions) =>
  api.get<CommandWithKeywords>(`/command/keyword/${options.keyword}`);

export default commandGetByKeyword;
