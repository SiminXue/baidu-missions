/* 数据格式演示
var aqiSourceData = {
  "北京": {
    "2016-01-01": 10,
    "2016-01-02": 10,
    "2016-01-03": 10,
    "2016-01-04": 10
  }
};
*/

// 以下两个函数用于随机模拟生成测试数据
function getDateStr(dat) {
  var y = dat.getFullYear();
  var m = dat.getMonth() + 1;
  m = m < 10 ? '0' + m : m;
  var d = dat.getDate();
  d = d < 10 ? '0' + d : d;
  return y + '-' + m + '-' + d;
}
function randomBuildData(seed) {
  var returnData = {};
  var dat = new Date("2016-01-01");
  var datStr = ''
  for (var i = 1; i < 92; i++) {
    datStr = getDateStr(dat);
    returnData[datStr] = Math.ceil(Math.random() * seed);
    dat.setDate(dat.getDate() + 1);
  }
  return returnData;
}

var aqiSourceData = {
  "北京": randomBuildData(500),
  "上海": randomBuildData(300),
  "广州": randomBuildData(200),
  "深圳": randomBuildData(100),
  "成都": randomBuildData(300),
  "西安": randomBuildData(500),
  "福州": randomBuildData(100),
  "厦门": randomBuildData(100),
  "沈阳": randomBuildData(500)
};

// 用于渲染图表的数据
var chartData = {};

// 记录当前页面的表单选项
var pageState = {
  nowSelectCity: -1,
  nowGraTime: "day"
}

/**
 * 渲染图表
 */
function renderChart() {
  // console.log(chartData);
  var r,g,b,color,height,width,rect = '';
  var chart = document.getElementsByClassName('aqi-chart-wrap');
  for (var item in chartData){
    r = Math.floor(Math.random()*255);
    g = Math.floor(Math.random()*255);
    b = Math.floor(Math.random()*255);
    color = 'rgb('+r+','+g+','+b+')';
    height = chartData[item];
    if(pageState.nowGraTime == 'day'){
      width = '20px';
    }else if(pageState.nowGraTime == 'week'){
      width = '60px';
    }else{
      width = '100px';
    }
    rect +='<div title=\''+item+':'+height+'\'style=\'height:'+height+'px;width:'+width+';background-color:'+color+'\'></div>'
  }
  chart[0].innerHTML = rect;
}

/**
 * 日、周、月的radio事件点击时的处理函数
 */
function graTimeChange(type) {
  // 确定是否选项发生了变化 
  if(pageState.nowGraTime == type){
    return;
  }else{
    pageState.nowGraTime = type;
  }
  // 设置对应数据
  initAqiChartData();

  // 调用图表渲染函数
  renderChart();
}

/**
 * select发生变化时的处理函数
 */
function citySelectChange(city) {
  // 确定是否选项发生了变化 
  if(pageState.nowSelectCity == city){
    return;
  }else{
    pageState.nowSelectCity = city;
  }
  // 设置对应数据
  initAqiChartData();
  // 调用图表渲染函数
  renderChart();
}

/**
 * 初始化日、周、月的radio事件，当点击时，调用函数graTimeChange
 */
function initGraTimeForm() {
  var input = document.getElementsByName('gra-time');
  for (var i = 0; i < input.length; i++) {
    input[i].addEventListener("change",function(){
    graTimeChange(this.value);
  })  
  }

  
}

/**
 * 初始化城市Select下拉选择框中的选项
 */
function initCitySelector() {
  // 读取aqiSourceData中的城市，然后设置id为city-select的下拉列表中的选项
  var option = '';
  for (var city in aqiSourceData) {
    option = option+"<option>"+city+"</option>"
  }
  var citySelect = document.getElementById('city-select');
  citySelect.innerHTML = option;

  citySelectChange(citySelect.value);
  // 给select设置事件，当选项发生变化时调用函数citySelectChange
  citySelect.addEventListener("change", function(event){
    citySelectChange(this.value);  
  })

}

/**
 * 初始化图表需要的数据格式
 */
function initAqiChartData() {
  // 将原始的源数据处理成图表需要的数据格式
  // 处理好的数据存到 chartData 中
  var nowCity = aqiSourceData[pageState.nowSelectCity];
  if(pageState.nowGraTime == 'day'){
    chartData = nowCity;
  }else if (pageState.nowGraTime == 'week') {
    chartData = {};
    var week = 0,weekSum = 0,weekday,dayNum = 0;
    for (var everyday in nowCity) {
      dayNum++;
      weekSum += nowCity[everyday];
      weekday = new Date(everyday).getDay();
      if(weekday == 0){
        week++;
        chartData['第'+week+'周'] = Math.floor(weekSum/dayNum);
        weekSum = 0;
        dayNum = 0;
      }
    }
    //不满一周的情况
    if(dayNum != 0){
      week++;
      chartData['第'+week+'周'] = Math.floor(weekSum/dayNum);
    }
  }else{
    chartData = {};
    var month = 0,dayNum =0,monthNum,monthSum = 0;
    for (var everyday in nowCity){
      dayNum++;
      monthNum = new Date(everyday).getMonth();
      monthSum += nowCity[everyday];
      if(month != monthNum){
        monthSum -= nowCity[everyday];
        dayNum--;
        chartData[month*1+1+'月份'] = Math.floor(monthSum/dayNum);
        dayNum = 1;
        monthSum = nowCity[everyday];
        month = monthNum;
      }
    }
    //不满一个月的情况
    if(dayNum != 0){
      chartData[month*1+1+'月份'] = Math.floor(monthSum/dayNum);
    }
  }

}

/**
 * 初始化函数
 */
function init() {
  initGraTimeForm()
  initCitySelector();
  initAqiChartData();
}

init();