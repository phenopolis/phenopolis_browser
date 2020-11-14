export default {
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow',
    },
  },
  toolbox: {
    feature: {
      dataZoom: {
        title: {
          zoom: 'Zoom In',
          back: 'Zoom Reset',
        },
      },
      brush: {
        type: ['rect', 'polygon', 'clear'],
        title: {
          rect: 'Rectangle Area',
          polygon: 'Random Shape',
          clear: 'Area Reset',
        },
      },
      saveAsImage: {
        title: 'Save As Image',
      },
    },
  },
  legend: {
    data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎'],
    type: 'scroll',
    x: 'center',
    y: 'bottom',
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '10%',
    containLabel: true,
  },
  xAxis: {
    type: 'category',
    data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
  },
  yAxis: {
    type: 'value',
  },
  series: [
    {
      name: '直接访问',
      type: 'bar',
      stack: '总量',
      label: {
        show: true,
        position: 'insideRight',
      },
      data: [320, 302, 301, 334, 390, 330, 320],
    },
    {
      name: '邮件营销',
      type: 'bar',
      stack: '总量',
      label: {
        show: true,
        position: 'insideRight',
      },
      data: [120, 132, 101, 134, 90, 230, 210],
    },
    {
      name: '联盟广告',
      type: 'bar',
      stack: '总量',
      label: {
        show: true,
        position: 'insideRight',
      },
      data: [220, 182, 191, 234, 290, 330, 310],
    },
    {
      name: '视频广告',
      type: 'bar',
      stack: '总量',
      label: {
        show: true,
        position: 'insideRight',
      },
      data: [150, 212, 201, 154, 190, 330, 410],
    },
    {
      name: '搜索引擎',
      type: 'bar',
      stack: '总量',
      label: {
        show: true,
        position: 'insideRight',
      },
      data: [820, 832, 901, 934, 1290, 1330, 1320],
    },
  ],
};
