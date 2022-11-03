import api from '../shared/api';

const commandKeywordGetAll = () => api.get<string[]>('/command/keyword');

export default commandKeywordGetAll;
