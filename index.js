#! /usr/bin/env node

var readline = require('readline');
var compress = require('./compress.js');		//导入compress模块
var fs = require('fs');							//导入fs模块
var path = require('path')						//导入path模块


	var vue={};									//文本对象
	var rl = readline.createInterface({			//输入输出接口
	  input: process.stdin,
	  output: process.stdout
	});
	var arguments = process.argv;				//获取输入的参数

	var fileurl=arguments[2].replace(/\\/g,'/');	// \替换成/
	
	var parentsPath=path.resolve(fileurl, '..')+'/code.txt'	//本目录的上一级目录
	
	vue.vueModle=compress.print(fileurl)
	
	fs.writeFile(parentsPath,JSON.stringify(vue), function(err) {	//创建文件
	    if(err) {
	        return console.log(err);
	    }
	    console.log("The file was saved!");
	});
	
	FolderWatch(fileurl)						//执行Watch函数
	rl.close();									//关闭控制台输入


function FolderWatch(dir){							//定义了Watch函数 既递归监听函数
	var files= fs.readdirSync(dir);					//读当前文件夹
    var len = files.length;							//当前文件夹的长度	
    var file = null;								//设file变量为空
    var fsWatcher = fs.watch(dir, function (event, filename) {			//监听事件
    	console.log(filename + ' 发生变化')			//打印文件名字+发生变化
		vue.vueModle=compress.print(dir)
		fs.writeFileSync(parentsPath,JSON.stringify(vue));//整个文件结构写入txt
    	
	});
    for(var i=0;i<len;i++){							//for循环
       	file = files[i];							//获取文件
       	var stat=fs.lstatSync(dir+'/'+file);		//获取文件状态		
	   	if(stat.isDirectory()){						//文件如果为目录
	   		var fsWatcher = fs.watch(dir+'/'+file, function (event, filename) {		//监听事件
		    	console.log(filename + ' 发生变化')									//打印文件名字+发生变化
		    	vue.vueModle=compress.print(dir)
		    	fs.writeFileSync(parentsPath,JSON.stringify(vue));//整个文件结构写入txt
			});
			FolderWatch(dir+'/'+file);				//递归执行FolderWatch函数					
	   	}
    }
}
