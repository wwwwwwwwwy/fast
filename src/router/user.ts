import Router from 'koa-router';
import { graphqlKoa } from 'graphql-server-koa'
import { ParameterizedContext } from 'koa';
// import {UserModel} from '../db/schema/user'

import schema from '../graphql/user';

export const UserRouter = async (ctx:ParameterizedContext<any, Router.IRouterParamContext<any, {}>>,next: any) =>{
    await graphqlKoa({schema})(ctx,next)
}

// export const UserRouter = async (ctx:ParameterizedContext<any, Router.IRouterParamContext<any, {}>>) =>{
//     const res = await UserModel.create(ctx.request.body);
//     ctx.body=res;
// }