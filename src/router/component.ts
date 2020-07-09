import { Schema, Model, model, Document } from 'mongoose';
import { FiledSchema } from './field';
import moment from 'moment';

export interface ComponentDocument extends Document {
    // 字段名称
    name: String;
    // 标签名称
    tag: String;
    // 支持的属性
    props: String[];
    // 依赖的组件
    components: String[];
    // 是否拥有导航连接
    link?: String;
    // 依赖的接口
    interface: String;
    // 组件类型
    type: String;
    // 组件内排序
    order: Number;
    // 组件样式
    style: String[];
    createdAt?: String;
    updatedAt?: String;
}

export const ComponentSchema = new Schema({
    // 字段名称
    name: String,
    // 标签名称
    tag: String,
    // 接口返回字段的属性
    props: [FiledSchema],
    // 子组件ID
    compoents: [String],
    // 是否拥有连接
    link: String,
    // 组件类型
    type: String,
    // 依赖的接口
    interface: String,
    // 组件内排序
    order: Number,
    // 组件样式
    style: [String],
    createdAt: String,
    updatedAt: String,
})

// 在保存数据之前跟新日期
ComponentSchema.pre<ComponentDocument>('save', function (next) {
    const time = moment().format("YYYY-MM-DD HH:mm:ss");
    if (this.isNew) {
        this.createdAt = this.updatedAt = time;
    } else {
        this.updatedAt = time;
    }
    next()
})

export const InterFaceModel: Model<ComponentDocument> = model("Component", ComponentSchema);