import { Config } from '../interface/config';
import * as fs from 'fs';
import * as path from 'path';
import util from 'util';
const ONE_DAY = 24 * 60 * 60 * 1000;


function createDir(dirpath: string) {
    !fs.existsSync(dirpath) && fs.mkdirSync(dirpath);
}

export function initdir(config: Config) {
    //  创建日志文件夹
    createDir(path.join(__dirname, config.dir.log))
    //  创建静态文件夹路径
    createDir(path.join(__dirname, config.dir.static))
    //  创建上传文件夹
    createDir(path.join(__dirname, config.dir.static, config.dir.upload))

    config.servers.forEach(async function (serverConfig) {
        //  创建项目文件夹路径
        createDir(path.join(__dirname, config.dir.static, config.dir.upload, serverConfig.name));
        let files = await util.promisify(fs.readdir)(path.join(__dirname, config.dir.static, config.dir.upload, serverConfig.name));
        // 定时删除之前的临时文件
        setTimeout(() => {
            files.forEach(filename => {
                const reg = /^\d{13}/;
                if (reg.test(filename)) {
                    const [time] = Array.from(reg.exec(filename) || []);
                    if (+new Date() - parseInt(time) > ONE_DAY) {
                        fs.unlinkSync(path.join(__dirname, config.dir.static, config.dir.upload, serverConfig.name, filename))
                    }
                }
            })
        }, ONE_DAY);
    });
}