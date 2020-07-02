import * as path from 'path';
import log4js from 'koa-log4';

console.log(path.join(__dirname, 'logs', 'access.log'));
log4js.configure({
    appenders: {
        access: {
            type: 'dateFile',
            pattern: 'yyyy-MM-dd.log', //生成文件的规则
            filename: path.join(__dirname, 'logs', 'access.log') //生成文件名
        },
        application: {
            type: 'dateFile',
            pattern: '-yyyy-MM-dd.log',
            filename: path.join(__dirname, 'logs', 'application.log')
        },
        out: {
            type: 'console'
        }
    },
    categories: {
        default: { appenders: ['out'], level: 'info' },
        access: { appenders: ['access'], level: 'info' },
        application: { appenders: ['application'], level: 'WARN' }
    }
});

const accessLogger = () => log4js.koaLogger(log4js.getLogger('access'));

const logger = log4js.getLogger('application');

export {
    accessLogger,
    logger
}

