import {Schema, Model, model, Document} from 'mongoose';
import moment from 'moment';

export interface InterFaceDocument extends Document{
    name:String;
    type:String;
    path:String;
    parentId:String;
    createdAt?:String;
    updatedAt?:String;
}

export const InterfaceSchema = new Schema({
    name:String,
    type:String,
    path:String,
    parentId:String,
    createdAt:String,
    updatedAt:String,
})

// 在保存数据之前跟新日期
InterfaceSchema.pre<InterFaceDocument>('save', function (next) {
    const time = moment().format("YYYY-MM-DD HH:mm:ss");
    if (this.isNew) {
        this.createdAt = this.updatedAt = time;
    } else {
        this.updatedAt = time;
    }
    next()
})

export const InterFaceModel:Model<InterFaceDocument> = model("InterfaceModel", InterfaceSchema);