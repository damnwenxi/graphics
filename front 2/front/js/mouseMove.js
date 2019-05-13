

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
            case "curve":

                if (down_flag == true) {
                    var ps = new Point();
                    ps.px = e.clientX - of_left;
                    ps.py = e.clientY - of_top;
                    parray[index] = ps;
                    index++;
                    objs[objs.length-1].vertices.push(ps.px,ps.py);
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
});