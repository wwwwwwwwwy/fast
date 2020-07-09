import {Schema, Model, model, Document} from 'mongoose';
import moment from 'moment';

export interface InterFaceGroupDocument extends Document{
    name:String;
    path:String;
    createdAt?:String;
    updatedAt?:String;
}

export const InterFaceGroupDocumentSchema = new Schema({
    name:String,
    path:String,
    createdAt:String,
    updatedAt:String,
})

// 在保存数据之前跟新日期
InterFaceGroupDocumentSchema.pre<InterFaceGroupDocument>('save', function (next) {
    const time = moment().format("YYYY-MM-DD HH:mm:ss");
    if (this.isNew) {
        this.createdAt = this.updatedAt = time;
    } else {
        this.updatedAt = time;
    }
    next()
})

export const InterFaceGroupModel:Model<InterFaceGroupDocument> = model("InterFaceGroupModel", InterFaceGroupDocumentSchema);