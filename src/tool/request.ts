import axios from 'axios';
import * as qs from 'qs';

// Post 请求接口
export interface PostConfig {
    url: string;
    argu: object;
}

// Post 请求的方法
export const post = async function (config: PostConfig): Promise<object> {
    const res = await axios.post(config.url, config.argu);
    return res.data;
}

// form data 的post 请求
export const formdata = async function (config: PostConfig): Promise<object> {
    const res = await axios.post(config.url, qs.stringify({
        jsonString: JSON.stringify(config.argu)
    }));
    return res.data;
}