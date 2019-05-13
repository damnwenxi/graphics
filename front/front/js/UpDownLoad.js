
/**
 * 接口地址: http://localhost:8081/upload
 * 
 */
var BASE_URL = 'http://118.25.210.208:8081';



//获取画布
var Can = document.getElementById("canvas");
//获取按钮对象
var btnDownload = document.getElementById("download");
var btnUpload = document.getElementById("upload");


btnDownload.addEventListener('click',download);
btnUpload.addEventListener('click',upload);

//图片格式
var img_type = 'png';
//下载
function download(){
    //获取图片
    var imgURL = Can.toDataURL(img_type);

    //创建临时下载链接 利用a标签的download属性将图片数据下载到本地
    var dLink = document.createElement('a');
    dLink.download = "test";
    dLink.href = imgURL;
    dLink.dataset.downloadurl = [img_type, dLink.download, dLink.href].join(':');
    
    document.body.appendChild(dLink);
    dLink.click();
    document.body.removeChild(dLink);
}

//上传
function upload(){
    var imgURL = Can.toDataURL(img_type);
    var name = window.prompt("请输入您的大名：");
    var title = window.prompt("给你的作品七个名字：");

    // //图片base64字节码处理
    // var arr = imgURL.split(',');
    // var mime = arr[0].match(/:(.*?);/)[1];
    // var bstr = atob(arr[1]);
    // var len = bstr.length;
    // var u8arr = new Uint8Array(len);

    // while(len--){
    //     u8arr[len] = bstr.charCodeAt(len);
    // }

    // var blob = new Blob([u8arr],{img_type:mime});


    var fd = new FormData();
    fd.append("img",imgURL);
    fd.append("name",name);
    fd.append("title",title);
    $.ajax({
        url:BASE_URL+'/upload',
        type:"POST",
        processData:false,
        contentType:false,
        data:fd,
        success:(res)=>{
            console.log(res.data);
        }
    });
}


