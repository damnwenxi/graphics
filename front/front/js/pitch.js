//这里面时判断点是不是在该图形里面，包含边框

//判断多边形
//求角度公式
function Polygonpitch(sx,sy,obj){
	//遍历所有的坐标
	//两个两个计算，要记得加起始点
	//计算和
	var stest = 0; 
	for(var i =0;i<obj.vertices.length-2;i+=2){
		//两个相邻的点
		var x1 = obj.vertices[i];
		var y1 = obj.vertices[i+1];
		var x2 = obj.vertices[i+2];
		var y2 = obj.vertices[i+3];
		//计算第一个点距离
		var d1 = Math.sqrt((x1-sx)*(x1-sx)+(y1-sy)*(y1-sy));
		//计算第二个点距离
		var d2 = Math.sqrt((x2-sx)*(x2-sx)+(y2-sy)*(y2-sy));
		//计算两个点的距离
		var d3 = Math.sqrt((x2-x1)*(x2-x1)+(y2-y1)*(y2-y1));
		//求夹角cos
		var cos = (d1*d1+d2*d2-d3*d3)/(2*d1*d2);
		//求角度
		var jc = Math.acos(cos);
		stest += jc; 
	}
	if(Math.abs(stest-3.14159*2) < 0.01 ){
		console.log("找到多边形");
		//对象obj
		return(obj);
	}
	else{
		return null;
	}
}

//判断直线
//求直线方程表达式
function StraightLinepitch(sx,sy,obj){
	//开始点
	var x1 = obj.spoint.px;
	var y1 = obj.spoint.py;
	//结束点
	var x2 = obj.epoint.px;
	var y2 = obj.epoint.py;
	//根据直线方程求解
	var stest = (y2-y1)/(x2-x1)*(sx-x1) -(sy-y1);
	
	if(Math.abs(stest) < 5){
		console.log("找到直线");
		//对象obj
		return(obj);
	}
	else{
		return null;
	}
}

//判别折线
function Brokenlinepitch(sx,sy,obj){
	return null;
}

//判别直角
function Rightanglepitch(sx,sy,obj){
	return null;
}


//判断圆形
//求圆心距离
function Circlepitch(sx,sy,obj){
	//圆心
	var rx = obj.center.px;
	var ry = obj.center.py;
	//半径
	var r = obj.radius;
	//根据圆心的距离求解
	var stest = Math.sqrt((rx-sx)*(rx-sx)+(ry-sy)*(ry-sy));
	
	if(Math.abs(stest) < r+1){
		console.log("找到圆形");
		//对象obj
		return(obj);
	}
	else{
		return null;
	}
}

//判别曲线
function Curvepitch(sx,sy,obj){
	return null;
}

//判断椭圆
//求判别式
function Ellipsepitch(sx,sy,obj){
	//椭圆圆心
	var rx = obj.center.px;
	var ry = obj.center.py;
	//鼠标点
	var x = obj.epoint.px;
	var y = obj.epoint.py;
	
	var X = Math.pow(Math.abs(x - rx), 2);
    var Y = Math.pow(Math.abs(y - ry), 2);


    var B = (Y + Math.sqrt(Math.pow(Y, 2) + 4 * Y * X)) / 2;
    var A = B + X;
    
    
	//椭圆长轴
	var a = Math.sqrt(A);
	//椭圆短轴
	var b = Math.sqrt(B);
	 
//	console.log(a);
//  console.log(b);
    
	//根据椭圆判别式
	var stest = (sx-rx)*(sx-rx)/(a*a)+(sy-ry)*(sy-ry)/(b*b);

	if(stest < 1){
		console.log("找到椭圆");
		//对象obj
		return(obj);
	}
	else{
		return null;
	}
}

//判别椭圆弧
function Elliparcpitch(sx,sy,obj){
	return null;
}

//判别矩形
//比较坐标即可
function Rectanglepitch(sx,sy,obj){
	//起始点
	var x1 = obj.spoint.px;
	var y1 = obj.spoint.py;
	//终止点
	var x2 = obj.epoint.px;
	var y2 = obj.epoint.py;
	
	if((x1<=sx&&sx<=x2&&y1<=sy&&sy<=y2)||(x1>=sx&&sx>=x2&&y1>=sy&&sy>=y2)){
		console.log("找到矩形");
		//对象obj
		return(obj);
	}
	else{
		return null;
	}
}

//判别圆角矩形
function Roundedrectanglepitch(sx,sy,obj){
	return null;
}

//判别圆弧
function Positivearcpitch(sx,sy,obj){
	return null;
}

