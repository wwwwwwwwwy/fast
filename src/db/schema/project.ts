import { Schema, Model, model, Document } from 'mongoose';
import moment from 'moment';

export interface ProjectDocument extends Document {
    // 字段名称
    name: String;
    // 支持的属性
    compoents: String[];
    createdAt?: String;
    updatedAt?: String;
}

export const ProjectSchema = new Schema({
    // 字段名称
    name: String,
    // 子组件ID
    compoents:[String],
    createdAt: String,
    updatedAt: String,
})

// 在保存数据之前跟新日期
ProjectSchema.pre<ProjectDocument>('save', function (next) {
    const time = moment().format("YYYY-MM-DD HH:mm:ss");
    if (this.isNew) {
        this.createdAt = this.updatedAt = time;
    } else {
        this.updatedAt = time;
    }
    next()
})

export const ProjectModel: Model<ProjectDocument> = model("Project", ProjectSchema);