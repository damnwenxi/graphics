

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
            case "rectangle":
                down_flag = false;

                // 裁剪按钮点击之后
                if (option.name == 'clip') {
                    // 最后一个元素是裁剪用的矩形，记录矩形的两个关键点
                    var lastItem = objs[objs.length - 1];
                    option.rx = lastItem.spoint;
                    option.ry = lastItem.epoint;
                    objs.pop();
                }


                // 矩形刷新
                var ps = new Point();
                ps.px = e.clientX - of_left;
                ps.py = e.clientY - of_top;
                parray[index] = ps;
                index++;
                update();
                parray = [];//数组清空
                index = 0;//下标清空
                // console.log("done");

                var lastItem = objs[objs.length - 1];
                // console.log(lastItem instanceof Line);
                 // 判断待裁剪的对象
                if (lastItem instanceof Line) {
                    // 直线走这里
                    var clipType = window.confirm("内裁剪OR外裁剪？");
                    if (clipType) {
                        canvasClear();//画布清空
                        for (var i = 0; i < option.line.length; i += 2) {
                            Inner_cohenSutherland(option.line[i], option.line[i + 1], option.rx, option.ry);
                        }
                        // console.log(objs);

                    } else {
                        canvasClear();//画布清空
                        for (var i = 0; i < option.line.length; i += 2) {
                            Outer_cohenSutherland(option.line[i], option.line[i + 1], option.rx, option.ry);
                        }
                        // console.log(objs);
                    }
                    // 多边形走这里
                }else if(lastItem instanceof Polygon){
                    var vertice = lastItem.vertices;
                    // console.log(vertice);
                    // 预处理多边形顶点数组，去头去尾，设计多边形时根据需要开头顶点push了两次
                    vertice.shift();
                    vertice.shift();
                    vertice.pop();
                    vertice.pop();

                    // 多边形裁剪参数：顶点列表
                    var list = [];
                    for(var i=0;i<vertice.length;i+=2){
                        var ps = new Point;
                        ps.px = vertice[i];
                        ps.py = vertice[i+1];
                        list.push(ps);
                    }
                    // console.log(list);
                    var clipType = window.confirm("内裁剪OR外裁剪？");
                    if (clipType) {
                        objs.pop();
                        rePaint();
                        Mul_Inner_SutherlandHodgman(list,option.rx,option.ry);
                        // console.log(objs);

                    } else {
                        console.log("外裁剪");
                        objs.pop();
                        rePaint();
                        Mul_Outer_WeilerAtherton(list,option.rx,option.ry);
                    }
                }
                break;
            case "brokenline":
            case "straightLine":
            case "rightangle":
            case "circle":
            case "Ellipse":
            case "elliparc":
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