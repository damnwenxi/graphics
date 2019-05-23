/**
 * @desc 鼠标移动事件
 */



// 鼠标移动事件
$('canvas').mousemove(function (e) {
    /**
     * @desc 跟踪鼠标位置
     */

    var px = parseInt(e.clientX - of_left);
    var py = parseInt(e.clientY - of_top);
    $('#position').text(px + ',' + py);


    if (type != null && e.button == 0) {
        switch (type) {

            // case条件顺序不能改变，改变会出错

            case "polygon":
                break;
            case "curve":

                if (down_flag == true) {
                    var ps = new Point();
                    ps.px = e.clientX - of_left;
                    ps.py = e.clientY - of_top;
                    parray[index] = ps;
                    index++;
                    objs[objs.length - 1].vertices.push(ps.px, ps.py);
                    update();
                }
                break;
            case "straightLine":
            case "brokenline":
            case "rightangle":
            case "circle":
            case "Ellipse":
            case "elliparc":
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


    /**
     * @desc 选中并自由移动
     * @author kf
     * @date 2019.5.23
     */
    if (option.name == "pitch" && down_flag) {
        // 计算移动距离
        // console.log(downPoint);
        var px = e.clientX - of_left;
        var py = e.clientY - of_top;
        var dx = px - downPoint[0];
        var dy = py - downPoint[1];

        // 如果是多边形，将多边形顶点存入当前操作对象，深拷贝
        if (option.obj instanceof Polygon) {
            // 起始位置
            option.s_vertices = option.obj.vertices.slice(0);
        }
        // 当前操作为选中 
        if (option.name == "pitch" && option.obj) {
            // 将多边形数组的值加上移动的距离
            for (var i = 0; i < option.obj.vertices.length; i += 2) {
                option.obj.vertices[i] += dx;
                option.obj.vertices[i + 1] += dy;
                // 更新边界点
                option.obj.limit_4 = getLimit_4(option.obj);
                // 根据边界点更新选中框
                option.obj.chooseRectangle = getChooseRec(option.obj.limit_4);
            }
            rePaint();
            paintChooseRec(option.obj);
            // 将移动后的终点位置深拷贝给e_vertices
            option.e_vertices = option.obj.vertices.slice(0);
            option.obj.vertices = option.s_vertices;
        }
    }


    /**
     * @desc 选中并以x轴为标准平移
     * @author kf
     * @date 2019.5.23
     */
    if (option.name == "Xmove" && down_flag) {
        // 计算移动距离
        var px = e.clientX - of_left;
        var dx = px - downPoint[0];

        // 如果是多边形，将多边形顶点存入当前操作对象，深拷贝
        if (option.obj instanceof Polygon) {
            // 起始位置
            option.s_vertices = option.obj.vertices.slice(0);
        }
        // 当前操作为选中 
        if (option.obj) {
            // 将多边形数组的值加上移动的x距离
            for (var i = 0; i < option.obj.vertices.length; i += 2) {
                option.obj.vertices[i] += dx;
            }
            rePaint();
            // 将移动后的终点位置深拷贝给e_vertices
            option.e_vertices = option.obj.vertices.slice(0);
            option.obj.vertices = option.s_vertices;
        }
    }

    /**
     * @desc 选中并以y轴为标准平移
     * @author kf
     * @date 2019.5.23
     */
    if (option.name == "Ymove" && down_flag) {
        // 计算移动距离
        var py = e.clientY - of_top;
        var dy = py - downPoint[1];

        // 如果是多边形，将多边形顶点存入当前操作对象，深拷贝
        if (option.obj instanceof Polygon) {
            // 起始位置
            option.s_vertices = option.obj.vertices.slice(0);
        }
        // 当前操作为选中 
        if (option.obj) {
            // 将多边形数组的值加上移动的距离
            for (var i = 0; i < option.obj.vertices.length; i += 2) {
                option.obj.vertices[i + 1] += dy;
            }
            rePaint();
            // 将移动后的终点位置深拷贝给e_vertices
            option.e_vertices = option.obj.vertices.slice(0);
            option.obj.vertices = option.s_vertices;
        }
    }

    /**
     * @desc 选中并缩放
     * @author kf
     * @date 2019.5.24
     */
    if (is_hot_dot && down_flag) {
        console.log(is_hot_dot);
        var px = e.clientX - of_left;
        var py = e.clientY - of_top;
        var dx = px - downPoint[0];
        var dy = py - downPoint[1];
        switch (is_hot_dot) {
            case 1:
                // 参考点
                var basex = option.obj.limit_4[1];
                var basey = option.obj.limit_4[3];
                var dx = Math.abs(option.obj.limit_4[1] - option.obj.limit_4[0]);
                var dy = Math.abs(option.obj.limit_4[3] - option.obj.limit_4[2]);

                var dx1 = Math.abs(px - basex);
                var dy1 = Math.abs(py - basey);

                var sx = dx1 / dx;
                var sy = dy1 / dy;

                console.log(sx,sy);
                // 如果是多边形，将多边形顶点存入当前操作对象，深拷贝
                if (option.obj instanceof Polygon) {
                    // 起始位置
                    option.s_vertices = option.obj.vertices.slice(0);
                }
                // 当前操作为选中 
                if (option.obj) {
                    // 将多边形数组的值加上移动的距离
                    for (var i = 0; i < option.obj.vertices.length; i += 2) {
                        option.obj.vertices[i] *= sx;
                        option.obj.vertices[i + 1] *= sy;
                        // 更新边界点
                        option.obj.limit_4 = getLimit_4(option.obj);
                        // 根据边界点更新选中框
                        option.obj.chooseRectangle = getChooseRec(option.obj.limit_4);
                    }
                    rePaint();
                    paintChooseRec(option.obj);
                    // 将移动后的终点位置深拷贝给e_vertices
                    option.e_vertices = option.obj.vertices.slice(0);
                    option.obj.vertices = option.s_vertices;
                }
                break;

            case 2:
                break;
            case 3:
                break;
            case 4:
                break;
            default:
                console.log("未选中热键。");
        }
    }

});