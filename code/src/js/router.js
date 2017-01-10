
    var router = (function(Win){

        //路由基类
        function Router(){
            this.cache = {};
            this.defaultHash = 'm=friendRaise&a=launch';
        };
        Router.prototype = {
            //请求本地JS
            requestScript: function (opts) {
                return $.ajax({
                    url: opts.url,
                    type: "GET",
                    dataType: "script",
                    cache: false
                }).fail(function(){
                    console.error('请求js'+ opts.url +'失败')
                })
            },

            //解析Url
            parseUrl: function(){

                var that = this;

                //没有hash
                if(!location.hash){
                    location.hash = that.defaultHash;
                }

                //检测hash  格式
                var res = /^\#\w\=\w+\&\w\=\w+$/.test(location.hash);
                if(!res){
                    console.error('请输入正确的hash格式,如 m=friendRaise&a=launch')
                }

                var paras = location.hash.substring(1).split('&');
                var module = paras[0].split('=')[1];
                var action = paras[1].split('=')[1];

                return {
                    module: module,
                    action: action,
                    baseUrl:  window.location.protocol + "//" + window.location.hostname + (window.location.port ? ":" + window.location.port : "")
                }

            },

            //寻址切换模块
            requestModuleByHash: function(){
                var that = this;

                that.cache.currentRoute = that.parseUrl();

                var module = that.cache.currentRoute.module;
                var action = that.cache.currentRoute.action;


                var X = xbn();
                //如果有该模块
                if(X.isInEventSystem( X.oContext, module )){
                    X.publish(module,X);
                }else{
                    that.requestScript({
                        url: './js/modules/'+ module +'.js'
                    }).done(function(){
                        X.publish(module,X);
                    })
                }



            },
            /* switchRoute: function(hash){
             var that = this;
             location.hash = hash;
             that.requestModuleByHash();
             },*/
            start: function(){
                var that = this;

                that.requestModuleByHash();

                //监听hash (依赖jquery.ba-hashchange.js)
                $(window).hashchange( function(ev){
                    that.requestModuleByHash();
                })

            },
        }



        Win.router = new Router();
        Win.router.start();

        return Win.router;

    })(this);






    /*    使用  start
     $(function(){

     $('#a').click(function(){
     //router.switchRoute('m=a&b=2');
     location.hash = 'm=a&b=2';
     })

     $('#b').click(function(){

     // router.switchRoute('m=b&b=2');
     location.hash = 'm=b&b=2';

     })
     $('#c').click(function(){
     debugger;
     // router.switchRoute('m=b&b=2');
     location.hash = 'm=c&b=2';

     })
     })*/






//@ sourceURL=router.js
