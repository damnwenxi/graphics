

/**
 * @desc 对称转换函数
 * @params number:要转换的值,s:关于x轴还是y轴或原点转换 
 * @return t_number：转换之后的值
 */

function trans(n,s){
    // 画布宽1080，高540
    // 关于X轴转换
    if(s === 'x'){
        var d = Math.abs(n-270);
        if(n<270) return 270+d;
        else return 270-d;
    }
    // 关于Y轴转换
    if(s === 'y'){
        var d = Math.abs(n-540);
        if(n<540) return 540+d;
        else return 540-d;
    }
} 


document.onkeydown = function(e) {
    var keyCode = e.keyCode || e.which || e.charCode;
    var ctrlKey = e.ctrlKey || e.metaKey;

    // cmd/ctrl + x 快捷键 ：关于x轴对称
    if(ctrlKey && keyCode == 88) {
        // alert('x');
        e.preventDefault();
        if(option.obj){
            const obj = option.obj;
            // 获取当前选中图元的原型名称
            const kindOfObj = obj.__proto__.constructor.name;
            console.log(kindOfObj);

            switch (kindOfObj){
                case "Circle":
                    console.log(obj);
                    break;
                case "Polygon":
                    console.log(obj);
                    var copy = new Polygon();
                    var vertices = [];
                    for(var i=0; i<obj.vertices.length; i+=2){
                        // 这里是关于x轴对称，改变y坐标,x不变
                        vertices.push(obj.vertices[i])
                        var ty = trans(obj.vertices[i+1],'x');
                        vertices.push(ty);
                    }
                    copy.vertices = vertices;
                    copy.draw();
                    objs.push(copy);
                    break;  
                default:
                    alert("没有选中图元");

            }
        }
    }
    // cmd/ctrl + y 快捷键 ：关于y轴对称
    if(ctrlKey && keyCode == 89){
        // alert('y');
        e.preventDefault();
        if(option.obj){
            const obj = option.obj;
            // 获取当前选中图元的原型名称
            const kindOfObj = obj.__proto__.constructor.name;
            console.log(kindOfObj);

            switch (kindOfObj){
                case "Circle":
                    console.log(obj);
                    break;
                case "Polygon":
                    console.log(obj);
                    var copy = new Polygon();
                    var vertices = [];
                    for(var i=0; i<obj.vertices.length; i+=2){
                        // 这里是关于y轴对称，改变x坐标
                        var tx = trans(obj.vertices[i],'y');
                        vertices.push(tx);
                        // y轴不变
                        vertices.push(obj.vertices[i+1])
                    }
                    copy.vertices = vertices;
                    copy.draw();
                    objs.push(copy);
                    break;  
                default:
                    alert("没有选中图元");

            }
        }
    }

    // cmd/ctrl + o 快捷键 ：关于原点对称
    if(ctrlKey && keyCode == 79){
        // alert('o');
        e.preventDefault();
        if(option.obj){
            const obj = option.obj;
            // 获取当前选中图元的原型名称
            const kindOfObj = obj.__proto__.constructor.name;
            console.log(kindOfObj);

            switch (kindOfObj){
                case "Circle":
                    console.log(obj);
                    break;
                case "Polygon":
                    console.log(obj);
                    var copy = new Polygon();
                    var vertices = [];
                    for(var i=0; i<obj.vertices.length; i+=2){
                        // 这里是关于原点对称，改变x坐标和y坐标
                        var tx = trans(obj.vertices[i],'y');
                        var ty = trans(obj.vertices[i+1],'x');
                        vertices.push(tx);
                        // y轴不变
                        vertices.push(ty);
                    }
                    copy.vertices = vertices;
                    copy.draw();
                    objs.push(copy);
                    break;  
                default:
                    alert("没有选中图元");

            }
        }
    }

    // 按住x并且按住并移动鼠标
    if(keyCode == 88 && down_flag){
        option.name = 'Xmove';
    }
    // 按住y并且按住并移动鼠标
    if(keyCode == 89 && down_flag){
        option.name = 'Ymove';
    }
    return false;
}