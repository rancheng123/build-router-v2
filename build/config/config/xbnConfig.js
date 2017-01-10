
/*var srcPath = '../src_zhongchounew/apps/wap/webroot/static/',
    destPath = '../src_zhongchounew/apps/wap/webroot/dest/';*/

    var srcPath = '../code/src/';
    var destPath = '../code/dest/';



//路径配置
var config = {
    srcPath: srcPath,
    destPath: destPath,

    css: {
        min: {
            task1: {
                src: [
                    srcPath+'css/*.css'
                ],
                dest: destPath + 'css/'
            }
        }
    },

   sass: {
       compile: {
           task1: {
               //src: srcPath + 'style/scss/style.scss',
               src: srcPath + 'style/scss/**/*.scss',
               dest: destPath + 'css',
               destFileName: 'style.css',
               //从生成到源头的路径  （css目录  到  sass文件目录 ）
               cssToSassPath: '../src/style/scss'
           },
           task2: {
               //src: srcPath + 'style/scss/style.scss',
               src: srcPath + 'style/scss/**/*.scss',
               dest: srcPath + 'css',
               destFileName: 'style.css',
               //从生成到源头的路径  （css目录  到  sass文件目录 ）
               cssToSassPath: './scss'
           }
       }
   },

   js: {
        
      //不压缩，打算做分布式加载  （首页保持清爽，尽量少的加载东西，其他模块按需加载  ）

        min: {
            task1: {
                src: [
                    srcPath+'js/router.js',
                    srcPath+'js/config.js'
                ],
                dest: destPath + 'js/'
            },
            task2: {
                src: [srcPath+'js/modules/**/*.js'],
                dest: destPath + 'js/modules/'
            }
        },
        jsonCopy: {
            task1: {
                src:  srcPath + 'js/**/*.json' ,
                dest: destPath + 'js/'
            }
        },
        concat: {
            task1: {
                src: [
                    srcPath+'js/lib/*.js',
                    srcPath+'js/utils/*.js',
                    srcPath+'js/base/*.js',
                    srcPath+'js/config.js'
                ],
                dest: destPath + 'js/',
                destFileName: 'lib.js'
            },
            task2: {
                src: [srcPath+'js/widget/**/*.js'],
                dest: destPath + 'js/',
                destFileName: 'widget.js'
            }

            /*task2: {
                src: ['./test/src/' +'js/c.js','./test/src/' +'js/d.js'],
                dest: './test/dest/' + 'js/',
                destFileName: 'cd.js'
            }*/
        }
   },
   


   

   html: {
      copy: {

          task1: {
              src: [srcPath + 'template/**/*.html'],
              dest: destPath + 'template/'
          },

          task2: {
              src: [srcPath + 'index.html'],
              dest: destPath
          }


      }
      
   },

   image: {
      //复制任务
      copy: {
          task1: {
              src: [srcPath + 'images/**/*.*'],
              dest: destPath + 'images/'
          }
      },
      //精灵任务
      sprite: {

          task1: {
              src: [srcPath + 'images/**/*.*'],
              dest: destPath + 'images/',
              //合成后的文件
              destFileName: 'iconSprite.png',
              //合成后对应的css文件
              destCssName: 'iconSprite.css'
          }
          /*task2: {
              src: [srcPath + 'images/icon/!**!/!*.*'],
              dest: destPath + 'images/',
              //合成后的文件
              destFileName: 'iconSprite.png',
              //合成后对应的css文件
              destCssName: 'iconSprite.css'
          }*/
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
