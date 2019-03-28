//快捷键
$(document).keydown(function(){
    var oEvent = window.event;
    var keyCode= event.keyCode ; //获取键值
    // alert(event.keyCode);
    if (oEvent.keyCode == 90 && oEvent.ctrlKey) {//撤销功能快捷键
        revocation();
    }else if(oEvent.keyCode == 76 && oEvent.ctrlKey){//直线快捷键
        brush('straightLine');
    }



});