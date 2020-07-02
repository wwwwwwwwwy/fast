### DAAS注意
```
pdf生成服务需根据不同服务器环境使用对应的.local-chromium，此文件在node_modules中查找并复制到meos文件夹
```
### 安装所需依赖

```
npm install
```

### 开发启动项目
```
npm start
```

### 打包项目
```
npm build:prod
```

### 启动打包后的项目
```
npm app.js
```

### 配置文件

dir.json 控制上传下载的路由结构，以及Node端服务器的文件目录。

```json
{
    "static": "public",  // 1.服务器的静态文件夹名
    "upload": "upload",  // 2.存放的Node端上传的文件的目录,
    "download": "download", // 3.根据key下载的路由名称
    "log": "log", // 4.存放日志的文件夹名称
    "pdf": "pdf", // 5. 存放PDF对应的文件夹
    "waitPdfTime": 5000, // 6. Url 转PDF 的等待时间
    "jsonStringArray": [ // 7. 接口中参数需要转换为jsonString 的接口第一级目录，配置后会自动的把 object 类型转换成为对应的jsonString={} 的格式
        "EMS_SaaS_Web",
        "saas-version-app",
        "environment_saas_web"
    ],
    "getByParams": "getByParams",
    "postByParams": "postByParams",
    "urlReplaceLine":true // K8s 部署专用配置，为true 时，请求后台接口会把后台的接口的第一级目录修改，大写转换为小写，_转换为-，其他部署方式可以忽略
}
```

server.json  Node 项目的相关配置和的后台的接口的地址。

```json
{
    "port": 8091, // 服务的端口号
    "servers": [
        {
            "name": "fms",   // 5.对应的项目名称
            "serverUrl": "http://192.168.100.235:8389/", // 6.对应的后台的接口
            "fileUploadUrl": "http://192.168.100.235:8389/image-service/common/file_upload", // 7.后台文件服务器上传的地址
            "fileGetUrl": "http://192.168.100.235:8389/image-service/common/file_get", // 8.后台文件服务器下载的地址
            "systemId": "dataPlatform", // 文件服务器的凭证（需要和7，8对应）
            "secret": "9e0891a7a8c8e885" // 文件服务器的凭证
        },
        {
            "name": "dass",
            "serverUrl": "http://192.168.100.235:8389/",
            "fileUploadUrl": "http://192.168.100.235:8389/image-service/common/file_upload",
            "fileGetUrl": "http://192.168.100.235:8389/image-service/common/file_get",
            "systemId": "dataPlatform",
            "secret": "9e0891a7a8c8e885"
        }
    ]
}
```

### 使用说明
pdf生成服务需根据不同服务器环境使用对应的.local-chromium
#### 后台接口调用

#### POST 请求

请求后台地址:
Node服务器的 IP + Port / 项目名称 / 后台的接口的路径

请求方式:
post

参数类型:
JSON

Node 会将请求POST参数中 "/ upload /项目名称/1563532186484test.png" 这种格式的字符串直接转换的成为对应文件服务器的key,然后再进行提交。

#### 文件上传

请求后台地址:
Node服务器的 IP + Port / upload / 项目名称

#### 文件下载
请求后台地址:
Node服务器的 IP + Port / download / 项目名称 / key (这种请求会直接把key 当成文件名称进行下载)

Node服务器的 IP + Port / download / 项目名称 / key ?filename="xxx.png" (这种请求对下载的文件进行重命名,名称为“xxx.png”)

#### 根据POST参数下载

Node服务器的 IP + Port / download / postByParams  / 项目名称

#### 根据后台的Url下载

Node服务器的 IP + Port / download / getByParams  / 项目名称 /  对应的后台下载路径

#### HTML 转换 PDF

Node服务器的 IP + Port / 项目名称 / pdf   
例如：http://192.168.100.236:9910/fms/pdf   

htmlStr 和 url 只需要传一个。
- htmlStr 通过html 字符串生成
- url 通过链接下载生成整个的页面的PDF,解析时间配置文件可控制,配置项为dir.json 文件中的 waitPdfTime属性,单位为毫秒
```json
{
    // 要生成PDF用的 HTML字符串
    "htmlStr":"<html>***</html>",
    // 要转换的Url 链接
    "url":"http://192.168.100.236:9911/fms/groupBulletin?loginName=leo&project_id=Pj1101010091",
    // 要生成PDF 的名称
    "filename":"introduce111.pdf",
    // 对应的视口大小
	"viewportSize":{
		"width":1280,
		"height":1280
    },
    "settings":{
        "paperSize":{
            // 按照A4 分页
            "format":"A4",
            // 边距
            "margin":{
                "top":"100",
                "left":"100",
                "bottom":"100",
                "right":"100"
            },
            "header":"500",
            "footer":"500"
        }
        
    }
}
```

### 项目部署

#### 文件夹目录结构

发布的文件夹中只有四个文件：
- app.js
- app.js.map
- dir.json
- server.json

启动 app.js 后，程序会根据server.json 中的项目名称和dir.json 中的配置,自动创建对应的目录结构。

只需要启动 node app.js 或 pm2 start app.js 即可。   


### 常见问题

Error: spawn /usr/local/project/meos/phantom/linux/phantomjs EACCES   

解决方案：chmod 777 /usr/local/project/meos/phantom/linux/phantomjs

error: /usr/local/project/meos/phantom/linux/phantomjs: error while loading shared libraries: libfontconfig.so.1: cannot open shared object file: No such file or directory   

解决方案：
yum install fontconfig-devel
Y