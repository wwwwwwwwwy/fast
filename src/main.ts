import * as path from 'path';
import * as Koa from 'koa';
// import * as bodyParser from 'koa-bodyparser';
import koastatic from 'koa-static';
import cors from 'koa2-cors';
// import { createRouter } from './router/index';
import dir from './config/dir.json'
import config from './config/server.json';
// import { initdir } from './tool/initdir';
import { accessLogger } from './tool/log';
import {database} from './db/index';
import { test } from './db/test';


// 创建Koa 实例
const app = new Koa();

app.use(cors({
    origin: function () {
        return "*"; // 允许来自所有域名请求
    },
    exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
    maxAge: 5,
    credentials: true,
    allowMethods: ['GET', 'POST', 'DELETE'],
    allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
}))

// 添加请求时间日志
app.use(accessLogger());

// 添加解析参数
// app.use(bodyParser({
//     'formLimit': '1000mb',
//     'jsonLimit': '100mb',
//     'textLimit': '100mb',
// }))

// 项目启动
const start = async function (app: Koa) {
    // 添加静态请求资源
    app.use(koastatic(
        path.join(__dirname, dir.static)
    ))
    // 连接数据库
    database();

    // // 加载路由
    // // let router = await createRouter(config);
    // // app.use(router.routes()).use(router.allowedMethods());
    // // 启动监听
    app.listen(config.port);
    console.log(`端口号${config.port}启动成功`);

    test();
    // console.log(`当前配置文件为${JSON.stringify(config)}`);
}

start(app);




