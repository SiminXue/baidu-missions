

// var inputValue = document.getElementsByName('inputValue')[0].value;

var arrayValue = [];
//左侧入
var leftIn = function(){
	var inputValue = document.getElementsByName('inputValue')[0].value;
	if(inputValue != ''){
		arrayValue.unshift(inputValue);
		show();
	}
	
}
//右侧入
var rigthIn = function(){
	var inputValue = document.getElementsByName('inputValue')[0].value;
	if(inputValue != ''){
		arrayValue.push(inputValue);
		show();
	}
}

//左侧出
var leftOut = function(){
	alert("您从左侧删除了"+arrayValue.shift());
	show();
}
//右侧出
var rightOut = function(){
	alert("您从右侧删除了"+arrayValue.pop());
	show();
}
var remove = function (target){
	var index = -1;
	for (var i = 0; i < arrayValue.length; i++) {
		if(arrayValue[i] == target){
			index = i;
		}
	}
	arrayValue.splice(index,1);
	show();
}
//监听事件
function addLister(node,type){
	node.addEventListener('click',type);
}
//显示结果
function show(){
	var innerHTML = '';
	for (var i = 0; i < arrayValue.length; i++) {
		innerHTML = innerHTML +'<div><span>'+arrayValue[i]+'</span></div>';
	}
	document.getElementsByClassName('quene')[0].innerHTML = innerHTML;

}
//初始化
function init(){
	var left_in = document.getElementById('left-in');
	var right_in = document.getElementById('right-in');
	var left_out = document.getElementById('left-out');
	var right_out = document.getElementById('right-out');
	var quene = document.getElementsByClassName('quene')[0];

	quene.addEventListener('click',function(event){
		remove(event.target.innerHTML);
	})
	
	var defaultValue = quene.getElementsByTagName('span');
	for (var i = 0; i < defaultValue.length; i++) {
		arrayValue.push(defaultValue[i].innerHTML);;
	}
	
	addLister(left_in,leftIn);
	addLister(right_in,rigthIn);
	addLister(left_out,leftOut);
	addLister(right_out,rightOut);

}
init();