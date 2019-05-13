$("#clip").click(function(){
    type = "rectangle";
    //裁剪标志
    option.name = "clip";
    var lastItem = objs[objs.length-1];
    if(lastItem instanceof Line){
        option.line = getLine();
    }

    
});

function getLine(){
    var line = [];
    for(var i=0; i<objs.length; i++){
        if(objs[i] instanceof Line){
            line.push(objs[i].spoint,objs[i].epoint);
        }
    }
    return line;
}

// --------------线段内裁剪-----------------------------------------------------------------------------------

function Inner_cohenSutherland(startPoint, endPoint, r1, r2) {
    // console.log("wahais " + r1, r2);
    // console.log(startPoint,endPoint)
    let outerPoints = []; //在外部的点
    //计算直线斜率
    let gradient = (startPoint.py - endPoint.py) / (startPoint.px - endPoint.px);
    //初始化区域码
    let positionCodeOfStart = initPositionCode(startPoint, r1, r2),
        positionCodeOfEnd = initPositionCode(endPoint, r1, r2);
    // console.log(positionCodeOfStart);
    // console.log(positionCodeOfEnd);
    //画线
    //drawLine(startPoint,endPoint);
    let count = 0; 
    for (let i = 0 ;i<4;i++){
        if(positionCodeOfStart[i]==false&&positionCodeOfEnd[i]==false){
            count++;
        }
    }
    if(count==4){
        drawLine(startPoint,endPoint,'normal');
        return;
    }
    //循环四次，按上右下左的顺序的顺序
    for (let i = 0; i < 4; i++) {
        let positionFlag = positionCodeOfStart[i] || positionCodeOfEnd[i];
        // console.log(positionFlag)
        if (positionFlag == true) {
            if (positionCodeOfStart[i] == true && positionCodeOfEnd[i] == true) {
                // 调用画线方法 外部点
                // drawLine(startPoint, endPoint, 'outer');
                return;
            } else {
                //这种情况是有一个点在相对应边界之外
                if (i == 0) {
                    outerPoints[0] = (calculatePoint(gradient, startPoint, r2.py, 'y'));
                } else if (i == 1) {
                    outerPoints[1] = (calculatePoint(gradient, startPoint, r2.px, 'x'));
                } else if (i == 2) {
                    outerPoints[2] = (calculatePoint(gradient, startPoint, r1.py, 'y'));
                } else if (i == 3) {
                    outerPoints[3] = (calculatePoint(gradient, startPoint, r1.px, 'x'));
                }
            }
        } else {
            //两点都在裁剪区域内
            // drawLine(startPoint,endPoint);
        }
        // console.log(outerPoints);
    }
    let temp = [];
    //画框内线段
    for (let i = 0, k = outerPoints.length; i < k; i++) {
        if (outerPoints[i] != undefined) {
            let tempCode = initPositionCode(outerPoints[i], r1, r2);
            console.log(tempCode);
            if (tempCode[0] == false && tempCode[2] == false || tempCode[1] == false && tempCode[3] == false) {
                temp.push(outerPoints[i]);
            }
        }
    }
    // console.log(temp);
    //只有一个交点的情况 判断哪个端点在区域内
    if(temp.length==1){
        if(positionCodeOfStart==[false,false,false,false]){
            temp.push(startPoint);
        }else{
            temp.push(endPoint);
        }
    }
    drawLine(temp[0], temp[1], 'normal');
    

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


function drawLine(startPoint, endPoint, lineType) {
    // console.log("drawline");
    if (lineType == 'normal') {
        // console.log("testNor");
        TheLine(startPoint,endPoint);
    } else {
        // console.log("testOut");
        TheLine(startPoint,endPoint);
        // Line(startPoint, endPoint);
    }
}

//计算边界点
function calculatePoint(gradient, originalPoint, border, position) {
    // console.log("boder"+border+gradient);
    let result = 0;
    if (position == 'y') {
        result = originalPoint.px + (border - originalPoint.py) / gradient;
        return new Point(result,border)
    } else {
        result = originalPoint.py + gradient * (border - originalPoint.px);
        return new Point(border,result)
    }
}
//初始化区域码
function initPositionCode(aPoint, r1, r2) {
    let positionCode = [];
    //下
    if (aPoint.py < r2.py) {
        positionCode.push(false);
    } else {
        positionCode.push(true);
    }
    //右
    if (aPoint.px < r2.px) {
        positionCode.push(false);
    } else {
        positionCode.push(true);
    }
    //上
    if (aPoint.py > r1.py) {
        positionCode.push(false);
    } else {
        positionCode.push(true);
    }
    //左
    if (aPoint.px > r1.px) {
        positionCode.push(false);
    } else {
        positionCode.push(true);
    }

    return positionCode;
}

// --------------线段外裁剪-----------------------------------------------------------------------------------

function Outer_cohenSutherland(startPoint, endPoint, r1, r2) {
    // console.log("wahais " + r1, r2);
    // console.log(startPoint,endPoint)
    let outerPoints = []; //在外部的点
    //计算直线斜率
    let gradient = (startPoint.py - endPoint.py) / (startPoint.px - endPoint.px);
    //初始化区域码
    let positionCodeOfStart = initPositionCode(startPoint, r1, r2),
        positionCodeOfEnd = initPositionCode(endPoint, r1, r2);
    console.log(positionCodeOfStart);
    console.log(positionCodeOfEnd);
    //画线
    //drawLine(startPoint,endPoint);
    //循环四次，按上右下左的顺序的顺序
    for (let i = 0; i < 4; i++) {
        let positionFlag = positionCodeOfStart[i] || positionCodeOfEnd[i];
        // console.log(positionFlag);
        if (positionFlag == true) {
            if (positionCodeOfStart[i] == true && positionCodeOfEnd[i] == true) {
                // 调用画线方法 外部点
                // console.log("O0");
                drawLine(startPoint, endPoint, 'outer');
                return;
            } else {
                //这种情况是有一个点在相对应边界之外
                if (i == 0) {
                    outerPoints[0] = (calculatePoint(gradient, startPoint, r2.py, 'y'));
                } else if (i == 1) {
                    outerPoints[1] = (calculatePoint(gradient, startPoint, r2.px, 'x'));
                } else if (i == 2) {
                    outerPoints[2] = (calculatePoint(gradient, startPoint, r1.py, 'y'));
                } else if (i == 3) {
                    outerPoints[3] = (calculatePoint(gradient, startPoint, r1.px, 'x'));
                }
            }
        } else {
            //两点都在裁剪区域内
        }
        // console.log(outerPoints);
    }
    //再循环4次，画外部线
    for (let i = 0; i < 4; i++) {
        // console.log(outerPoints[i]);
        if (i == 0 && outerPoints[i]) {
            if (outerPoints[i].py < startPoint.py) {
                console.log(outerPoints[i]);
                console.log(startPoint);
                console.log("O1");
                drawLine(outerPoints[i], startPoint, 'outer'); //划线部分用改变线段对象的方式实现
            } else if (outerPoints[i].py < endPoint.py) {
                console.log(outerPoints[i]);
                console.log(endPoint);
                console.log("O2");
                drawLine(outerPoints[i], endPoint, 'outer');
            }
        } else if (i == 1 && outerPoints[i]) {
            if (outerPoints[i].px < startPoint.px) {
                console.log(outerPoints[i]);
                console.log(startPoint);
                console.log("O3");
                drawLine(outerPoints[i], startPoint, 'outer');
            } else if (outerPoints[i].px < endPoint.px) {
                console.log(outerPoints[i]);
                console.log(endPoint);
                console.log("O4");
                drawLine(outerPoints[i], endPoint, 'outer');
            }
        } else if (i == 2 && outerPoints[i]) {
            if (outerPoints[i].py > startPoint.py) {
                console.log(outerPoints[i]);
                console.log(startPoint);
                console.log("O5");
                drawLine(outerPoints[i], startPoint, 'outer');
            } else if (outerPoints[i].py > endPoint.py) {
                console.log(outerPoints[i]);
                console.log(endPoint);
                console.log("O6");
                drawLine(outerPoints[i], endPoint, 'outer');
            }
        } else if (i == 3 && outerPoints[i]) {
            if (outerPoints[i].px > startPoint.px) {
                console.log(outerPoints[i]);
                console.log(startPoint);
                console.log("O7");
                drawLine(outerPoints[i], startPoint, 'ouster');
            } else if (outerPoints[i].px > endPoint.px) {
                console.log(outerPoints[i]);
                console.log(endPoint);
                console.log("O8");
                drawLine(outerPoints[i], endPoint, 'outer');
            }
        }
    }
}

// --------------多边形内裁剪-----------------------------------------------------------------------------------

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
        return new Point(border,result);
    } else if (edge == 3) {
        border = r2.px;
        result = p1.py + gradient * (border - p1.px);
        return new Point(border,result)
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
    if (edge == 1 && pt.px < r1.px || edge == 3 && pt.px > r2.px || edge == 2 && pt.py > r2.py || edge == 4 && pt.py < r1.py)
        return false;
    return true;
}

// --------------多边形外裁剪-----------------------------------------------------------------------------------

function Mul_Outer_WeilerAtherton(subject, r1, r2) {
    var subjectListSave = new polygonPro();
    var clipListSave = new polygonPro();
    var OutList = new polygonPro;
    //获得含交点的裁剪框序列和多边形顶点序列
    WeilerAtherton_GetList(subject, r1, r2, subjectListSave, clipListSave)
    //内裁剪 从多边形顶点序列的第一个入点开始加入顶点集并消去入点标记 从左至右 遍历将非出点加入裁剪顶点集 发现出点 到 裁剪框顶点集合从左至右遍历将非入点加入裁剪顶点集 若最后入点不是起点 重复上述步骤

    //外裁剪 从裁剪框顶点序列的第一个出点开始加入顶点集并消去出点标记 从左至右 遍历将非出点加入裁剪顶点集 发现入点 到 多边形顶点集合从右至左遍历将非入点加入裁剪顶点集 若最后出点不是起点 重复上述步骤
    var p = clipListSave.first;
    var flag = false;
    var end = false;
    while (p != null) {
        //找到第一个出点 将其加入顶点集 并消去出点标记
        if (p.point.type == "false") {
            OutList.first = new PolygonNode(p.point);
            p.point.type = null;
            OutList.length++;
            flag = true;
            p = p.next;
            if (p == null) {
                p = clipListSave.first;
            }
            continue;
        }
        //将出点后的非入点加入输出顶点集
        if (OutList.first) {
            if (p.point.type != "true") {
                if (flag) {
                    OutList.insertAfter(p.point, OutList.first);
                    flag = false;
                } else {
                    OutList.insertAfter(p.point, OutList.last);
                }
            } else {
                //到多边形顶点序列中找到当前入点位置
                var substart = subjectListSave.find(p)
                var q = substart;
                while (q != null) {
                    
                    if (q.point.type != "false") {
                        OutList.insertAfter(q.point, OutList.last);
                    } else {
                        //将起点也放到输出顶点集合最后，方便划线
                        if (q.point.px == OutList.first.point.px &&q.point.py == OutList.first.point.py) {
                            OutList.insertAfter(q.point, OutList.last);
                            end = true;
                            break;
                        }else{
                            break;
                        }
                    }
                    q = q.prev;
                    if (q == null) {
                        q = subjectListSave.last;
                    }
                }
            }
        }
        if (end) {
            break;
        }
        p = p.next;
        if (p == null) {
            p = clipListSave.first;
        }
    }
    console.log("OutList");
    console.log(OutList);
    //根据顶点坐标画图形 ()
    var firstPoint = OutList.first;
    while(firstPoint!=null){
        if(firstPoint.next!=null){
            TheLine(firstPoint.point,firstPoint.next.point);
        }
        firstPoint = firstPoint.next;
    }
}

function WeilerAtherton_GetList(subject, r1, r2, subjectListSave, clipListSave) {
    var subjectRing = subject;
    var clipRing = [r1, new Point(r2.px, r1.py), r2, new Point(r1.px, r2.py)]
    var subjectList = new polygonPro();
    var clipList = new polygonPro();


    //存入多边形顶点序列
    for (var i = 0; i < subject.length; i++) {
        subjectList.add(subject[i]);
        subjectListSave.add(subject[i]);
    }
    //存入裁剪框顶点序列
    for (var i = 0; i < 4; i++) {
        if (i == 0) {
            clipList.add(r1);
            clipListSave.add(r1);
        } else if (i == 1) {
            clipList.add(new Point(r2.px, r1.py));
            clipListSave.add(new Point(r2.px, r1.py));
        } else if (i == 2) {
            clipList.add(r2);
            clipListSave.add(r2);
        } else {
            clipList.add(new Point(r1.px, r2.py));
            clipListSave.add(new Point(r1.px, r2.py));
        }
    }


    var currentSubject = subjectList.first;
    var currentClip = clipList.first;

    for (var i = 0; i < subject.length; i++) {
        currentClip = clipList.first
        for (var k = 0; k < 4; k++) {
            var nextSubject;
            var nextClip;
            if (i == subject.length - 1) {
                nextSubject = subjectList.first;
            } else {
                nextSubject = currentSubject.next;
            }
            if (k == 3) {
                nextClip = clipList.first;
            } else {
                nextClip = currentClip.next;
            }

            var intersection = lineIntersects(
                currentSubject.point.px,
                currentSubject.point.py,
                nextSubject.point.px,
                nextSubject.point.py,
                currentClip.point.px,
                currentClip.point.py,
                nextClip.point.px,
                nextClip.point.py
            );
            console.log(intersection);

            if (intersection) {
                //判断裁剪框顶点是否在多边形内部

                var isEntering = isInside([intersection[0], intersection[1]], currentSubject, nextSubject, clipRing);
                var startTop = TopisInside([currentClip.px,currentClip.py],subjectRing);
                var endTop = TopisInside([nextClip.px,nextClip.py],subjectRing);
                // if(startTop==false&&endTop==false){
                //     //将交点插入多边形顶点序列 插入有点问题2019.4.23
                //     var nextSubjectSave = subjectListSave.find(nextSubject);
                //     console.log("success!");
                //     subjectListSave.insertBefore(new Point(intersection[0], intersection[1], isEntering), nextSubjectSave);
                //     //将交点插入裁剪框顶点序列
                //     var nextClipSave = clipListSave.find(nextClip.prev);
                //     clipListSave.insertBefore(new Point(intersection[0], intersection[1], isEntering), nextClipSave);
                // }else{
                    //将交点插入多边形顶点序列 插入有点问题2019.4.23
                    var nextSubjectSave = subjectListSave.find(nextSubject)
                    console.log("success!");
                    subjectListSave.insertBefore(new Point(intersection[0], intersection[1], isEntering), nextSubjectSave);
                    //将交点插入裁剪框顶点序列
                    var nextClipSave = clipListSave.find(nextClip)
                    clipListSave.insertBefore(new Point(intersection[0], intersection[1], isEntering), nextClipSave);
                // }
            }
            if (currentClip.next) {
                currentClip = currentClip.next;
            }
            console.log(k);
        }
        if (currentSubject.next) {
            currentSubject = currentSubject.next;
        }
    }
    //包含交点的多边形顶点序列
    console.log(subjectListSave);
    console.log(subjectList);
    //包含交点的裁剪框顶点序列
    console.log(clipListSave);
    console.log(clipList);
    // walk the lists
}

//求裁剪框边与多边形的交点 返回[px,py]
function lineIntersects(line1StartX, line1StartY, line1EndX, line1EndY, line2StartX, line2StartY, line2EndX, line2EndY) {
    // if the lines intersect, the result contains the x and y of the intersection (treating the lines as infinite) and booleans for whether line segment 1 or line segment 2 contain the point
    var denominator, a, b, numerator1, numerator2, result = {
        x: null,
        y: null,
        onLine1: false,
        onLine2: false
    };
    denominator = ((line2EndY - line2StartY) * (line1EndX - line1StartX)) - ((line2EndX - line2StartX) * (line1EndY - line1StartY));
    if (denominator == 0) {
        if (result.px != null && result.py != null) {
            return result;
        } else {
            return false;
        }
    }
    a = line1StartY - line2StartY;
    b = line1StartX - line2StartX;
    numerator1 = ((line2EndX - line2StartX) * a) - ((line2EndY - line2StartY) * b);
    numerator2 = ((line1EndX - line1StartX) * a) - ((line1EndY - line1StartY) * b);
    a = numerator1 / denominator;
    b = numerator2 / denominator;

    // if we cast these lines infinitely in both directions, they intersect here:
    result.px = line1StartX + (a * (line1EndX - line1StartX));
    result.py = line1StartY + (a * (line1EndY - line1StartY));

    // if line1 is a segment and line2 is infinite, they intersect if:
    if (a > 0 && a < 1) {
        result.onLine1 = true;
    }
    // if line2 is a segment and line1 is infinite, they intersect if:
    if (b > 0 && b < 1) {
        result.onLine2 = true;
    }
    // if line1 and line2 are segments, they intersect if both of the above are true
    if (result.onLine1 && result.onLine2) {
        return [result.px, result.py];
    } else {
        return false;
    }
}

function isInside(point, currentSubject, nextSubject, clipRing) {
    // var isInside = true;
    var gradient = (nextSubject.point.py - currentSubject.point.py) / (nextSubject.point.px - currentSubject.point.px);
    if (gradient > 0 && currentSubject.point.px > nextSubject.point.px) {
        var testPoint = new Point((point[0] + 1), (point[1] + gradient));
        //沿着指向方向交点坐标加一在裁剪框内 则为入点
        if (testPoint.px > clipRing[0].px && testPoint.px < clipRing[2].px && testPoint.py > clipRing[0].py && testPoint.py < clipRing[2].py) {
            return "false";
        } else {
            return "true";
        }
    } else if (gradient > 0 && currentSubject.point.px < nextSubject.point.px) {
        var testPoint = new Point((point[0] + 1), (point[1] + gradient));
        if (testPoint.px > clipRing[0].px && testPoint.px < clipRing[2].px && testPoint.py > clipRing[0].py && testPoint.py < clipRing[2].py) {
            return "true";
        } else {
            return "false";
        }
    } else if (gradient < 0 && currentSubject.point.px < nextSubject.point.px) {
        var testPoint = new Point((point[0] - 1), (point[1] - gradient));
        if (testPoint.px > clipRing[0].px && testPoint.px < clipRing[2].px && testPoint.py > clipRing[0].py && testPoint.py < clipRing[2].py) {
            return "false";
        } else {
            return "true";
        }
    } else if (gradient < 0 && currentSubject.point.px > nextSubject.point.px) {
        var testPoint = new Point((point[0] - 1), (point[1] - gradient));
        if (testPoint.px > clipRing[0].px && testPoint.px < clipRing[2].px && testPoint.py > clipRing[0].py && testPoint.py < clipRing[2].py) {
            return "true";
        } else {
            return "false";
        }
    }


}
//判断裁剪框顶点是否在多边形内部
function TopisInside(point,subjectRing) {

    var x = point[0];
    var y = point[1];
    var vs = polygon;

    var isInside = false;
    for (var i = 0, j = vs.length - 1; i < vs.length; j = i++) {
        var xi = vs[i][0],
            yi = vs[i][1];
        var xj = vs[j][0],
            yj = vs[j][1];

        var intersect = ((yi > y) != (yj > y)) &&
            (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
        if (intersect) isInside = !isInside;
    }
    return isInside;
}

// 画线
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

//多边形类型
function polygonPro() {
    this.length = 0;
    this.first = null;
    this.last = null;
}

function PolygonNode(point) {
    this.point = point;
    this.next = null;
    this.prev = null;
    this.ear = false;
}

polygonPro.prototype = {
    add: function (point) {
        var node = new PolygonNode(point);

        if (!this.length) {
            this.first = this.last = node;

        } else {
            this.last.next = node;
            node.prev = this.last;
            this.last = node;
        }

        this.length++;
    },

    find: function (node) {
        var head = this.first;
        while (head != null) {
            if (head.point.px == node.point.px && head.point.py == node.point.py) {
                return head;
            }
            head = head.next;
        }
    },

    remove: function (node) {
        if (!this.length) return;

        if (node === this.first) {
            this.first = this.first.next;

            if (!this.first) this.last = null;
            else this.first.prev = null;

        } else if (node === this.last) {
            this.last = this.last.prev;
            this.last.next = null;

        } else {
            node.prev.next = node.next;
            node.next.prev = node.prev;
        }

        node.prev = null;
        node.next = null;

        this.length--;
    },

    insertBefore: function (point, node) {
        var newNode = new PolygonNode(point);
        newNode.prev = node.prev;
        newNode.next = node;

        if (!node.prev) this.first = newNode;
        else node.prev.next = newNode;

        node.prev = newNode;

        this.length++;
    },

    insertAfter: function (point, node) {
        var newNode = new PolygonNode(point);
        newNode.prev = node;
        this.last = newNode;
        // newNode.next = null;
        // node.next = newNode;
        if (node.next == null) {
            this.last = newNode;
            newNode.next = null;
        } else {
            node.next.prev = newNode;
            newNode.next = node.next;
        }
        node.next = newNode;
        this.length++;
    }
};