const Router = require('koa-router');
// const fs = require('fs');
// const path = require('path');

const router = new Router();

/**
 * 上传图片接口
 */
router.post('upload',async ctx=>{
    try{
        const data = ctx.request.body;
        const savaImg = await ctx.db.query("insert into img (title,url,author) values (?,?,?)",[data.title,data.img,data.name]);
        if(savaImg.affectedRows>0){
            // console.log("yy");
            ctx.status = 200;
            ctx.body = {msg:"保存到数据库成功"};
        }else{
            ctx.status = 500;
            ctx.body = {msg:"数据库错误"};
        }
    }catch(err){
        console.log(err);
        ctx.status = 500;
        ctx.body = {msg:"崩了"};
    }
    
})


/**
 * 获取图片接口
 */
router.get('all',async ctx=>{
    try{
        const getImg = await ctx.db.query("select * from img limit 50");
        if(getImg.length>0){
            ctx.status = 200;
            ctx.body = {msg:"获取数据成功",images:getImg};
        }else{
            ctx.status = 500;
            ctx.body = {msg:"数据库错误"};
        }
    }catch(err){
        console.log(err);
        ctx.status = 500;
        ctx.body = {msg:"崩了"};
    }
    
})

module.exports = router.routes()