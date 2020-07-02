import { Schema, Model, model, Document } from 'mongoose';
import { ProjectDocument, ProjectSchema } from './project';
import moment from 'moment';

export interface UserDocument extends Document {
    // 字段名称
    name: String;
    // 密码
    password: String;
    // 拥有的项目
    projects: ProjectDocument[],
    createdAt: String;
    updatedAt: String;
}

export const UserSchema = new Schema({
    // 字段名称
    name: String,
    // 接口返回字段的属性
    password: String,
    // 拥有的项目
    projects: [ProjectSchema],
    createdAt: String,
    updatedAt: String,
})

// 在保存数据之前跟新日期
UserSchema.pre<UserDocument>('save', function (next) {
    const time = moment().format("YYYY-MM-DD HH:mm:ss");
    if (this.isNew) {
        this.createdAt = this.updatedAt = time;
    } else {
        this.updatedAt = time;
    }
    next()
})

export const InterFaceModel: Model<UserDocument> = model("UserModel", UserSchema);