##【模块配置】
config/system.json
```
    {
        mongodb_conn:'',
        profix:''
    }
```
##【模块配置】
config/module.json
```
{
    name:'用户',
    code:'user',
    path:'modules/user',
    controllers:['userController']
}
```
##【模块】
> 项目每个模块为一个文件夹，文件夹下分2个子文件夹：
*  controller
    > 该文件夹下为控制器文件(根据模块配置列表进行加载)
* service
    > 该文件夹下为业务处理文件（根据需要添加）
    

【使用方法】
*控制器
通用规则配置：
    `c.rule({
        method:"post"
    })`
 
   
##【fastnode对外方法/属性】
 * start：方法，用于启动项目
 * models
 * mongooseModels
 * tools
 * db
