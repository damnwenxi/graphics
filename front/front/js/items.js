

/**
 * 所有图元对象
 */


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
        for (var j = 0; j < this.vertices.length; j += 2) {
            var pax = this.vertices[j];
            var pay = this.vertices[j + 1];
            var pbx = this.vertices[j + 2];
            var pby = this.vertices[j + 3];
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
function Curve(){
    //基于贝尔塞曲线画法
    //初步实现:根据点来绘制
    Drawable.apply(this);//继承父类
    this.plist = [];//顶点分部集合
    this.doneFlag = false; //结束标志
    //需要限定更新范围10个点为一段
    this.draw = function () {
        var t = this.plist;
        for(var i = 0;i<t.length;i++){
            Curvelist(t[i],t[i].length-1);
        }
//		Curvelist(t,t.length-1);
//	 	var stest = [];
//	 	for(var j = 0;j<this.plist.length;j++){
//	 		stest.push(parseInt(this.plist[j][0]),parseInt(this.plist[j][1]));
//	 	}
//	 	Curvelist(stest,stest.length-1);
//	 	for(var j = 0;j<this.plist.length;j++){
//	 		Curvelist(this.plist[j],this.plist[j].length-1);
//	 	}
//		console.log(this.vertices);
//		Curvelist(this.hlist,this.hlist.length-1);
//		Curvelist(i,j);
    }
}

//n为数组长度-1
//p为2倍点数
function Curvelist(pp,n)
{
    var p = [];
    for(var i = 0;i<=pp.length-1;i++){
        p.push(pp[i]);
    }
    if (n<= 1)
        return null;
    if((p[n-1]<p[0]+1)&&(p[n-1]>p[0]-1)&&(p[n]<p[1]+1)&&(p[n]>p[1]-1))
    {
//		new Point(parseInt(p[0]), parseInt(p[1])).draw();
        ctx.fillRect(parseInt(p[0]), parseInt(p[1]), 1, 1);
        return null;
    }
    p1 = [];
    var i, j;
    p1.push(p[0],p[1]);
    for(i=2; i<=n; i+=2)
    {
        for(j=0; j<=n-i;j+=2)
        {
            p[j] = (p[j] + p[j+2])/2;
            p[j+1] = (p[j+1] + p[j+3])/2;
        }
        p1.push(p[0],p[1]);
    }
    Curvelist(p1,p1.length-1);
    Curvelist(p,p.length-1);
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
function Rectangle(s , e) {
    Drawable.apply(this);//继承父类
    this.spoint = s || new Point();//起始点
    this.epoint = e || new Point();//终止点
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