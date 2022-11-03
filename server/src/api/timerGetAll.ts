import api from '../shared/api';
import { Timer } from '../types/Timer';

const timerGetAll = () => api.get<Timer[]>('/timer');

export default timerGetAll;
