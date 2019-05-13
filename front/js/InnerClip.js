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
        }
        // console.log(outerPoints);
    }
    let temp = [];
    //再循环4次，画外部线
    for (let i = 0; i < 4; i++) {
        // if (i == 0 && outerPoints[i] != undefined) {
        //     if (outerPoints[i].y > startPoint.y) {
        //         drawLine(outerPoints[i], startPoint, 'outer'); //划线部分用改变线段对象的方式实现
        //     } else if (outerPoints[i].y > endPoint.y) {
        //         drawLine(outerPoints[i], endPoint, 'outer');
        //     }
        // } else if (i == 1 && outerPoints[i] != undefined) {
        //     if (outerPoints[i].x < startPoint.x) {
        //         drawLine(outerPoints[i], startPoint, 'outer');
        //     } else if (outerPoints[i].x < endPoint.x) {
        //         drawLine(outerPoints[i], endPoint, 'outer');
        //     }
        // } else if (i == 2 && outerPoints[i] != undefined) {
        //     if (outerPoints[i].y < startPoint.y) {
        //         drawLine(outerPoints[i], startPoint, 'outer');
        //     } else if (outerPoints[i].y < endPoint.y) {
        //         drawLine(outerPoints[i], endPoint, 'outer');
        //     }
        // } else if (i == 3 && outerPoints[i] != undefined) {
        //     if (outerPoints[i].x > startPoint.x) {
        //         drawLine(outerPoints[i], startPoint, 'outer');
        //     } else if (outerPoints[i].x > endPoint.x) {
        //         drawLine(outerPoints[i], endPoint, 'outer');
        //     }
        // }
        //画框内线段
        if (i == 3) {
            for (let i = 0, k = outerPoints.length; i < k; i++) {
                if (outerPoints[i] != undefined) {
                    let tempCode = initPositionCode(outerPoints[i], r1, r2);
                    // console.log(tempCode);
                    if (tempCode[0] == false && tempCode[2] == false || tempCode[1] == false && tempCode[3] == false) {
                        temp.push(outerPoints[i]);
                    }
                }
            }
            // console.log(temp);
            drawLine(temp[0], temp[1],'normal');
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
// function LineTest() {
//     var pax = 100;
//     var pay = 100;
//     var pbx = 300;
//     var pby = 300;
//     var dx = pbx - pax;
//     var dy = pby - pay;
//     var x = pax;
//     var y = pay;
//     var eps;
//     if (Math.abs(dx) > Math.abs(dy)) {
//         eps = Math.abs(dx);
//     } else {
//         eps = Math.abs(dy);
//     }
//     var xlincre = dx * 1.0 / eps;
//     var ylincre = dy * 1.0 / eps;
//     for (var i = 0; i <= eps; i++) {
//         new Point(parseInt(x + 0.5), parseInt(y + 0.5)).draw(); //画点
//         x += xlincre;
//         y += ylincre;

//     }
// }

function drawLine(startPoint, endPoint, lineType) {
    // console.log("drawline");
    if (lineType == 'normal') {
        // console.log("testNor");
        TheLine(startPoint,endPoint);
    } else {
        // console.log("test");
        LineTest();
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