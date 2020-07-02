export interface dirConfig {
    static: string;
    upload: string;
    download: string;
    proxy: string;
    log: string;
    pdf: string;
    waitPdfTime?: number,
    phantomPath?: string;
    postByParams: string;
    getByParams: string;
    jsonStringArray: string[];
    urlReplaceLine?:boolean;
}