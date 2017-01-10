
/*


	node build.js dev wap.js

*/


//开发环境   还是线上环境




var  env = process.argv[2];
var  argv3 = process.argv[3];


if(!env || !argv3){
	console.log('命令缺少参数，请输入正确的命令，如 node build.js dev wap.js');
	return;
}


if(argv3.indexOf('.')  != -1 ){
	var app = argv3.split('.')[0];
	var method = argv3.split('.')[1];		
}else{
	var app = argv3;
	var method = 'all';	
}



var configPath = require('./config/config.js');


//输入没有的项目名
if( !configPath.hasOwnProperty(app) ){
	console.log('没有'+app+'项目');
	process.exit();
}

var Builder = require('./gulpfile');
var builder = new Builder( {
	path: configPath[app],
	env: env
} );




//输入没有的方法
if(  !(method in builder)   ){
	console.log('没有'+method+'方法');
	process.exit();
}


var startTime = new Date().getTime();
builder[method]();
var endTime = new Date().getTime();
console.log( '耗时'+ ((endTime - startTime)/1000) + '秒' )

