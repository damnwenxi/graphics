const Koa = require('koa');
const Router = require('koa-router');
const static = require('koa-static');
const koaBody = require('koa-body');
const db = require('./api/db');

const app = new Koa();
const router = new Router();
app.context.db = db;
//设置允许访问来源
app.use(async (ctx,next)=>{
    ctx.set('Access-Control-Allow-Headers','*');
    ctx.set('Access-Control-Allow-Origin','*');
    await next();
})

router.use('/',require('./api/upload'));

app.use(static(__dirname+'/upload'));
app.use(koaBody({
    multipart:true,
    formidable:{
        keepExtensions:true,
        maxFileSize:20*1024*1024
    }
}));


app.use(router.routes()).use(router.allowedMethods());
app.listen(8081,()=>{
    console.log("server is running. ");
});