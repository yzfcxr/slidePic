window.onload = function(){
	prepareSlide();
	goOn("nav",0);
}
//图片滚动
function slide(elementId,to,interval,callback){
	if(!document.getElementById(elementId)) alert(elementId);
	var elem = document.getElementById(elementId);
	elem.style.position = "absolute";
	if(!elem.style.left) elem.style.left = "0px";
	if(elem.movement) clearTimeout(elem.movement);
	var x = parseInt(elem.style.left);
	var step = function(){
	if(x==to){
		clearInterval(elem.intervalId1);
		if(callback)
			callback();
	}
	if(x<to){
		x = x+Math.ceil((to-x)/10);
		elem.style.left = x+"px";
		}
	if(x>to){
		x = x-Math.ceil((x-to)/10);
		elem.style.left = x+"px";
	}
}
	elem.intervalId1 = setInterval(step,interval);
}

function stopToGo(index){
			var nav = document.getElementsByClassName("nav");
			var currentPic = document.getElementById("slide");
			//点击使图片移动的位置
			var picDestination = -index*1224;
			//清除图片移动的定时器
			clearInterval(currentPic.intervalId1);
			for(var i=0;i<nav.length;i++){
			//点击，清除所有的进度条的定时器
			clearInterval(nav[i].getElementsByClassName("prcss")[0].intervalId2);
			/*进度条的定时器被清除后，正在走
			的进度条停下来了，我们把它的进
			度初始化即把长度给清零。*/
			nav[i].getElementsByClassName("prcss")[0].style.width = "0px";
			}
			slide("slide",picDestination,1,function(){
				goOn("nav",index);
			});
		}

//点击事件
function prepareSlide(){
	var nav = document.getElementsByClassName("nav");
	var currentPic = document.getElementById("slide");
		nav[0].onclick = function(){
			stopToGo(0);
		}
		nav[1].onclick = function(){
			stopToGo(1);
		}
		nav[2].onclick = function(){
			stopToGo(2);
		}
		nav[3].onclick = function(){
			stopToGo(3);
		}
		nav[4].onclick = function(){
			stopToGo(4);
		}
		nav[5].onclick = function(){
			stopToGo(5);
		}
}
//进度条
function moveTime(elem,to,interval,callback){
	if(!elem.style.width) elem.style.width = "0px";
	var x = parseInt(elem.style.width);
	var steplength = 5;
	var step = function(){
	if(x == to){
		
		clearInterval(elem.intervalId2);
		// alert(elem.intervalId2);
		elem.style.width = "0px";
		if(callback){
			callback();
		}
	}
	if(x<to){
		x = x+steplength;
		elem.style.width = x+"px";
	}
	if(x>to){
		x = to;
		elem.style.width = x+"px";
	}
}
	elem.intervalId2 = setInterval(step,interval);
	// alert(elem.intervalId2);
}

//位移动画加进度条
function goOn(navclass,index,callback){
	//形参index居然可以被孙函数利用修改
	var navs = document.getElementsByClassName(navclass);
	/* 找到序号为index的导航块 */
	var currentTimeBar = navs[index].getElementsByClassName("prcss")[0];
	/* currentPic是要想到当前图片，图片需移动的距离 */
	var currentPic = -(index+1)*1224;
	/* 当图片移动到了尽头，给它赋值0让它回到首张图片 */
	if(currentPic == -7344){currentPic=0;}
	moveTime(currentTimeBar,204,40,function(){
		slide("slide",currentPic,1,function(){
			index+=1;
			/* 当序号超过了导航块总数时，给它再赋值到首位导航块 */
			if(index==6){index=0;}
			goOn("nav",index);
		});
	});

}	

// function prepareTime(){
// 	time("nav",0);
// 	time("nav",1);
// 	time("nav",2);
// 	time("nav",3);
// 	time("nav",4);
// 	time("nav",5);
// }
