function Mul_Inner_SutherlandHodgman(polygon, r1, r2) {
    //接收多边形顶点集
    //每条边逐一考虑 1左 2下 3右 4上
    new_polygon = polygon; //裁剪新点集
    for(var i = 1;i<5;i++){
        new_polygon = clipEdge(i,new_polygon,r1,r2);
    }
    for(var i=0;i<new_polygon.length;i++){
        //描边
        TheLine(new_polygon[i],new_polygon[(i+1)%new_polygon.length]);
    }
}

function clipEdge(edge,new_polygon,r1,r2) {
    index = 0;
    polygonTemp = [];
    var isP1In, isP2In;
    for (var i = 0; i < new_polygon.length; i++) {
        isP1In = inSide(edge, new_polygon[i],r1,r2);
        isP2In = inSide(edge, new_polygon[(i + 1) % new_polygon.length],r1,r2);
        //多边形一边的两个顶点都在内侧 加入第二个顶点
        if (isP1In && isP2In)
            polygonTemp[index++] = new_polygon[(i + 1) % new_polygon.length];
        //多边形一边的第一个顶点在内侧 加入边界交点
        else if (isP1In)
            polygonTemp[index++] = findIntersection(edge, new_polygon[i], new_polygon[(i + 1) % new_polygon.length],r1,r2);
        //多边形一边的第二个顶点在内侧 加入边界交点和第二个顶点
        else if (isP2In) {
            polygonTemp[index++] = findIntersection(edge, new_polygon[i], new_polygon[(i + 1) % new_polygon.length],r1,r2);
            polygonTemp[index++] = new_polygon[(i + 1) % new_polygon.length];
        }
    }
    //更新新点集合
    // new_polygon.length = index;
    // for (var i = 0; i < new_polygon.length; i++)
    //     new_polygon[i] = polygonTemp[i];
    return polygonTemp;
}

function findIntersection(edge, p1, p2 ,r1,r2) {
    var gradient = (p2.py-p1.py)/(p2.px-p1.px);
    var border;
    if (edge == 1) {
        border = r1.px;
        result = p1.py + gradient * (border - p1.px);
        return new Point(result,border);
    } else if (edge == 3) {
        border = r2.px;
        result = p1.py + gradient * (border - p1.px);
        return new Point(result,border)
    } else if (edge == 2) {
        border = r2.py;
        result = p1.px + (border - p1.py) / gradient;
        return new Point(result,border)
    } else if (edge == 4) {
        border = r1.py;
        result = p1.px + (border - p1.py) / gradient;
        return new Point(result,border)
    }
}

function inSide(edge, pt ,r1,r2) {
    if (edge == 1 && pt.px < r1.px || edge == 3 && pt.px > r2.px || edge == 2 && pt.py < r1.py || edge == 4 && pt.py > r2.py)
        return false;
    return true;
}


// // 画线
function TheLine(spoint, epoint) {
    // console.log("line");
    var pax = spoint.px;
    var pay = spoint.py;
    var pbx = epoint.px;
    var pby = epoint.py;
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
        new Point(parseInt(x + 0.5), parseInt(y + 0.5)).draw(); //画点
        x += xlincre;
        y += ylincre;

    }
}
