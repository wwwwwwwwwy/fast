import {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
    GraphQLID,
    GraphQLList,
    GraphQLNonNull
} from 'graphql';

import {UserModel} from '../db/schema/user';

const UserType = new GraphQLObjectType({
    name:"user",
    fields: {
        _id:{
            type:GraphQLID,
        },
        name:{
            type:GraphQLString,
        },
        projects:{
            type:new GraphQLList(GraphQLString)
        },
        createdAt:{
            type:GraphQLString,
        },
        updatedAt:{
            type:GraphQLString,
        },
    }
});

const users = {
    type:new GraphQLList(UserType),
    args:{},
    async resolve(){
        return await UserModel.find({}).exec();
    }
}

const user = {
    type:UserType,
    args:{
        id:{
            name:"id",
            type:new GraphQLNonNull(GraphQLID)
        }
    },
    async resolve(root: any,params:any){
        return await UserModel.findById(params.id).exec();
    }
}

export default new GraphQLSchema({
    query:new GraphQLObjectType({
        name:'Queries',
        fields:{
            users,
            user
        }
    })
})