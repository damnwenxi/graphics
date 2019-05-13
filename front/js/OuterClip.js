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