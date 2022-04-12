import Highcharts from 'highcharts';

const renderPieChart = (targetDom, info) => {
  return Highcharts.chart(targetDom, {
    chart: {
      plotBackgroundColor: null,
      plotBorderWidth: null,
      plotShadow: false,
      type: 'pie',
    },
    title: {
      text: info.title,
    },
    tooltip: {
      pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>',
    },
    accessibility: {
      point: {
        valueSuffix: '%',
      },
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: 'pointer',
        dataLabels: {
          enabled: true,
          format: '<b>{point.name}</b>: {point.percentage:.1f} %',
        },
      },
    },
    series: [
      {
        name: 'Brands',
        colorByPoint: true,
        data: info.messageTotal,
        // data: [
        //   {
        //     name: 'Chrome',
        //     y: 61.41,
        //     // sliced: true,
        //     // selected: true,
        //   },
        //   {
        //     name: 'Internet Explorer',
        //     y: 60.84,
        //   },
        // ],
      },
    ],
  });
};

export default renderPieChart;
