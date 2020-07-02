
export interface CreatePdfByUrlParams {
    // 生成url 的地址
    url?: string;
    // html 字符串
    htmlStr?: string;
    // 生成文件的路径
    path: string;
    // API 对应的设置
    settings: any;
}