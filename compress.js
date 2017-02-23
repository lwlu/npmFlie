
var fs = require('fs');

exports.print = function(dir) {
	var arr={}						//定义一个arr对象
  	FilesTraverse(dir,arr);			//执行FilesInDir函数
  	return arr;						//返回arr对象
}
function FilesTraverse(dir,arr){
    var files= fs.readdirSync(dir);	//获取dir文件夹下的文件
    var len = files.length;			//获取dir文件夹下的长度
    var file = null;				//设file变量为空
    for(var i=0;i<len;i++){			//for循环
    	
      	file = files[i];			//获取当前文件
      	var filename = file.substring(0,file.lastIndexOf("."));			//获取文件夹的名字
	   	var stat=fs.lstatSync(dir+'/'+file);			//文件的状态
	   	
	   	if(stat.isFile()){								//如果stat为文件
			var data = fs.readFileSync(dir+'/'+file);	//获取文件内容
			arr[filename] = data.toString();			//文件内容转字符串并存入arr[filename]
			
	   	}else{
	   		arr[file]={}			//初始化arr[file]为空
	   		FilesTraverse(dir+'/'+file,arr[file])		//递归调用FilesTraverse函数
	   	}
    }
}