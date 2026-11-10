// Replace all examples after researching the actual trip. IDs must remain stable on updates.
window.TRIP = {
  id: 'replace-with-unique-trip-id',
  title: '旅行小站 · 模板预览',
  subtitle: '示例日期 · 两天一晚',
  notice: '以下是虚构模板数据，实际出发前请替换为经过核实的行程。',
  overview: '示例为会议与自由活动组合，地点、时间和耗时均为假设。',
  weather: '天气待核实。出发前根据目的地的最新短期预报调整衣物。',
  days: [
    {
      id: 'day1', label: '第一天', heading: '抵达与自由活动',
      events: [
        {id: 'arrival', time: '上午', title: '抵达并寄存行李', text: '车次、住宿和交通时间待补充。'},
        {id: 'walk', time: '下午', title: '街区步行', text: '路线和时间均为示例，地图入口待核实。', route: {origin:'地点 A', destination:'地点 B', mode:'步行', duration:'待估算', map:''}, task:'预约或安排', alternatives:['街区短线','室内备选']}
      ]
    },
    {
      id: 'day2', label: '第二天', heading: '会议与返程',
      events: [
        {id: 'meeting', time:'上午', title:'参加会议', text:'会场和签到时间待确认。', task:'确认会场'},
        {id: 'departure', time:'下午', title:'前往车站', text:'以实际车票倒推时间。', route:{origin:'住宿地点',destination:'车站',mode:'公共交通',duration:'待估算',map:''}}
      ]
    }
  ],
  packing: [
    {id:'documents',category:'证件与随身',label:'身份证件、交通票和住宿信息'},
    {id:'devices',category:'证件与随身',label:'手机、充电器和常用药'},
    {id:'clothes',category:'衣物',label:'换洗衣物与舒适步行鞋，数量按行程调整'},
    {id:'weather',category:'衣物',label:'按最新预报准备外套或雨具'}
  ],
  food: [{id:'meal1',day:'day1',name:'本地餐食（待选择）',time:'18:00',text:'选择餐厅并核对营业时间。',map:''}]
};
