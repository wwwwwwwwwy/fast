import * as koa from 'koa';

declare module 'koa' {
    interface IncomingMessage {
        [x: string]: any;
        file: any
    }
}