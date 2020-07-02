import * as Router from 'koa-router';
// import { loadJavaPost, loadProxyJavaPost } from './post';
// import { loadUploadFile } from './upload';
// import { loadGetFile, loadAutoGetFile, loadAutoPostFile, loadGetPlistFile } from '../router/download';
import { Config } from '../interface/config';
// import { loadHtml2Pdf } from '../router/html2pdf';

export async function createRouter(config: Config) {
    const router = new Router();
    config.servers.forEach((serverConfig) => {
        router.get('/welcome', async (ctx) => {
            ctx.body = "welcome";
        })
    })
    return router;
}