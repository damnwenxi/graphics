

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


