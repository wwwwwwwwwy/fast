/**
 * 添加上传文件的路由
 */

import * as path from 'path';
import * as Router from 'koa-router';
import * as multer from 'koa-multer';
import { config } from '../tool/pconst';
import { serverConfig } from '../interface/serverConfig';
import _ from 'lodash';

export function loadUploadFile(router: Router, serverConfig: serverConfig) {

    let { name: servername } = serverConfig;

    // 创建存储仓库
    let storage = multer.diskStorage({
        //文件保存路径
        destination: function (req, file, cb) {
            cb(null, path.join(__dirname, config.dir.static, config.dir.upload, servername))
        },
        //修改文件名称
        filename: function (req, file, cb) {
            cb(null, (+ new Date() + _.random(1000000)).toString() + file.originalname.replace(/\s/g, ""));
        },
    })

    //加载配置
    let upload = multer({ storage: storage });

    //路由
    router.post(`/${config.dir.upload}/${servername}`, upload.single('file'), async (ctx, next) => {
        // 文件名称     文件大小
        let { filename: name, size } = ctx.req.file;
        name = name.replace(/\s/g, "");
        // 文件后缀
        let suffix = path.extname(name);
        // 文件的地址
        let url = `/${config.dir.upload}/${servername}/${name}`;

        name = name.substr(13);

        ctx.body = {
            name, //返回文件名
            size, // 大小
            suffix, // 后缀
            url // 引用地址
        }
    })

    return router;
}