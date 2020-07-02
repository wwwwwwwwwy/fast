import { Schema, Model, model, Document } from 'mongoose';
import moment from 'moment';

export interface FieldDocument extends Document {
    // 字段名称
    name: String;
    // 接口返回字段的属性
    key: String;
    // 唯一的属性
    primaryKey: String;
    // 字段的类型
    type: String;
    // 隶属于的接口Id
    parentId: String;
    // 是否必填
    required: Boolean;
    createdAt?: String;
    updatedAt?: String;
}

export const FiledSchema = new Schema({
    // 字段名称
    name: String,
    // 接口返回字段的属性
    key: String,
    // 唯一的属性
    primaryKey: String,
    // 字段的类型
    type: String,
    // 隶属于的接口Id
    parentId: String,
    // 是否必填
    required: Boolean,
    createdAt: String,
    updatedAt: String,
})

// 在保存数据之前跟新日期
FiledSchema.pre<FieldDocument>('save', function (next) {
    const time = moment().format("YYYY-MM-DD HH:mm:ss");
    if (this.isNew) {
        this.createdAt = this.updatedAt = time;
    } else {
        this.updatedAt = time;
    }
    next()
})

export const InterFaceModel: Model<FieldDocument> = model("FiledModel", FiledSchema);