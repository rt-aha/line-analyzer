import Alpine from 'alpinejs';
import { v4 as uuid } from 'uuid';

import genPieChart from '@/js/chart/genPieChart.js';
import genPieChartData from '@/js/utils/genPieChartData.js';
import calcMinSec from '@/js/utils/calcMinSec';
// import lineData from '@/testData/test1.js';

const handleLineData = (lineData) => {
  const { userStatistics, totalStatistics, averageStatistics } = lineData;
  // 所有訊息統計
  const ele = document.querySelector('#tcd-container');
  genPieChart(ele, genPieChartData(totalStatistics));

  // 個別訊息統計
  const userKeys = Object.keys(userStatistics);
  const tcdSeperateChartContent = document.querySelector('#tcdSeperateChartContent');
  userKeys.forEach((userKey) => {
    const tcdBoxEle = document.createElement('div');
    tcdBoxEle.setAttribute('class', 'tcd-sc-box');

    const gLabelEle = document.createElement('div');
    gLabelEle.setAttribute('class', 'g-label');
    gLabelEle.textContent = userKey;

    const id = `u${uuid().replace(/-/g, '')}`;
    console.log('id', id);
    const tcdBoxChartEle = document.createElement('div');
    tcdBoxChartEle.setAttribute('class', 'tcd-sc-box__chart');
    tcdBoxChartEle.setAttribute('id', id);
    tcdBoxChartEle.textContent = 'chart';

    tcdBoxEle.appendChild(gLabelEle);
    tcdBoxEle.appendChild(tcdBoxChartEle);

    tcdSeperateChartContent.appendChild(tcdBoxEle);

    const ele = document.querySelector(`#${id}`);
    genPieChart(ele, genPieChartData(userStatistics[userKey]));
  });

  window.Alpine = Alpine;

  Alpine.data('mainData', () => ({
    totalMessage: totalStatistics.message,
    totalCall: calcMinSec(totalStatistics.totalCallSeconds),
  }));

  Alpine.data('averageChatData', () => {
    const { chatDays, message, replyFrquencyInMinutes } = averageStatistics;

    console.log('chatDays', chatDays);

    return {
      chatDays: `平均 ${chatDays} 天一次`,
      message: `${message} 筆`,
      replyFrquencyInMinutes: `${replyFrquencyInMinutes} 分`,
    };
  });

  Alpine.start();
};

export default handleLineData;
