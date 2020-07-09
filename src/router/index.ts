import { graphiqlKoa } from 'graphql-server-koa'
import * as Router from 'koa-router';
import {UserRouter} from './user';

export async function createRouter() {
    const router = new Router();
    router.post('/user', UserRouter)
        .get('/graphiql',async(ctx, next)=>{
            await graphiqlKoa({endpointURL: '/graphql'})(ctx)
        })
        .post('/graphql',UserRouter)
        .get('/graphql',UserRouter)
    return router;
}

