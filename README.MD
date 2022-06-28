This is node+mongodb developer framework,includes express、mongoose module.   
本框架为node+mongodb后端快速开发框架，集成express、mongoose框架，集成登录、注册、权限等用户模块
#### 【启动】  
1 依赖 expp   
`npm install expp --save`   
2 导入   
`require('expp').start(path)`   
> path：应用程序目录（默认当前命令执行目录）  
> 框架自动扫描应用程序目录，初始化数据库连接、注入express模块，并启动web服务

#### 【目录结构】
main.js  *程序入口（建议只写一句启动代码）*  
**config**  *配置文件目录*  
|- default.js *默认配置文件*  
|- env.js  *环境配置文件*    
**models**  *数据库实体*  
**controllers**  *控制器*  
**filter** *过滤器*   
**public** *公共路径，可直接被访问的文件*
modules  *业务处理模块*

>*以上目录粗体为框架扫描目录，名称不可变*  
>*以上目录除config外全部为可选，并可根据实际需求动态添加*  
>*以上目录可单独放在一个文件夹里，可以和入口文件不同级，运行时传递path即可*

#### 【配置】（config目录）

**#文件：**  
default.js  
env.js  
>env为多环境配置，可以有多个，如production.js、develop.js，env=环境变量NODE_ENV，加载时会合并default  


**#格式（CMD模块）：**  
```
module.exports={
    配置名：配置值
}
```  

**#配置项：**  
* mongodb_conn：数据库连接字符串（必须）  
* prefix：数据库表前缀，如果有则表名为：prefix_实体名   
* port：程序端口（默认3000)
* user_path：用户模块API路径（默认/user）

##### 【过滤器】
**#文件名：**  
beginFilter.js  
> 请求开始处理事件  
> 方法签名：function(){}  this=proxy对象  

endFilter.js  
> 请求结束处理事件，只有code为200类型的结果才会走该事件  
> 方法签名：function(rs){}  this=proxy对象
 

#### 【实体】（models目录）

**#文件名：**  
名称+Model.js  
如：userModel.js
> 格式是固定的，框架会自动扫描，并以文件名为实体名称（区分大小写）  


**#格式（CMD模块）：**  
```
module.exports={
    属性名：类型
}
```  
如：
```
module.exports={
    name:String,
	age:Number
}
```  
> 最终会直接转换为 mongoose对象，并默认添加时间戳字段（createdAt、updatedAt）


#### 【控制器/路由】（controllers目录）
**#格式（CMD模块）：**  
```
module.exports=function(c){
	c.get('/path',function(param1,param2){
		
	})
	c.post()
	c()
	c.rule()
	c.bind()
	...
}
```  


 > 该文件夹下为控制器文件(根据模块配置列表进行加载)  

##### 【c对象使用方法】  
**通用配置方法：**
* c.rule(rule) 当前控制器下有效  

**创建action方法：**
* c() 支持重载：path,action 、path,method,action、rule,action
* c.get() 支持重载:path,action、rule,action  
* c.post() 支持重载:path,action、rule,action
* c.bind(modelName) 绑定一个实体的CRUD方法  
>  CRUD提供以下方法可直接调用：
**modelName + "/find/:id", "get"** //通过ID查询 /modelname/find/:id  
**modelName + "/list", "post"** //查询数据（暂不支持分页），参数：{sort,pageIndex,pageSize,query:{}}    
**modelName + "/count", "post"** //同list方法  
**modelName + "/delete/:id", "post"**  //删除数据  
**modelName + "/add", "post"** //新增数据  
**modelName + "/update/:id", "post"** //修改数据  

**参数说明：**
* method：string，请求方法
* path：string，请求路径，支持express的带参数路由
* action：function，处理方法，可通过参数列表直接取到params、body、query里的参数（按优先级排列）
* rule：object，通过对象配置
> rule属性：
path、method（默认get）、login（是否必须登录后可访问，默认false）、role（指定角色可访问）   
> 路由规则 ：c.rule()的rule.path+c()创建action的path

## 【expp对外方法/属性】
 * start：方法，初始化项目并开启web服务
 * init：方法，仅初始化项目
 * models：object
 * ResultModel，class
 * tools：object
 * db：class，可直接继承或实例化使用
 * config：object，配置文件


#### 建议使用gulp对项目代码进行打包压缩

*依赖：*

```
npm install --save-dev gulp
npm install --save-dev gulp-uglify
npm install --save-dev gulp-clean
```

*gulpfile.js*

```
var gulp = require('gulp');
var uglify = require('gulp-uglify');
var clean = require('gulp-clean');

gulp.task('clean',function (){
    return gulp.src(['dist/**'],{read:false}).pipe(clean());
})

gulp.task('build', function () {
    return gulp.src(['*server/**/*.js','main.js'])
        .pipe(uglify({
            toplevel: true,
        }))
        .pipe(gulp.dest('dist/'));
});

gulp.task('default',gulp.series('clean','build'));

```

*命令：*
`gulp`
