import axios from 'axios';

import configuration from '../configuration';

const api = axios.create({ baseURL: configuration.api.baseURL() });

export default api;
