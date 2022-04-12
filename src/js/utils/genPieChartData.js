import keyMapping from '@/js/utils/keyMapping';

const genPieChartData = (data, title = '') => {
  const messageKeys = ['message', 'file', 'photo', 'sticker', 'call', 'missCall'];

  const tcdAllData = messageKeys.map((key) => {
    const eachPie = {
      name: keyMapping[key],
      y: data[key],
    };

    return eachPie;
  });

  const tcdAllInfo = {
    messageTotal: tcdAllData,
    title,
  };

  return tcdAllInfo;
};

export default genPieChartData;
