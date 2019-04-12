
var ctx = getCTX("canvas");     //获取画布
var type = null;                //按钮类型
var parray = [];                //存放当前绘制对象的所有点
var index = 0;                  //数组下标
var objs = [];                  //画布所有对象的集合

// 画布左上角相对于client的坐标
var of_p = $("#canvas").offset();
var of_left = of_p.left;
var of_top = of_p.top;
console.log(of_left,of_top);

/**
 *  鼠标监听事件，不同对象对不同的鼠标事件有不同的反应
 * */

//鼠标是否按下标识
var down_flag = false;

//鼠标按下时的事件
$('canvas').mousedown(function (e) {
    /** 
     * event.button 属性判断鼠标按键类型 
     * 0:左键
     * 1:中键
     * 2:右键
    */

    // 鼠标左键按下走这里
    if (type != null && e.button == 0) {
        var last = objs[objs.length-1];
        switch (type) {
            
            case "polygon":
                // 判断上一个多边形是否绘制结束
                if(last.doneFlag){
                    var obj = createNewItem();
                    objs.push(obj);
                }
                var ps = new Point();
                ps.px = e.clientX - of_left;
                console.log(ps);
                ps.py = e.clientY - of_top;
                if(objs[objs.length - 1].vertices.length<3){
                    objs[objs.length - 1].vertices.push(e.clientX - of_left,e.clientY - of_top);
                }
                objs[objs.length - 1].vertices.push(e.clientX - of_left,e.clientY - of_top);
                // console.log(objs[objs.length - 1].vertices);
                parray[index] = ps;
                index++;
                update();
                break;
            case "straightLine":
            case "brokenline":
            case "rightangle":
            case "circle":
            case "Ellipse":
            case "elliparc":
            case "curve":
            case "rectangle":
            case "roundedrectangle":
            case "positivearc":
                obj = createNewItem();//
                obj.level = objs.length;//图元层次为当前图元数组中的下标层次。
                objs.push(obj);//放入objs
                down_flag = true;
                var ps = new Point();
                ps.px = e.clientX - of_left;
                ps.py = e.clientY - of_top;
                //if(parray_ini.length==0){
                //	parray_ini[0]=ps;
                //}
                parray[index] = ps;
                index++;
                update();
                break;
        }
    }
    // 鼠标右键按下走这里
    if (type != null && e.button == 2) {
        switch (type) {
            // 多边形，鼠标右键按下结束
            case "polygon":
                var ex = objs[objs.length-1].vertices[0];
                var ey = objs[objs.length-1].vertices[1];
                objs[objs.length-1].vertices.push(ex,ey); 

                // var ps = new Point();
                // ps.px = e.clientX;
                // ps.py = e.clientY - 130;
                // //parray_init[0] = parray_ini[0];
                // parray[index] = ps;
                // index++;
                update();
                objs[objs.length-1].doneFlag = true;

                // parray = [];//数组清空
                // //parray_ini = [];//数组清空
                // //parray_init = [];//数组清空
                // index = 0;//下标清空
                break;
            case "brokenline": 
                break;
        }
    }
});

//鼠标抬起事件
$('canvas').mouseup(function (e) {
    if (type != null && e.button == 0) {
        switch (type) {
            
            case "polygon":
                down_flag = false;
                var ps = new Point();
                ps.px = e.clientX - of_left;
                ps.py = e.clientY - of_top;
                // parray[index] = ps;
                // index++;
                // update();
                // parray = [];//数组清空
                // index = 0;//下标清空

                // obj = createNewItem();//
                // obj.level = objs.length;//图元层次为当前图元数组中的下标层次。
                // objs.push(obj);//放入objs
                // down_flag = true;
                // var ps = new Point();
                // ps.px = e.clientX;
                // ps.py = e.clientY - 130;
                // parray[index] = ps;
                // index++;
                // update();
                break;
            case "brokenline":
            case "straightLine":
            case "rightangle":
            case "circle":
            case "Ellipse":
            case "elliparc":
            case "curve":
            case "rectangle":
            case "roundedrectangle":
            case "positivearc":
                down_flag = false;
                var ps = new Point();
                ps.px = e.clientX - of_left;
                ps.py = e.clientY - of_top;
                parray[index] = ps;
                index++;
                update();
                parray = [];//数组清空
                index = 0;//下标清空
                break;
        }
    }

});

// 鼠标移动事件
$('canvas').mousemove(function (e) {
    if (type != null && e.button == 0) {
        switch (type) {

            // case条件顺序不能改变，改变会出错
            
            case "polygon":
                // var lenOfVertices = objs[objs.length-1].vertices.length;
                // var ps = new Point();
                // ps.px = e.clientX;
                // ps.py = e.clientY - 130;
                // parray[index] = ps;
                // index++;
                // update();
                // objs[objs.length-1].vertices[lenOfVertices-1] = ps;
                break;
            case "straightLine":
            case "brokenline":    
            case "rightangle":
            case "circle":
            case "Ellipse":
            case "elliparc":
            case "curve":
            case "rectangle":
            case "roundedrectangle":
            case "positivearc":
                if (down_flag == true) {
                    var ps = new Point();
                    ps.px = e.clientX - of_left;
                    ps.py = e.clientY - of_top;
                    parray[index] = ps;
                    index++;
                    update();
                }
                break;
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
            objs[objs.length - 1].spoint = parray[0];
            objs[objs.length - 1].epoint = parray[parray.length - 1];
            break;
        case "brokenline"://更新折线
            // console.log(objs.length);
            objs[objs.length - 1].spoint = parray[0];
            objs[objs.length - 1].epoint = parray[parray.length - 1];
            break;
        case "polygon":/*多边形*/
            // console.log(objs.length);
            //if(parray_init.length!=0){
            //	objs[objs.length-1].init = parray_init[0];}
            // 更新多边形最后一条边 具体未实现
            objs[objs.length - 1].spoint = parray[0];
            objs[objs.length - 1].epoint = parray[parray.length - 1];
            break;
        case "rightangle"://更新直角
            // console.log(objs.length);
            objs[objs.length - 1].spoint = parray[0];
            objs[objs.length - 1].epoint = parray[parray.length - 1];
            break;
        case "circle"://更新圆
            // console.log(objs.length);
            objs[objs.length - 1].center = parray[0];
            objs[objs.length - 1].radius = odistance(parray[0], parray[parray.length - 1]);
            break;
        case "Ellipse"://更新椭圆
            // console.log(objs.length);
            objs[objs.length - 1].center = parray[0];
            objs[objs.length - 1].epoint = parray[parray.length - 1];
            break;
        case "elliparc"://更新椭圆弧
            // console.log(objs.length);
            objs[objs.length - 1].center = parray[0];
            objs[objs.length - 1].epoint = parray[parray.length - 1];
            break;
        case "curve"://更新曲线
            // console.log(objs.length);
            objs[objs.length - 1].spoint = parray[parray.length - 2];
            objs[objs.length - 1].epoint = parray[parray.length - 1];
            break;
        case "rectangle"://更新矩形
            // console.log(objs.length);
            objs[objs.length - 1].spoint = parray[0];
            objs[objs.length - 1].epoint = parray[parray.length - 1];
            break;
        case "roundedrectangle"://更新圆角矩形
            // console.log(objs.length);
            objs[objs.length - 1].spoint = parray[0];
            objs[objs.length - 1].epoint = parray[parray.length - 1];
            break;
        case "positivearc"://更新正圆弧
            // console.log(objs.length);
            objs[objs.length - 1].center = parray[0];
            objs[objs.length - 1].radius = odistance(parray[0], parray[parray.length - 1]);
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

    // 鼠标松开时才打印，绘图中不打印，打印画布最后一个对象，方便调试
    if (!down_flag) {
        console.log(objs);
    }

    for (var i = 0; i < objs.length; i++) {
        objs[i].draw();
    }
}


//画笔选择
// var isSelect_flag = false;//是否已经选择标识;
//每一次按钮选择新建一个对象元素
function brush(item) {
    console.log(item);
    var items = document.getElementById(item);//查找元素
    //如果是当前一选中类型，颜色变浅，取消选中
    if (item == type) {
        items.style.backgroundColor='#fff';
        type = null;
    } else {
        if (type != null) {//已有选中但换选别的类型
            var temp = document.getElementById(type);
            temp.style.backgroundColor='#fff'//原本类型的颜色变浅
        }
        items.style.backgroundColor='#ddd'//颜色加深

        // 选择不同画笔，全局变量type类型进行改变
        switch (item) {
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
                var obj = createNewItem();//
                objs.push(obj);
                break;
            case "circle":
                type = "circle";
                break;
            case "Ellipse":
                type = "Ellipse";
                break;
            case "elliparc"://更新椭圆弧	
                type = "elliparc";
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
function getCTX(id) {
    var canvas_dom = document.getElementById(id);
    var ctx = canvas_dom.getContext("2d");
    return ctx;
}

/*
画布清空
 */
function canvasClear() {
    var c = document.getElementById("canvas");
    ctx.clearRect(0, 0, c.width, c.height);
}


/*
新建对象
 */
function createNewItem() {
    //根据全部变量type进行对象的新建
    switch (type) {
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
        case "elliparc":
            return new Elliparc();
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
    this.level = 0;         //元素层次，用于后续，带不同颜色的图元的刷新
    this.id = 0;            //元素id
    this.color = "#000000"; //元素颜色，默认颜色黑色
    this.weight = 1;        //元素宽度，默认图元线条宽度
    this.vertices = [];     // 数组对象，存放图形顶点
    this.edgepoints = new Array();
}

/*
点对象
 */
function Point(px, py) {
    //继承父类
    Drawable.apply(this);

    // arguments 属性获取当前方法的参数
    this.px = arguments[0] ? arguments[0] : 0;
    this.py = arguments[1] ? arguments[1] : 0;

    /*
    点亮一个点
     */
    this.draw = function () {
        //绘制成矩形
        ctx.fillRect(this.px, this.py, 1, 1);
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
        var dx = pbx - pax;
        var dy = pby - pay;
        var x = pax;
        var y = pay;
        var eps;
        if (Math.abs(dx) > Math.abs(dy)) {
            eps = Math.abs(dx);
        } else {
            eps = Math.abs(dy);
        }
        var xlincre = dx * 1.0 / eps;
        var ylincre = dy * 1.0 / eps;
        for (var i = 0; i <= eps; i++) {
            var tp = new Point(parseInt(x + 0.5), parseInt(y + 0.5));
            tp.draw();//画点
            // if (down_flag == false) {
            //     this.edgepoints.push(tp);
            // }
            x += xlincre;
            y += ylincre;

        }
    }
}

/*
折线对象
*/
function Brokenline() {
    Drawable.apply(this);//继承父类
    this.spoint = new Point();//起始点
    this.epoint = new Point();//终止点
    this.draw = function () {
        var pax = this.spoint.px;
        var pay = this.spoint.py;
        var pbx = this.epoint.px;
        var pby = this.epoint.py;
        var dx = pbx - pax;
        var dy = pby - pay;
        var x = pax;
        var y = pay;
        var eps;
        if (Math.abs(dx) > Math.abs(dy)) {
            eps = Math.abs(dx);
        } else {
            eps = Math.abs(dy);
        }
        var xlincre = dx * 1.0 / eps;
        var ylincre = dy * 1.0 / eps;
        for (var i = 0; i <= eps; i++) {
            new Point(x, y).draw();//画点

            x += xlincre;
            y += ylincre;

        }
    }
}

/*
多边形对象
*/
function Polygon() {
    Drawable.apply(this);       //继承父类
    this.edges = new Array();
    this.doneFlag = false;

    this.draw = function () {
        console.log("画了多边形");
        for (var j = 0; j < this.vertices.length; j += 2) {
            var pax = this.vertices[j];
            var pay = this.vertices[j+1];
            var pbx = this.vertices[j+2];
            var pby = this.vertices[j+3];
            var dx = pbx - pax;
            var dy = pby - pay;
            var x = pax;
            var y = pay;
            var eps;

            if (Math.abs(dx) > Math.abs(dy)) {
                eps = Math.abs(dx);
            } else {
                eps = Math.abs(dy);
            }
            var xlincre = dx * 1.0 / eps;
            var ylincre = dy * 1.0 / eps;
            for (var i = 0; i <= eps; i++) {
                var tp = new Point(parseInt(x + 0.5), parseInt(y + 0.5));
                tp.draw();//画点
                // if (down_flag == false) {
                //     this.edgepoints.push(tp);
                // }
                x += xlincre;
                y += ylincre;
            }
        };
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
        var dx = pbx - pax;
        var dy = pby - pay;
        var x = pax;
        var y = pay;
        var eps;
        if (Math.abs(dx) > Math.abs(dy)) {
            eps = Math.abs(dx);
        } else {
            eps = Math.abs(dy);
        }
        var xlincre = dx * 1.0 / eps;
        var ylincre = dy * 1.0 / eps;
        for (var i = 0; i <= eps; i++) {
            new Point(parseInt(x + 0.5), parseInt(y + 0.5)).draw();//画点
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
        var dx = pbx - pax;
        var dy = pby - pay;
        var x = pax;
        var y = pay;
        var eps;
        if (Math.abs(dx) > Math.abs(dy)) {
            eps = Math.abs(dx);
        } else {
            eps = Math.abs(dy);
        }
        var xlincre = dx * 1.0 / eps;
        var ylincre = dy * 1.0 / eps;
        for (var i = 0; i <= eps; i++) {
            new Point(pax, y).draw();//画点
            new Point(x, pby).draw();//画点
            x += xlincre;
            y += ylincre;
        }
    }
}

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
        var dx = pbx - pax;
        var dy = pby - pay;
        var x = pax;
        var y = pay;
        var eps;
        if (Math.abs(dx) > Math.abs(dy)) {
            eps = Math.abs(dx);
        } else {
            eps = Math.abs(dy);
        }
        var xlincre = dx * 1.0 / eps;
        var ylincre = dy * 1.0 / eps;
        var kx = 10 * (Math.abs(pbx - pax)) / (pbx - pax);
        var ky = 10 * (Math.abs(pby - pay)) / (pby - pay);
        pax -= kx; pbx += kx; pay -= ky; pby += ky;
        Rounde(pax, pay, pbx, pby);
        for (var i = 0; i <= eps; i++) {
            new Point(pax, y).draw();//画点
            new Point(x, pby).draw();//画点
            new Point(pbx, y).draw();//画点
            new Point(x, pay).draw();//画点
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
        var dx = pbx - pax;
        var dy = pby - pay;
        var x = pax;
        var y = pay;
        var eps;
        if (Math.abs(dx) > Math.abs(dy)) {
            eps = Math.abs(dx);
        } else {
            eps = Math.abs(dy);
        }
        var xlincre = dx * 1.0 / eps;
        var ylincre = dy * 1.0 / eps;
        for (var i = 0; i <= eps; i++) {
            new Point(pax, y).draw();//画点
            new Point(x, pby).draw();//画点
            new Point(pbx, y).draw();//画点
            new Point(x, pay).draw();//画点
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
        var da = 1.0 / (this.radius + 1);
        var radin = Math.PI / 4;//1/8弧即1/4pi
        var steps = parseInt(radin / da);
        var x = this.radius * Math.cos(0);
        var y = this.radius * Math.sin(0);
        for (var i = 0; i <= steps; i++) {
            new Point(x + cx, -y + cy).draw();//画点2
            new Point(-x + cx, -y + cy).draw();//画点4
            new Point(y + cx, -x + cy).draw();//画点7
            new Point(-y + cx, -x + cy).draw();//画点8
            x -= y * da;
            y += x * da;
        }
    }
}

/*
椭圆弧
*/
function Elliparc() {
    this.center = new Point();//椭圆心
    this.epoint = new Point();//鼠标点
    this.draw = function () {
        var cx = this.center.px;//椭圆心x坐标
        var cy = this.center.py;//椭圆心y坐标
        var px = this.epoint.px;
        var py = this.epoint.py;

        var X = Math.pow(Math.abs(px - cx), 2);
        var Y = Math.pow(Math.abs(py - cy), 2);


        var B = (Y + Math.sqrt(Math.pow(Y, 2) + 4 * Y * X)) / 2;
        var A = B + X;
        var a = Math.sqrt(A);
        var b = Math.sqrt(B);


        var x = 0;
        var y = b;
        var d1 = b * b + a * a * (-b + 0.25);
        new Point(cx + x, cy + y).draw();//画点1
        while (b * b * (x + 1) < a * a * (y - 0.25)) {
            if (d1 < 0) {
                d1 += b * b * (2 * x + 3);
                x++;
            }
            else {
                d1 += b * b * (2 * x + 3) + a * a * (-2 * y + 2);
                x++;
                y--;
            }
            new Point(x + cx, -y + cy).draw();//画点2
            new Point(-x + cx, -y + cy).draw();//画点4
        }
        var d2 = Math.sqrt(b * (x + 0.5)) + Math.sqrt(a * (y - 1)) - Math.sqrt(b * a);

        while (y > 0) {
            if (d2 < 0) {
                d2 += b * b * (2 * a + 2) + a * a * (-2 * y + 3);
                x++ , y--;
            }
            else {
                d2 += b * b * (2 * a + 2) + a * a * (-2 * y + 3) - b * b * (2 * a + 2);
                y--;
            }
            new Point(x + cx, -y + cy).draw();//画点2
            new Point(-x + cx, -y + cy).draw();//画点4
        }
    }
}

/*
椭圆
*/
function Ellipse() {
    this.center = new Point();//椭圆心
    this.epoint = new Point();//鼠标点
    this.draw = function () {
        var cx = this.center.px;//椭圆心x坐标
        var cy = this.center.py;//椭圆心y坐标
        var px = this.epoint.px;
        var py = this.epoint.py;

        var X = Math.pow(Math.abs(px - cx), 2);
        var Y = Math.pow(Math.abs(py - cy), 2);


        var B = (Y + Math.sqrt(Math.pow(Y, 2) + 4 * Y * X)) / 2;
        var A = B + X;
        var a = Math.sqrt(A);
        var b = Math.sqrt(B);


        var x = 0;
        var y = b;
        var d1 = b * b + a * a * (-b + 0.25);
        new Point(cx + x, cy + y).draw();//画点1
        while (b * b * (x + 1) < a * a * (y - 0.25)) {
            if (d1 < 0) {
                d1 += b * b * (2 * x + 3);
                x++;
            }
            else {
                d1 += b * b * (2 * x + 3) + a * a * (-2 * y + 2);
                x++;
                y--;
            }
            new Point(x + cx, y + cy).draw();//画点1
            new Point(x + cx, -y + cy).draw();//画点2
            new Point(-x + cx, y + cy).draw();//画点3
            new Point(-x + cx, -y + cy).draw();//画点4
        }
        var d2 = Math.sqrt(b * (x + 0.5)) + Math.sqrt(a * (y - 1)) - Math.sqrt(b * a);

        while (y > 0) {
            if (d2 < 0) {
                d2 += b * b * (2 * a + 2) + a * a * (-2 * y + 3);
                x++ , y--;
            }
            else {
                d2 += b * b * (2 * a + 2) + a * a * (-2 * y + 3) - b * b * (2 * a + 2);
                y--;
            }
            new Point(x + cx, y + cy).draw();//画点1
            new Point(x + cx, -y + cy).draw();//画点2
            new Point(-x + cx, y + cy).draw();//画点3
            new Point(-x + cx, -y + cy).draw();//画点4
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

        var da = 1.0 / (this.radius + 1);
        var radin = Math.PI / 4;//1/8弧即1/4pi
        var steps = parseInt(radin / da);
        var x = this.radius * Math.cos(0);
        var y = this.radius * Math.sin(0);
        for (var i = 0; i <= steps; i++) {
            new Point(x + cx, y + cy).draw();//画点1
            new Point(x + cx, -y + cy).draw();//画点2
            new Point(-x + cx, y + cy).draw();//画点3
            new Point(-x + cx, -y + cy).draw();//画点4
            new Point(y + cx, x + cy).draw();//画点5
            new Point(-y + cx, x + cy).draw();//画点6
            new Point(y + cx, -x + cy).draw();//画点7
            new Point(-y + cx, -x + cy).draw();//画点8
            x -= y * da;
            y += x * da;
        }
    }
}

/*
求两个点直接的欧式距离
 */
function odistance(p1, p2) {
    var dx = Math.pow(Math.abs(p1.px - p2.px), 2);
    var dy = Math.pow(Math.abs(p1.py - p2.py), 2);
    return Math.sqrt(dx + dy);
}

/*
求椭圆的长短轴
*/
function Ellipse_ab(p1, p2) {
    var X = Math.pow(Math.abs(p1.px - p2.px), 2);
    var Y = Math.pow(Math.abs(p1.py - p2.py), 2);
    //a>b
    var B = (Y + Math.sqrt(Math.pow(Y) + 4 * Y * X)) / 2;
    var A = B + X;
    var a0 = Math.sqrt(A);
    var b0 = Math.sqrt(B);
    return a0, b0;
}

/*圆角*/
function Rounde(ax, ay, bx, by) {
    this.radius = 10;//半径   ----》此处可更改圆角大小
    var cx = (ax + bx) / 2;//圆心x坐标
    var cy = (ay + by) / 2;//圆心y坐标

    var da = 1.0 / (10);
    var radin = Math.PI / 4;//1/8弧即1/4pi
    var steps = parseInt(radin / da);
    var x = this.radius * Math.cos(0);
    var y = this.radius * Math.sin(0);
    var dx = Math.abs(bx - ax) / 2 - 10;
    var dy = Math.abs(by - ay) / 2 - 10;

    cx += dx; cy += dy;
    for (var i = 0; i <= 10; i++) {
        new Point(x + cx, y + cy).draw();//画点1
        new Point(y + cx, x + cy).draw();//画点5
        x -= y * da;
        y += x * da;
    }

    cx = (ax + bx) / 2; cy = (ay + by) / 2;
    x = this.radius * Math.cos(0); y = this.radius * Math.sin(0);
    cx += dx; cy -= dy;
    for (var i = 0; i <= 10; i++) {
        new Point(x + cx, -y + cy).draw();//画点2
        new Point(y + cx, -x + cy).draw();//画点7
        x -= y * da;
        y += x * da;
    }

    cx = (ax + bx) / 2; cy = (ay + by) / 2;
    x = this.radius * Math.cos(0); y = this.radius * Math.sin(0);
    cx -= dx; cy += dy;
    for (var i = 0; i <= 10; i++) {
        new Point(-x + cx, y + cy).draw();//画点3
        new Point(-y + cx, x + cy).draw();//画点6
        x -= y * da;
        y += x * da;
    }

    cx = (ax + bx) / 2; cy = (ay + by) / 2;
    x = this.radius * Math.cos(0); y = this.radius * Math.sin(0);
    cx -= dx; cy -= dy;
    for (var i = 0; i <= 10; i++) {
        new Point(-x + cx, -y + cy).draw();//画点4
        new Point(-y + cx, -x + cy).draw();//画点8
        x -= y * da;
        y += x * da;
    }

}