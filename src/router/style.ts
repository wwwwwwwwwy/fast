import { Schema, Model, model, Document } from 'mongoose';
import moment from 'moment';

export interface StyleDocument extends Document {
    // 字段名称
    name: String;
    // 支持的属性
    props: Object;
    createdAt?: String;
    updatedAt?: String;
}

export const StyleSchema = new Schema({
    // 字段名称
    name: String,
    // 支持的属性
    props: Object,
    createdAt: String,
    updatedAt: String,
})

// 在保存数据之前跟新日期
StyleSchema.pre<StyleDocument>('save', function (next) {
    const time = moment().format("YYYY-MM-DD HH:mm:ss");
    if (this.isNew) {
        this.createdAt = this.updatedAt = time;
    } else {
        this.updatedAt = time;
    }
    next()
})

export const StyleModel: Model<StyleDocument> = model("Style", StyleSchema);