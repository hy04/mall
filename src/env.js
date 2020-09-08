let baseURL;
//process.env包含着关于系统环境的信息，但是process.env中并不存在NODE_ENV这个东西。
//NODE_ENV是一个用户自定义的变量，在webpack中它的用途是判断生产环境或开发环境。

switch (process.env.NODE_ENV) {
    case 'development':
        baseURL='http://dev-mall-pre.springboot.cn/api';
        break;
    case 'test':
        baseURL='http://test-mall-pre.springboot.cn/api';
        break;
    case 'prod':
        baseURL='http://mall-pre.springboot.cn/api';
        break;

    default:
        break;
}

export default{
    baseURL
}