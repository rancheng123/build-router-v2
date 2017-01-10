
/*var srcPath = '../src_zhongchounew/apps/wap/webroot/static/',
    destPath = '../src_zhongchounew/apps/wap/webroot/dest/';*/

    var srcPath = '../apps/wap/dev/',
    destPath = '../../apps/wap/webroot/static/';



//路径配置
var config = {
   compileSass: {
       src: srcPath + 'scss/**/*.scss',
       dest: destPath + 'css',
       destFileName: 'all.css',
       //从生成到源头的路径  （css目录  到  sass文件目录 ）
       cssToSassPath: '../static/scss'
   },
   js: {
        
      //不压缩，打算做分布式加载  （首页保持清爽，尽量少的加载东西，其他模块按需加载  ）

        min: {
            src:  srcPath + 'js/**/*.js' ,
            dest: destPath + 'js/'
        },
        jsonCopy: {
            src:  srcPath + 'js/**/*.json' ,
            dest: destPath + 'js/'
        }
   },
   


   

   html: {
      copy: {
          src: [srcPath + 'tpl/**/*.html'],
          dest: destPath + 'tpl/'
      }
      
   },

   image: {
      copy: {
           src: [srcPath + 'images/**/*.*'],
            dest: destPath + 'images/'
      }
   }
}


module.exports = config;
