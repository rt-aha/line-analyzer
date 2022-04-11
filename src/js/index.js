import '@/styles/index.scss';
import '@/template/index.html';

import Alpine from 'alpinejs';
import lineData from '../testData/test1.js';

window.Alpine = Alpine;

const { userStatistics, totalStatistics, averageStatistics } = lineData;

const calcMinSec = (seconds) => {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);

  return `${mins}分${secs}秒`;
};

Alpine.data('mainData', () => ({
  totalMessage: totalStatistics.message,
  totalCall: calcMinSec(totalStatistics.totalCallSeconds),
}));

Alpine.start();
