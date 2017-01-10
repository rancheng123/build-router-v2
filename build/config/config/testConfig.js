
/*var srcPath = '../src_zhongchounew/apps/wap/webroot/static/',
    destPath = '../src_zhongchounew/apps/wap/webroot/dest/';*/

    var srcPath = './test/src/';
    var destPath = './test/dest/';



//路径配置
var config = {
    srcPath: srcPath,
    destPath: destPath,

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
        },
        concat: {
            task1: {
                src: [srcPath+'js/a.js',srcPath+'js/b.js'],
                dest: destPath + 'js/',
                destFileName: 'ab.js'
            },
            task2: {
                src: [srcPath+'js/c.js',srcPath+'js/d.js'],
                dest: destPath + 'js/',
                destFileName: 'cd.js'
            }
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
   },

   //替换合并任务中的js
   replaceUrl: {
       js: {
           src: srcPath + 'index.html',
           dest: destPath
       }
   }
}


module.exports = config;
