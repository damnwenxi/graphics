

// type of option.name(gloable attr)
console.log(option.name);

$('#option button').click(function(){
    if(option.name){
        if(option.name === $(this)[0].id){
            $(this).css('background-color','#fff');
            option.name = null;
        }else{
            $(this).siblings().css('background-color','#fff');
            $(this).css('background-color','#ddd');
            option.name = $(this)[0].id;
        }
    }else{
        option.name = $(this)[0].id;
        $(this).css('background-color','#ddd');
    }
    
});
