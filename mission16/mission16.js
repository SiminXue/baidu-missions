/**
 * aqiData，存储用户输入的空气指数数据
 * 示例格式：
 * aqiData = {
 *    "北京": 90,
 *    "上海": 40
 * };
 */
var aqiData = {};

/**
 * 从用户输入中获取数据，向aqiData中增加一条数据
 * 然后渲染aqi-list列表，增加新增的数据
 */
function addAqiData() {
	var city = document.getElementById('aqi-city-input').value.trim();
	var quality = document.getElementById('aqi-value-input').value.trim();
	if (city =='') {
		alert("请填写城市名称！");
		return;
	}
	var re=/[a-zA-Z\u4e00-\u9fa5]+$/;
	if(!re.test(city)){
		alert("城市名称必须是中英文字符！");
		return;
	}
	if (quality =='') {
		alert("请填写空气指数！");
		return;
	}	
	if(isNaN(quality)){
		alert("空气指数必须为整数！");
		return;
	}
	aqiData[city] = quality;
	// console.log(aqiData);
}

/**
 * 渲染aqi-table表格
 */
function renderAqiList() {
	
	var table = document.getElementById('aqi-table');
	var thead = "<tr><td>城市</td><td>空气质量</td><td>操作</td></tr>";
	var tbody = "";

	for(var i in aqiData){
		tbody =tbody + "<tr><td>"+i+"</td><td>"+aqiData[i]+"</td><td><button>删除</button></td></tr>"
	}
	var tableInner = thead + tbody;
	table.innerHTML = isEmpty(aqiData) ? '': tableInner;
	
}

/**
 * 点击add-btn时的处理逻辑
 * 获取用户输入，更新数据，并进行页面呈现的更新
 */
function addBtnHandle() {
  addAqiData();
  renderAqiList();
}

/**
 * 点击各个删除按钮的时候的处理逻辑
 * 获取哪个城市数据被删，删除数据，更新表格显示
 */
function delBtnHandle(city) {
  // do sth.
  delete aqiData[city];
  renderAqiList();
}

function init() {
	
  // 在这下面给add-btn绑定一个点击事件，点击时触发addBtnHandle函数
	document.getElementById('add-btn').onclick = function (){
		addBtnHandle();
	}
  // 想办法给aqi-table中的所有删除按钮绑定事件，触发delBtnHandle函数
  	document.getElementById("aqi-table").addEventListener("click", function(event){
  		if(event.target.nodeName.toLowerCase() === 'button'){
  			var city = event.target.parentNode.parentNode.firstChild.innerHTML;
  			delBtnHandle(city);
  		}
  	})
}

/*
 *
 检测对象是否是空对象(不包含任何可读属性)。
 *
 方法只既检测对象本身的属性，不检测从原型继承的属性。
 */
function isEmpty(obj){
    for(var name in obj){
        if(obj.hasOwnProperty(name)){
            return false;
        }
    }
    return true;
};

init();