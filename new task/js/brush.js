


var ctx = getCTX("canvas");//获取画布
var type = null;//按钮类型
var parray = [];//存放点的数组
var index = 0;//数组下标
var objs = [];//画布所有对象的集合
//监听事件
// function mouseListner(){
var down_flag = false;//鼠标是否按下标识
$('canvas').mousedown(function(e){//鼠标按下时的事件
    //新建一个对象
    if(type != null){
        obj = createNewItem();
        obj.level = objs.length;//图元层次为当前图元数组中的下标层次。
        objs.push(obj);//放入objs
        down_flag = true;
        var ps = new Point();
        ps.px = e.clientX - 335;
        ps.py = e.clientY - 24;
        parray[index] = ps;
        index++;
        update();
    }

});
$('canvas').mouseup(function(e){//鼠标抬起事件
    if(type != null){
        down_flag = false;
        var ps = new Point();
        ps.px = e.clientX - 335;
        ps.py = e.clientY - 24;
        parray[index] = ps;
        index++;
        update();
        parray = [];//数组清空
        index = 0;//下标清空
    }

});

$('canvas').mousemove(function(e){//鼠标移动事件
    if(type != null){
        if (down_flag == true){
            var ps = new Point();
            ps.px = e.clientX - 335;
            ps.py = e.clientY - 24;
            parray[index] = ps;
            index++;
            update();
        }
    }



});




/*
元素属性更新
 */
function update() {
    // console.log(type);
    //每次更新采用对当前图元对象的属性更新
    switch (type) {
        case "straightLine"://更新直线
            // console.log(objs.length);
            objs[objs.length-1].spoint = parray[0];
            objs[objs.length-1].epoint = parray[parray.length-1];
            break;
		case "rightangle"://更新直角
		    // console.log(objs.length);
			objs[objs.length-1].spoint = parray[0];
			objs[objs.length-1].epoint = parray[parray.length-1];
		    break;
        case "circle"://更新圆
            // console.log(objs.length);
            objs[objs.length-1].center = parray[0];
            objs[objs.length-1].radius = odistance(parray[0],parray[parray.length-1]);
            break;
		case "Ellipse"://更新椭圆
		    // console.log(objs.length);
		    objs[objs.length-1].center = parray[0];
		    objs[objs.length-1].radius = odistance(parray[0],parray[parray.length-1]);
		    break;
		case "curve"://更新曲线
		    // console.log(objs.length);
			objs[objs.length-1].spoint = parray[parray.length-2];
			objs[objs.length-1].epoint = parray[parray.length-1];
		    break;
		case "rectangle"://更新矩形
		    // console.log(objs.length);
			objs[objs.length-1].spoint = parray[0];
			objs[objs.length-1].epoint = parray[parray.length-1];
		    break;
		case "roundedrectangle"://更新圆角矩形
		    // console.log(objs.length);
			objs[objs.length-1].spoint = parray[0];
			objs[objs.length-1].epoint = parray[parray.length-1];
		    break;
		case "positivearc"://更新正圆弧
		    // console.log(objs.length);
		    objs[objs.length-1].center = parray[0];
		    objs[objs.length-1].radius = odistance(parray[0],parray[parray.length-1]);
		    break;
    }
    //更新之后画布重绘
    rePaint();
}

/*
画布重绘
 */
function rePaint() {
    canvasClear();//画布清空
    console.log(objs);
    for (var i = 0 ; i < objs.length ; i++){
        objs[i].draw();
    }
}


//画笔选择
// var isSelect_flag = false;//是否已经选择标识;
function brush(item){//每一次按钮选择新建一个对象元素
    var items=document.getElementById(item);//查找元素
    if(item == type){//如果是当前一选中类型，颜色变浅，取消选中
        items.style.backgroundColor = "#f7de82";
        type = null;
    }else {
        if( type != null){//已有选中但换选别的类型
            var temp = document.getElementById(type);
            temp.style.backgroundColor = "#f7de82";//原本类型的颜色变浅
        }
        items.style.backgroundColor="#eccc27";//颜色加深
        switch (item) {//进行不同画笔，全局变量type类型进行改变
            case "straightLine":
                type = "straightLine";
                break;
			case "brokenline":
			    type = "brokenline";
			    break;
			case "rightangle":/*直角*/
			    type = "rightangle";
			    break;
			case "polygon":/*多边形*/
			    type = "polygon";
			    break;
            case "circle":
                type = "circle";
                break;
			case "Ellipse":
			    type = "Ellipse";
			    break;
			case "arc":/*圆弧*/
			    type = "arc";
			    break;
			case "elliparc":/*椭圆弧*/
			    type = "elliparc";
			    break;
			case "curve":
			    type = "curve";
			    break;
			case "roundedrectangle":/*圆角矩形*/
			    type = "roundedrectangle";
			    break;
			case "rectangle":
			    type = "rectangle";
			    break;
			case "positivearc":/*正圆弧*/
			    type = "positivearc";
			    break;
        }
    }
}


/*
获取画布
 */
function getCTX(id){
    var canvas_dom = document.getElementById(id);
    var ctx = canvas_dom.getContext("2d");
    return ctx;
}

/*
画布清空
 */
function canvasClear() {
    var c=document.getElementById("canvas");
    ctx.clearRect(0,0,c.width,c.height);
}


/*
新建对象
 */
function createNewItem() {
    switch (type) {//根据全部变量type进行对象的新建
        case "straightLine":
            return new Line();
            break;
		case "brokenline":
		    return new Brokenline();
		    break;
        case "circle":
            return new Circle();
            break;
		case "Ellipse":
		    return new Ellipse();
		    break;
		case "rightangle":
		    return new Rightangle();
		    break;	
		case "polygon":
		    return new Polygon();
		    break;	
		case "arc":
		    return new Arc();
		    break;	
		case "elliparc":
		    return new Elliparc();
		    break;	
		case "curve":
		    return new Curve();
		    break;	
		case "roundedrectangle":
		    return new Roundedrectangle();
		    break;	
		case "rectangle":
		    return new Rectangle();
		    break;	
		case "positivearc":
		    return new Positivearc();
		    break;	
		
    }
}

/*
父类（所有画布上的元素对象）
所有图元对象都继承该对象
 */
function Drawable() {
    this.level = 0;//元素层次，用于后续，带不同颜色的图元的刷新
    this.id = 0;//元素id
    this.color = "#000000";//元素颜色，默认颜色
    this.weight = 1;//元素宽度，默认图元线条宽度

}

/*
点对象
 */
function Point( px, py) {
    Drawable.apply(this);//继承父类
    this.px = arguments[0] ? arguments[0] :0;
    this.py = arguments[1] ? arguments[1] :0;

    /*
    点亮一个点
     */
    this.draw = function(){
        //绘制成矩形
        ctx.fillRect(this.px,this.py,1,1);
    }
}

/*
直线对象
 */
function Line() {
    Drawable.apply(this);//继承父类
    this.spoint = new Point();//起始点
    this.epoint = new Point();//终止点
    this.draw = function () {
            var pax = this.spoint.px;
            var pay = this.spoint.py;
            var pbx = this.epoint.px;
            var pby = this.epoint.py;
            var dx = pbx-pax;
            var dy = pby-pay;
            var x = pax;
            var y = pay;
            var eps;
            if(Math.abs(dx) > Math.abs(dy)){
                eps = Math.abs(dx);
            }else {
                eps = Math.abs(dy);
            }
            var xlincre = dx * 1.0 / eps;
            var ylincre = dy * 1.0 / eps;
            for(var i = 0 ; i <= eps ; i++){
                new Point(parseInt(x+0.5) , parseInt(y+0.5)).draw();//画点

                    x += xlincre;
                    y += ylincre;

            }
    }
}
/*曲线*/
function Curve() {
    Drawable.apply(this);//继承父类
	this.spoint = new Point();//起始点
	this.epoint = new Point();//终止点
	this.draw = function () {
		var pax = this.spoint.px;
		var pay = this.spoint.py;
		var pbx = this.epoint.px;
		var pby = this.epoint.py;
		var dx = pbx-pax;
		var dy = pby-pay;
		var x = pax;
		var y = pay;
		var eps;
		if(Math.abs(dx) > Math.abs(dy)){
			eps = Math.abs(dx);
		}else {
			eps = Math.abs(dy);
		}
		var xlincre = dx * 1.0 / eps;
		var ylincre = dy * 1.0 / eps;
		for(var i = 0 ; i <= eps ; i++){
		new Point(parseInt(x+0.5) , parseInt(y+0.5)).draw();//画点
		x += xlincre;
		y += ylincre;
		}
	}
	
}


/*直角*/
function Rightangle() {
    Drawable.apply(this);//继承父类
    this.spoint = new Point();//起始点
    this.epoint = new Point();//终止点
    this.draw = function () {
            var pax = this.spoint.px;
            var pay = this.spoint.py;
            var pbx = this.epoint.px;
            var pby = this.epoint.py;
            var dx = pbx-pax;
            var dy = pby-pay;
            var x = pax;
            var y = pay;
            var eps;
            if(Math.abs(dx) > Math.abs(dy)){
                eps = Math.abs(dx);
            }else {
                eps = Math.abs(dy);
            }
            var xlincre = dx * 1.0 / eps;
            var ylincre = dy * 1.0 / eps;
            for(var i = 0 ; i <= eps ; i++){
                new Point(parseInt(pax+0.5) , parseInt(y+0.5)).draw();//画点
				new Point(parseInt(x+0.5) , parseInt(pby+0.5)).draw();//画点
                    x += xlincre;
                    y += ylincre;

            }
    }
}
/*折线*/
/*多边形*/
/*圆弧*/
/*椭圆弧*/
/*圆角矩形*/
function Roundedrectangle() {
    Drawable.apply(this);//继承父类
    this.spoint = new Point();//起始点
    this.epoint = new Point();//终止点
    this.draw = function () {
            var pax = this.spoint.px;
            var pay = this.spoint.py;
            var pbx = this.epoint.px;
            var pby = this.epoint.py;
            var dx = pbx-pax;
            var dy = pby-pay;
            var x = pax;
            var y = pay;
            var eps;
            if(Math.abs(dx) > Math.abs(dy)){
                eps = Math.abs(dx);
            }else {
                eps = Math.abs(dy);
            }
            var xlincre = dx * 1.0 / eps;
            var ylincre = dy * 1.0 / eps;
			var kx=10*(Math.abs(pbx-pax))/(pbx-pax);
			var ky=10*(Math.abs(pby-pay))/(pby-pay);
			pax-=kx;pbx+=kx;pay-=ky;pby+=ky;
			Rounde(pax,pay,pbx,pby);
            for(var i = 0 ; i <= eps ; i++){
                new Point(parseInt(pax+0.5) , parseInt(y+0.5)).draw();//画点
				new Point(parseInt(x+0.5) , parseInt(pby+0.5)).draw();//画点
				new Point(parseInt(pbx+0.5) , parseInt(y+0.5)).draw();//画点
				new Point(parseInt(x+0.5) , parseInt(pay+0.5)).draw();//画点
                    x += xlincre;
                    y += ylincre;
            }
    }
}

/*矩形*/
function Rectangle() {
    Drawable.apply(this);//继承父类
    this.spoint = new Point();//起始点
    this.epoint = new Point();//终止点
    this.draw = function () {
            var pax = this.spoint.px;
            var pay = this.spoint.py;
            var pbx = this.epoint.px;
            var pby = this.epoint.py;
            var dx = pbx-pax;
            var dy = pby-pay;
            var x = pax;
            var y = pay;
            var eps;
            if(Math.abs(dx) > Math.abs(dy)){
                eps = Math.abs(dx);
            }else {
                eps = Math.abs(dy);
            }
            var xlincre = dx * 1.0 / eps;
            var ylincre = dy * 1.0 / eps;
            for(var i = 0 ; i <= eps ; i++){
                new Point(parseInt(pax+0.5) , parseInt(y+0.5)).draw();//画点
				new Point(parseInt(x+0.5) , parseInt(pby+0.5)).draw();//画点
				new Point(parseInt(pbx+0.5) , parseInt(y+0.5)).draw();//画点
				new Point(parseInt(x+0.5) , parseInt(pay+0.5)).draw();//画点
                    x += xlincre;
                    y += ylincre;

            }
    }
}

/*正圆弧*/
function Positivearc() {
    this.center = new Point();//圆心
    this.radius = 0;//半径
    this.draw = function () {
        var cx = this.center.px;//圆心x坐标
        var cy = this.center.py;//圆心y坐标
        var da = 1.0 / (this.radius+1);
        var radin = Math.PI/4;//1/8弧即1/4pi
        var steps = parseInt(radin / da);
        var x = this.radius*Math.cos(0);
        var y = this.radius*Math.sin(0);
        for(var i = 0 ; i <=  steps; i++){
            new Point(parseInt(x+cx) , parseInt(-y+cy)).draw();//画点2
            new Point(parseInt(-x+cx) , parseInt(-y+cy)).draw();//画点4
            new Point(parseInt(y+cx) , parseInt(-x+cy)).draw();//画点7
            new Point(parseInt(-y+cx) , parseInt(-x+cy)).draw();//画点8
            x -= y*da ;
            y += x*da;
        }
    }
}

/*圆弧*/
/*
椭圆
*/
function Ellipse() {
    this.center = new Point();//圆心
    this.radius = 0;//半径
    this.draw = function () {
        var cx = this.center.px;//圆心x坐标
        var cy = this.center.py;//圆心y坐标
        var da = 1.0 / (this.radius+1);
        var radin = Math.PI/4;//1/8弧即1/4pi
        var steps = parseInt(radin / da);
        var x = this.radius*Math.cos(0);
        var y = this.radius*Math.sin(0);
        for(var i = 0 ; i <=  steps; i++){
            new Point(parseInt(x+cx) , parseInt(y+cy)).draw();//画点1
            new Point(parseInt(x+cx) , parseInt(-y+cy)).draw();//画点2
            new Point(parseInt(-x+cx) , parseInt(y+cy)).draw();//画点3
            new Point(parseInt(-x+cx) , parseInt(-y+cy)).draw();//画点4
            new Point(parseInt(y+cx) , parseInt(x+cy)).draw();//画点5
            new Point(parseInt(-y+cx) , parseInt(x+cy)).draw();//画点6
            new Point(parseInt(y+cx) , parseInt(-x+cy)).draw();//画点7
            new Point(parseInt(-y+cx) , parseInt(-x+cy)).draw();//画点8
            x -= y*da ;
            y += x*da;
        }
    }
}

/*
圆对象
 */
function Circle() {
    this.center = new Point();//圆心
    this.radius = 0;//半径
    this.draw = function () {
        var cx = this.center.px;//圆心x坐标
        var cy = this.center.py;//圆心y坐标
		
        var da = 1.0 / (this.radius+1);
        var radin = Math.PI/4;//1/8弧即1/4pi
        var steps = parseInt(radin / da);
        var x = this.radius*Math.cos(0);
        var y = this.radius*Math.sin(0);
        for(var i = 0 ; i <=  steps; i++){
            new Point(parseInt(x+cx) , parseInt(y+cy)).draw();//画点1
            new Point(parseInt(x+cx) , parseInt(-y+cy)).draw();//画点2
            new Point(parseInt(-x+cx) , parseInt(y+cy)).draw();//画点3
            new Point(parseInt(-x+cx) , parseInt(-y+cy)).draw();//画点4
            new Point(parseInt(y+cx) , parseInt(x+cy)).draw();//画点5
            new Point(parseInt(-y+cx) , parseInt(x+cy)).draw();//画点6
            new Point(parseInt(y+cx) , parseInt(-x+cy)).draw();//画点7
            new Point(parseInt(-y+cx) , parseInt(-x+cy)).draw();//画点8
            x -= y*da ;
            y += x*da;
        }
    }
}

/*
求两个点直接的欧式距离
 */
function odistance(p1 , p2) { 
    // console.log(p1.px);
    var dx = Math.pow(Math.abs(p1.px - p2.px),2);
    var dy = Math.pow(Math.abs(p1.py - p2.py),2);
    return Math.sqrt(dx+dy);
}

/*圆角*/
function Rounde(ax,ay,bx,by){
	this.radius = 10;//半径
	var cx = (ax+bx)/2;//圆心x坐标
	var cy = (ay+by)/2;//圆心y坐标
		
	var da = 1.0 / (10);
	var radin = Math.PI/4;//1/8弧即1/4pi
	var steps = parseInt(radin / da);
	var x = this.radius*Math.cos(0);
	var y = this.radius*Math.sin(0);
	var dx=Math.abs(bx-ax)/2-10;
	var dy=Math.abs(by-ay)/2-10;
	
	cx+=dx;cy+=dy;
	for(var i = 0 ; i <=  10; i++){
		new Point(parseInt(x+cx) , parseInt(y+cy)).draw();//画点1
		new Point(parseInt(y+cx) , parseInt(x+cy)).draw();//画点5
		x -= y*da;
		y += x*da;}
			
	cx = (ax+bx)/2;cy = (ay+by)/2;
	x = this.radius*Math.cos(0);y = this.radius*Math.sin(0);
	cx+=dx;cy-=dy;
	for(var i = 0 ; i <=  10; i++){	
		new Point(parseInt(x+cx) , parseInt(-y+cy)).draw();//画点2
		new Point(parseInt(y+cx) , parseInt(-x+cy)).draw();//画点7
		x -= y*da;
		y += x*da;}
			
	cx = (ax+bx)/2;cy = (ay+by)/2;
	x = this.radius*Math.cos(0);y = this.radius*Math.sin(0);
	cx-=dx;cy+=dy;
	for(var i = 0 ; i <=  10; i++){	
		new Point(parseInt(-x+cx) , parseInt(y+cy)).draw();//画点3
		new Point(parseInt(-y+cx) , parseInt(x+cy)).draw();//画点6
		x -= y*da;
		y += x*da;}
			
	cx = (ax+bx)/2;cy = (ay+by)/2;
	x = this.radius*Math.cos(0);y = this.radius*Math.sin(0);
	cx-=dx;cy-=dy;
	for(var i = 0 ; i <=  10; i++){	
		new Point(parseInt(-x+cx) , parseInt(-y+cy)).draw();//画点4
		new Point(parseInt(-y+cx) , parseInt(-x+cy)).draw();//画点8
		x -= y*da;
		y += x*da;}
	
}