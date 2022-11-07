import api from '../shared/api';
import { CommandWithInvocations } from '../types/CommandWithInvocations';

interface CommandGetInvocationsByKeywordOptions {
  keyword: string;
}

const commandGetInvocationsByKeyword = (
  options: CommandGetInvocationsByKeywordOptions
) =>
  api.get<CommandWithInvocations>(`/command/keyword/${options.keyword}/invoke`);

export default commandGetInvocationsByKeyword;
